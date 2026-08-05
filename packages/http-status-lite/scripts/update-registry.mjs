import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const registryUrl = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = resolve(root, 'registry/statuses.json');
const current = JSON.parse(await readFile(registryPath, 'utf8'));
const currentByCode = new Map(current.map((entry) => [entry.code, entry]));

const response = await fetch(registryUrl);
if (!response.ok) throw new Error(`IANA registry request failed with HTTP ${response.status}.`);

const [header, ...rows] = parseCsv(await response.text());
const column = Object.fromEntries(header.map((name, index) => [name, index]));
const entries = rows
    .filter(
        (row) =>
            /^\d{3}$/.test(row[column.Value] ?? '') &&
            (row[column.Description] ?? '') !== 'Unassigned',
    )
    .map((row) => toRegistryEntry(row, column, currentByCode))
    .sort((left, right) => left.code - right.code);

const formatted = await format(JSON.stringify(entries), {
    parser: 'json',
    printWidth: 100,
    tabWidth: 4,
});
await writeFile(registryPath, formatted);
console.log(`Updated ${entries.length} entries from ${registryUrl}`);

function toRegistryEntry(row, column, knownEntries) {
    const code = Number(row[column.Value]);
    const description = row[column.Description] ?? '';
    const known = knownEntries.get(code);
    const officialMessage = description
        .replace(/\s*\(TEMPORARY[^)]*\).*$/u, '')
        .replace(/\s*\(OBSOLETED\).*$/u, '')
        .replace(/^\(Unused\)$/u, 'Unused')
        .trim();

    return {
        code,
        name: known?.name ?? toConstantName(officialMessage, code),
        // 418 is intentionally retained as the conventional developer-facing extension.
        message: code === 418 ? "I'm a teapot" : officialMessage,
        reference: known?.reference ?? cleanReference(row[column.Reference] ?? ''),
        registryStatus: getRegistryState(description),
    };
}

function getRegistryState(description) {
    if (/TEMPORARY/u.test(description)) return 'temporary';
    if (/OBSOLETED/u.test(description)) return 'obsolete';
    if (/^\(Unused\)$/u.test(description)) return 'unused';
    return 'permanent';
}

function cleanReference(reference) {
    return reference.replaceAll('[', '').replaceAll(']', '').trim();
}

function toConstantName(message, code) {
    const name = message
        .normalize('NFKD')
        .replace(/[^A-Za-z0-9]+/gu, '_')
        .replace(/^_|_$/gu, '')
        .toUpperCase();
    return name === 'UNUSED' ? `UNUSED_${code}` : name;
}

function parseCsv(source) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;

    for (let index = 0; index < source.length; index += 1) {
        const character = source[index];
        if (quoted && character === '"' && source[index + 1] === '"') {
            field += '"';
            index += 1;
        } else if (character === '"') {
            quoted = !quoted;
        } else if (character === ',' && !quoted) {
            row.push(field);
            field = '';
        } else if ((character === '\n' || character === '\r') && !quoted) {
            if (character === '\r' && source[index + 1] === '\n') index += 1;
            row.push(field);
            if (row.some((value) => value.length > 0)) rows.push(row);
            row = [];
            field = '';
        } else {
            field += character;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }
    return rows;
}
