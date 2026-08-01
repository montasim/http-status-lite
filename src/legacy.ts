import { Status } from './codes.js';
import { STATUS_DEFINITIONS } from './generated/statuses.js';
import {
    getReasonPhrase,
    getStatus,
    getStatusCode,
    getStatusName,
    isKnownStatus,
    isStatusCode,
    isStatusName,
} from './lookup.js';
import { assertStatusCode, parseStatusCode } from './parsing.js';
import {
    getCategory,
    isClientError,
    isError,
    isInformational,
    isRedirect,
    isServerError,
    isSuccess,
} from './predicates.js';
import type { HttpStatusCode, HttpStatusEntry, NameForCode } from './types.js';

type MessageConstants = {
    readonly [Entry in HttpStatusEntry as `${Entry['name']}_MESSAGE`]: Entry['message'];
};
type ReverseLookup = {
    readonly [Code in HttpStatusCode]: NameForCode<Code>;
};

const messages = Object.fromEntries(
    STATUS_DEFINITIONS.map(({ name, message }) => [`${name}_MESSAGE`, message]),
) as MessageConstants;
const reverseLookup = Object.fromEntries(
    STATUS_DEFINITIONS.map(({ code, name }) => [code, name]),
) as ReverseLookup;

/**
 * Backward-compatible namespace. New code can prefer named exports or `Status`.
 */
export const httpStatusLite = Object.freeze({
    ...Status,
    ...messages,
    ...reverseLookup,
    // Pre-RFC 9110 names retained for existing consumers.
    413: 'PAYLOAD_TOO_LARGE' as const,
    422: 'UNPROCESSABLE_ENTITY' as const,
    PAYLOAD_TOO_LARGE: 413 as const,
    PAYLOAD_TOO_LARGE_MESSAGE: 'Payload Too Large' as const,
    UNPROCESSABLE_ENTITY: 422 as const,
    UNPROCESSABLE_ENTITY_MESSAGE: 'Unprocessable Entity' as const,
    getStatus,
    getStatusCode,
    getStatusName,
    getReasonPhrase,
    getCategory,
    isStatusCode,
    isStatusName,
    isKnownStatus,
    parseStatusCode,
    assertStatusCode,
    isInformational,
    isSuccess,
    isRedirect,
    isClientError,
    isServerError,
    isError,
});
