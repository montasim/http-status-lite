import { isStatusCode } from './lookup.js';
import type { HttpStatusCode } from './types.js';

export function parseStatusCode(value: unknown): HttpStatusCode | null {
    if (isStatusCode(value)) return value;
    if (typeof value !== 'string' || !/^\d{3}$/.test(value)) return null;

    const code = Number(value);
    return isStatusCode(code) ? code : null;
}

export function assertStatusCode(value: unknown): asserts value is HttpStatusCode {
    if (!isStatusCode(value)) {
        throw new TypeError(`Expected a registered HTTP status code; received ${String(value)}.`);
    }
}
