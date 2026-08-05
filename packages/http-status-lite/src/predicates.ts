import type { HttpStatusCategory } from './types.js';

function isIntegerInRange(code: number, minimum: number, maximum: number): boolean {
    return Number.isInteger(code) && code >= minimum && code <= maximum;
}

export function isInformational(code: number): boolean {
    return isIntegerInRange(code, 100, 199);
}

export function isSuccess(code: number): boolean {
    return isIntegerInRange(code, 200, 299);
}

export function isRedirect(code: number): boolean {
    return isIntegerInRange(code, 300, 399);
}

export function isClientError(code: number): boolean {
    return isIntegerInRange(code, 400, 499);
}

export function isServerError(code: number): boolean {
    return isIntegerInRange(code, 500, 599);
}

export function isError(code: number): boolean {
    return isIntegerInRange(code, 400, 599);
}

/** Returns the numeric HTTP class, even when the specific code is unregistered. */
export function getCategory(code: number): HttpStatusCategory | null {
    if (!Number.isInteger(code)) return null;
    if (isInformational(code)) return '1xx';
    if (isSuccess(code)) return '2xx';
    if (isRedirect(code)) return '3xx';
    if (isClientError(code)) return '4xx';
    if (isServerError(code)) return '5xx';
    return null;
}
