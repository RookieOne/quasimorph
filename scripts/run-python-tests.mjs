import { spawnSync } from 'node:child_process';

const candidates =
  process.platform === 'win32'
    ? [
        { command: 'py', args: ['-3'] },
        { command: 'python', args: [] },
        { command: 'python3', args: [] },
      ]
    : [
        { command: 'python3', args: [] },
        { command: 'python', args: [] },
      ];

for (const { command, args } of candidates) {
  const result = spawnSync(command, [...args, '-B', 'scripts/test_extract_class_perk_catalog.py'], {
    stdio: 'inherit',
  });

  if (result.error?.code === 'ENOENT') continue;
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

throw new Error('Python is required to run the extractor tests.');
