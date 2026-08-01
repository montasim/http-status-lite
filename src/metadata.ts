import { STATUS_METADATA } from './generated/metadata.js';
import { getCategory } from './predicates.js';
import type { HttpStatusCode, HttpStatusMetadata, StatusForCode } from './types.js';

const metadata = STATUS_METADATA.map((entry) => {
    const category = getCategory(entry.code);
    if (category === null) throw new Error(`Invalid generated status code: ${entry.code}`);
    return Object.freeze({ ...entry, category });
}) as readonly HttpStatusMetadata[];
const metadataByCode = new Map<number, HttpStatusMetadata>(
    metadata.map((entry) => [entry.code, entry]),
);

export const statusMetadata: readonly HttpStatusMetadata[] = Object.freeze(metadata);

export function getStatusMetadata<const Code extends HttpStatusCode>(
    code: Code,
): Extract<HttpStatusMetadata, StatusForCode<Code>>;
export function getStatusMetadata(code: number): HttpStatusMetadata | null;
export function getStatusMetadata(code: number): HttpStatusMetadata | null {
    return metadataByCode.get(code) ?? null;
}

export type { HttpStatusMetadata, HttpStatusRegistryState } from './types.js';
