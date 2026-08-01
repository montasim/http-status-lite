import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const consumer = await mkdtemp(join(tmpdir(), 'http-status-lite-consumer-'));
let tarballPath;

try {
    const packResult = JSON.parse(
        execFileSync('npm', ['pack', '--ignore-scripts', '--json'], {
            cwd: root,
            encoding: 'utf8',
        }),
    );
    tarballPath = join(root, packResult[0].filename);

    await writeFile(
        join(consumer, 'package.json'),
        JSON.stringify({ name: 'package-smoke-test', private: true, type: 'module' }),
    );
    execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], {
        cwd: consumer,
        stdio: 'pipe',
    });

    execFileSync(
        process.execPath,
        [
            '--input-type=module',
            '--eval',
            "import { Status, getStatus } from 'http-status-lite'; if (Status.OK !== 200 || getStatus(404).name !== 'NOT_FOUND') process.exit(1)",
        ],
        { cwd: consumer, stdio: 'inherit' },
    );

    await writeFile(
        join(consumer, 'consumer.ts'),
        "import { Status, getStatus } from 'http-status-lite';\nconst code: 200 = Status.OK;\nconst name: 'NOT_FOUND' = getStatus(404).name;\nvoid code; void name;\n",
    );
    await writeFile(
        join(consumer, 'consumer.cts'),
        "import { Status } from 'http-status-lite';\nconst code: 200 = Status.OK;\nvoid code;\n",
    );
    execFileSync(
        resolve(root, 'node_modules/.bin/tsc'),
        [
            '--noEmit',
            '--strict',
            '--target',
            'ES2020',
            '--module',
            'Node16',
            '--moduleResolution',
            'Node16',
            'consumer.ts',
            'consumer.cts',
        ],
        { cwd: consumer, stdio: 'inherit' },
    );
    execFileSync(
        process.execPath,
        [
            '--input-type=commonjs',
            '--eval',
            "const { Status } = require('http-status-lite'); if (Status.OK !== 200) process.exit(1)",
        ],
        { cwd: consumer, stdio: 'inherit' },
    );

    const packageJson = JSON.parse(
        await readFile(join(consumer, 'node_modules/http-status-lite/package.json'), 'utf8'),
    );
    if (packageJson.version !== '2.3.0') throw new Error('Packed package has the wrong version.');
    console.log(
        `Packed package ${packageJson.version} passed ESM, CommonJS, and TypeScript consumer tests.`,
    );
} finally {
    await rm(consumer, { recursive: true, force: true });
    if (tarballPath) await rm(tarballPath, { force: true });
}
