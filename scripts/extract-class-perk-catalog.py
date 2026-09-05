#!/usr/bin/env python3
"""Extract the class/perk inventory from a local Quasimorph Unity installation.

Requires UnityPy. The local installation is read only and the generated JSON is
the only output intended for version control.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from datetime import date
from pathlib import Path

GRADES = ("basic", "advanced", "master", "legend")


def text_assets(resources_path: Path) -> dict[str, str]:
    import UnityPy

    environment = UnityPy.load(str(resources_path))
    return {
        asset.m_Name: asset.m_Script
        for obj in environment.objects
        if obj.type.name == "TextAsset"
        for asset in [obj.read()]
    }


def section_rows(text: str, section: str) -> list[dict[str, str]]:
    lines = text.splitlines()
    markers = [line.rstrip("\t") for line in lines]
    start = markers.index(f"#{section}") + 1
    end = markers.index("#end", start)
    return list(csv.DictReader(io.StringIO("\n".join(lines[start:end])), delimiter="\t"))


def english_localization(text: str) -> dict[str, str]:
    return {
        columns[0]: columns[1]
        for line in text.splitlines()[1:]
        if len(columns := line.split("\t")) > 1
    }


def parse_parameters(value: str) -> list[dict[str, object]]:
    if not value:
        return []
    tokens = value.split()
    if len(tokens) % 2:
        raise ValueError(f"Odd parameter token count: {value}")
    result = []
    for key, raw_value in zip(tokens[::2], tokens[1::2]):
        if key.startswith("B"):
            normalized_value = raw_value.lower()
            if normalized_value not in {"true", "false"}:
                raise ValueError(f"Invalid boolean parameter {key}: {raw_value}")
            parsed: object = normalized_value == "true"
        elif key.startswith("I"):
            parsed = int(raw_value)
        elif key.startswith("F"):
            parsed = float(raw_value)
        else:
            parsed = raw_value
        result.append({"id": key, "value": parsed})
    return result


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    import UnityPy

    parser = argparse.ArgumentParser()
    parser.add_argument("installation", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    data_dir = args.installation / "Quasimorph_Data"
    resources_path = data_dir / "resources.assets"
    assets = text_assets(resources_path)
    localization = english_localization(assets["localization"])
    config = assets["config_mercenaries"]
    perk_rows = {row["Id"]: row for row in section_rows(config, "perks")}

    classes = []
    included_perks: list[str] = []
    for row in section_rows(config, "mercenary_classes"):
        perk_ids = [perk_id.removesuffix("_basic") for perk_id in row["PerkIds"].split()]
        included_perks.extend(perk_ids)
        classes.append(
            {
                "id": row["Id"],
                "name": localization[f"class.{row['Id']}.name"],
                "perkIds": perk_ids,
            }
        )

    perks = []
    for perk_id in sorted(set(included_perks)):
        levels = []
        for level, grade in enumerate(GRADES, start=1):
            source_id = f"{perk_id}_{grade}"
            row = perk_rows[source_id]
            levels.append(
                {
                    "level": level,
                    "grade": grade,
                    "sourceId": source_id,
                    "experienceToNextLevel": int(row["ExpToLevelUp"]) if row["ExpToLevelUp"] else None,
                    "parameters": parse_parameters(row["Parameters"]),
                }
            )
        base = perk_rows[f"{perk_id}_basic"]
        perks.append(
            {
                "id": perk_id,
                "name": localization[f"perk.{perk_id}.name"],
                "kind": base["PerkType"].lower(),
                "levelingAction": base["LevelUpActionType"],
                "experiencePerAction": int(base["ExpPointsPerAction"]),
                "weaponClasses": base["ActiveWeaponClassLimit"].split(),
                "weaponSubclasses": base["ActiveWeaponSubClassLimit"].split(),
                "levels": levels,
            }
        )

    player_settings = next(
        obj.read()
        for obj in UnityPy.load(str(data_dir / "globalgamemanagers")).objects
        if obj.type.name == "PlayerSettings"
    )
    output = {
        "manifest": {
            "schemaVersion": 1,
            "id": "qm-1-0-3-class-perk-catalog",
            "gameVersion": "1.0.3",
            "internalBuildId": player_settings.bundleVersion,
            "language": "en",
            "capturedAt": date.today().isoformat(),
            "coverage": {"classes": len(classes), "perks": len(perks)},
            "source": {
                "type": "game-config",
                "asset": "Quasimorph_Data/resources.assets",
                "records": ["config_mercenaries", "localization"],
                "sha256": sha256(resources_path),
                "confidence": "verified",
            },
        },
        "classes": classes,
        "perks": perks,
    }
    args.output.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
