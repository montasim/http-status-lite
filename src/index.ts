/**
 * HTTP status entry interface
 * @description Represents a complete HTTP status code with name and message
 */
interface HttpStatusEntry {
    code: number;
    name: string;
    message: string;
}

/**
 * HTTP status codes data source
 * @description Single source of truth for all IANA-registered HTTP status codes
 */
const HTTP_STATUSES: readonly HttpStatusEntry[] = [
    // 1xx Informational responses
    { code: 100, name: 'CONTINUE', message: 'Continue' },
    { code: 101, name: 'SWITCHING_PROTOCOLS', message: 'Switching Protocols' },
    { code: 102, name: 'PROCESSING', message: 'Processing' },
    { code: 103, name: 'EARLY_HINTS', message: 'Early Hints' },

    // 2xx Success responses
    { code: 200, name: 'OK', message: 'OK' },
    { code: 201, name: 'CREATED', message: 'Created' },
    { code: 202, name: 'ACCEPTED', message: 'Accepted' },
    { code: 203, name: 'NON_AUTHORITATIVE_INFORMATION', message: 'Non-Authoritative Information' },
    { code: 204, name: 'NO_CONTENT', message: 'No Content' },
    { code: 205, name: 'RESET_CONTENT', message: 'Reset Content' },
    { code: 206, name: 'PARTIAL_CONTENT', message: 'Partial Content' },
    { code: 207, name: 'MULTI_STATUS', message: 'Multi-Status' },
    { code: 208, name: 'ALREADY_REPORTED', message: 'Already Reported' },
    { code: 226, name: 'IM_USED', message: 'IM Used' },

    // 3xx Redirection
    { code: 300, name: 'MULTIPLE_CHOICES', message: 'Multiple Choices' },
    { code: 301, name: 'MOVED_PERMANENTLY', message: 'Moved Permanently' },
    { code: 302, name: 'FOUND', message: 'Found' },
    { code: 303, name: 'SEE_OTHER', message: 'See Other' },
    { code: 304, name: 'NOT_MODIFIED', message: 'Not Modified' },
    { code: 305, name: 'USE_PROXY', message: 'Use Proxy' },
    { code: 306, name: 'UNUSED', message: 'Unused' },
    { code: 307, name: 'TEMPORARY_REDIRECT', message: 'Temporary Redirect' },
    { code: 308, name: 'PERMANENT_REDIRECT', message: 'Permanent Redirect' },

    // 4xx Client errors
    { code: 400, name: 'BAD_REQUEST', message: 'Bad Request' },
    { code: 401, name: 'UNAUTHORIZED', message: 'Unauthorized' },
    { code: 402, name: 'PAYMENT_REQUIRED', message: 'Payment Required' },
    { code: 403, name: 'FORBIDDEN', message: 'Forbidden' },
    { code: 404, name: 'NOT_FOUND', message: 'Not Found' },
    { code: 405, name: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' },
    { code: 406, name: 'NOT_ACCEPTABLE', message: 'Not Acceptable' },
    { code: 407, name: 'PROXY_AUTHENTICATION_REQUIRED', message: 'Proxy Authentication Required' },
    { code: 408, name: 'REQUEST_TIMEOUT', message: 'Request Timeout' },
    { code: 409, name: 'CONFLICT', message: 'Conflict' },
    { code: 410, name: 'GONE', message: 'Gone' },
    { code: 411, name: 'LENGTH_REQUIRED', message: 'Length Required' },
    { code: 412, name: 'PRECONDITION_FAILED', message: 'Precondition Failed' },
    { code: 413, name: 'PAYLOAD_TOO_LARGE', message: 'Payload Too Large' },
    { code: 414, name: 'URI_TOO_LONG', message: 'URI Too Long' },
    { code: 415, name: 'UNSUPPORTED_MEDIA_TYPE', message: 'Unsupported Media Type' },
    { code: 416, name: 'RANGE_NOT_SATISFIABLE', message: 'Range Not Satisfiable' },
    { code: 417, name: 'EXPECTATION_FAILED', message: 'Expectation Failed' },
    { code: 418, name: 'IM_A_TEAPOT', message: "I'm a teapot" },
    { code: 422, name: 'UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity' },
    { code: 423, name: 'LOCKED', message: 'Locked' },
    { code: 424, name: 'FAILED_DEPENDENCY', message: 'Failed Dependency' },
    { code: 425, name: 'TOO_EARLY', message: 'Too Early' },
    { code: 426, name: 'UPGRADE_REQUIRED', message: 'Upgrade Required' },
    { code: 428, name: 'PRECONDITION_REQUIRED', message: 'Precondition Required' },
    { code: 429, name: 'TOO_MANY_REQUESTS', message: 'Too Many Requests' },
    {
        code: 431,
        name: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
        message: 'Request Header Fields Too Large',
    },
    { code: 451, name: 'UNAVAILABLE_FOR_LEGAL_REASONS', message: 'Unavailable For Legal Reasons' },

    // 5xx Server errors
    { code: 500, name: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
    { code: 501, name: 'NOT_IMPLEMENTED', message: 'Not Implemented' },
    { code: 502, name: 'BAD_GATEWAY', message: 'Bad Gateway' },
    { code: 503, name: 'SERVICE_UNAVAILABLE', message: 'Service Unavailable' },
    { code: 504, name: 'GATEWAY_TIMEOUT', message: 'Gateway Timeout' },
    { code: 505, name: 'HTTP_VERSION_NOT_SUPPORTED', message: 'HTTP Version Not Supported' },
    { code: 506, name: 'VARIANT_ALSO_NEGOTIATES', message: 'Variant Also Negotiates' },
    { code: 507, name: 'INSUFFICIENT_STORAGE', message: 'Insufficient Storage' },
    { code: 508, name: 'LOOP_DETECTED', message: 'Loop Detected' },
    { code: 510, name: 'NOT_EXTENDED', message: 'Not Extended' },
    {
        code: 511,
        name: 'NETWORK_AUTHENTICATION_REQUIRED',
        message: 'Network Authentication Required',
    },
] as const;

// Generate union type
type HttpStatusName = (typeof HTTP_STATUSES)[number]['name'];

// Generate status code constants
const statusCodes: Record<HttpStatusName, number> = HTTP_STATUSES.reduce(
    (acc, status) => ({ ...acc, [status.name]: status.code }),
    {} as Record<HttpStatusName, number>,
);

// Generate status message constants
const statusMessages: Record<`${HttpStatusName}_MESSAGE`, string> = HTTP_STATUSES.reduce(
    (acc, status) => ({ ...acc, [`${status.name}_MESSAGE`]: status.message }),
    {} as Record<`${HttpStatusName}_MESSAGE`, string>,
);

// Generate reverse lookup
const reverseLookup: Record<number, string> = HTTP_STATUSES.reduce(
    (acc, status) => ({ ...acc, [status.code]: status.name }),
    {} as Record<number, string>,
);

/**
 * Get detailed information about an HTTP status code
 * @param code - The HTTP status code
 * @param field - Optional field to extract
 * @returns Status object or specific field value or null
 */
export function getStatus(
    code: number,
    field?: 'code' | 'name' | 'message',
): HttpStatusEntry | number | string | null {
    const status = HTTP_STATUSES.find((s) => s.code === code);
    if (!status) return null;
    return field ? status[field] : status;
}

/**
 * Check if a status code indicates success (2xx)
 * @param code - The HTTP status code
 * @returns true if code is in 200-299 range, false otherwise
 * @example
 * ```typescript
 * httpStatusLite.isSuccess(200); // true
 * httpStatusLite.isSuccess(404); // false
 * ```
 */
export function isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
}

/**
 * Check if status code is a redirect (3xx)
 * @param code - The HTTP status code
 * @returns true if code is in 300-399 range, false otherwise
 * @example
 * ```typescript
 * httpStatusLite.isRedirect(301); // true
 * httpStatusLite.isRedirect(200); // false
 * ```
 */
export function isRedirect(code: number): boolean {
    return code >= 300 && code < 400;
}

/**
 * Check if status code is a client error (4xx)
 * @param code - The HTTP status code
 * @returns true if code is in 400-499 range, false otherwise
 * @example
 * ```typescript
 * httpStatusLite.isClientError(404); // true
 * httpStatusLite.isClientError(500); // false
 * ```
 */
export function isClientError(code: number): boolean {
    return code >= 400 && code < 500;
}

/**
 * Check if status code is a server error (5xx)
 * @param code - The HTTP status code
 * @returns true if code is in 500-599 range, false otherwise
 * @example
 * ```typescript
 * httpStatusLite.isServerError(500); // true
 * httpStatusLite.isServerError(404); // false
 * ```
 */
export function isServerError(code: number): boolean {
    return code >= 500 && code < 600;
}

/**
 * Check if status code is any error (4xx or 5xx)
 * @param code - The HTTP status code
 * @returns true if code is in 400-599 range, false otherwise
 * @example
 * ```typescript
 * httpStatusLite.isError(404); // true
 * httpStatusLite.isError(500); // true
 * httpStatusLite.isError(200); // false
 * ```
 */
export function isError(code: number): boolean {
    return code >= 400 && code < 600;
}

/**
 * Get the category string for a status code
 * @param code - The HTTP status code
 * @returns Category string ('1xx', '2xx', '3xx', '4xx', '5xx') or null if unknown
 * @example
 * ```typescript
 * httpStatusLite.getCategory(200); // '2xx'
 * httpStatusLite.getCategory(404); // '4xx'
 * httpStatusLite.getCategory(999); // null
 * ```
 */
export function getCategory(code: number): '1xx' | '2xx' | '3xx' | '4xx' | '5xx' | null {
    if (code >= 100 && code < 200) return '1xx';
    if (code >= 200 && code < 300) return '2xx';
    if (code >= 300 && code < 400) return '3xx';
    if (code >= 400 && code < 500) return '4xx';
    if (code >= 500 && code < 600) return '5xx';
    return null;
}

/**
 * HTTP status codes utility
 * @description Provides standardized HTTP status codes with type-safe access
 */
export const httpStatusLite = Object.freeze({
    ...statusCodes,
    ...statusMessages,
    ...reverseLookup,
    getStatus,
    isSuccess,
    isRedirect,
    isClientError,
    isServerError,
    isError,
    getCategory,
});

export type { HttpStatusName };
