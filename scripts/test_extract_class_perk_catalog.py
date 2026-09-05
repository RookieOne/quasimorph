import importlib.util
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("extract-class-perk-catalog.py")
SPEC = importlib.util.spec_from_file_location("extract_class_perk_catalog", SCRIPT_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class ParseParametersTest(unittest.TestCase):
    def test_parses_explicit_boolean_tokens(self):
        self.assertEqual(
            MODULE.parse_parameters("BEnabled true BDisabled FALSE"),
            [
                {"id": "BEnabled", "value": True},
                {"id": "BDisabled", "value": False},
            ],
        )

    def test_rejects_invalid_boolean_tokens(self):
        with self.assertRaisesRegex(ValueError, "Invalid boolean parameter BEnabled: 1"):
            MODULE.parse_parameters("BEnabled 1")


if __name__ == "__main__":
    unittest.main()
