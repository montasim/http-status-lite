import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const budgets = {
    'dist/index.js': 8_000,
    'dist/codes.js': 2_500,
    'dist/predicates.js': 1_000,
};

for (const [path, maximumBytes] of Object.entries(budgets)) {
    const compressedBytes = gzipSync(await readFile(path)).byteLength;
    if (compressedBytes > maximumBytes) {
        throw new Error(`${path} is ${compressedBytes} B gzipped; budget is ${maximumBytes} B.`);
    }
    console.log(`${path}: ${compressedBytes} B gzipped (budget ${maximumBytes} B)`);
}
