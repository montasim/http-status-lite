import { STATUS_DEFINITIONS } from './generated/statuses.js';
import type {
    CodeForName,
    HttpStatusCode,
    HttpStatusEntry,
    HttpStatusName,
    MessageForCode,
    NameForCode,
    StatusForCode,
} from './types.js';

const entries = STATUS_DEFINITIONS.map((entry) =>
    Object.freeze(entry),
) as readonly HttpStatusEntry[];
const entriesByCode = new Map<number, HttpStatusEntry>(entries.map((entry) => [entry.code, entry]));
const entriesByName = new Map<string, HttpStatusEntry>(entries.map((entry) => [entry.name, entry]));

/** A frozen list of all status entries represented by this package. */
export const statuses: readonly HttpStatusEntry[] = Object.freeze(entries);

export function getStatus<const Code extends HttpStatusCode>(code: Code): StatusForCode<Code>;
export function getStatus<
    const Code extends HttpStatusCode,
    const Field extends keyof HttpStatusEntry,
>(code: Code, field: Field): StatusForCode<Code>[Field];
export function getStatus(code: number): HttpStatusEntry | null;
export function getStatus(
    code: number,
    field: keyof HttpStatusEntry,
): HttpStatusEntry[keyof HttpStatusEntry] | null;
export function getStatus(
    code: number,
    field?: keyof HttpStatusEntry,
): HttpStatusEntry | HttpStatusEntry[keyof HttpStatusEntry] | null {
    const status = entriesByCode.get(code);
    if (status === undefined) return null;
    return field === undefined ? status : status[field];
}

export function getStatusCode<const Name extends HttpStatusName>(name: Name): CodeForName<Name>;
export function getStatusCode(name: string): HttpStatusCode | null;
export function getStatusCode(name: string): HttpStatusCode | null {
    return entriesByName.get(name)?.code ?? null;
}

export function getStatusName<const Code extends HttpStatusCode>(code: Code): NameForCode<Code>;
export function getStatusName(code: number): HttpStatusName | null;
export function getStatusName(code: number): HttpStatusName | null {
    return entriesByCode.get(code)?.name ?? null;
}

export function getReasonPhrase<const Code extends HttpStatusCode>(
    code: Code,
): MessageForCode<Code>;
export function getReasonPhrase(code: number): string | null;
export function getReasonPhrase(code: number): string | null {
    return entriesByCode.get(code)?.message ?? null;
}

export function isStatusCode(value: unknown): value is HttpStatusCode {
    return typeof value === 'number' && Number.isInteger(value) && entriesByCode.has(value);
}

export function isStatusName(value: unknown): value is HttpStatusName {
    return typeof value === 'string' && entriesByName.has(value);
}

/** Alias emphasizing registry membership rather than numeric range membership. */
export const isKnownStatus = isStatusCode;
