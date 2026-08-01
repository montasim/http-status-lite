import {
    Status,
    assertStatusCode,
    getReasonPhrase,
    getStatus,
    getStatusCode,
    getStatusName,
    isStatusCode,
    type HttpStatusCode,
    type HttpStatusName,
} from '../src/index.js';
import { getStatusMetadata } from '../src/metadata.js';

type Equal<Left, Right> =
    (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right ? 1 : 2
        ? true
        : false;
type Expect<Value extends true> = Value;

const notFound = getStatus(404);
void notFound;
type StatusNameIsExact = Expect<Equal<typeof notFound.name, 'NOT_FOUND'>>;
type StatusMessageIsExact = Expect<Equal<typeof notFound.message, 'Not Found'>>;
type CodeLookupIsExact = Expect<Equal<ReturnType<typeof getNotFoundCode>, 404>>;
type NameLookupIsExact = Expect<Equal<ReturnType<typeof getNotFoundName>, 'NOT_FOUND'>>;
type MessageLookupIsExact = Expect<Equal<ReturnType<typeof getNotFoundMessage>, 'Not Found'>>;
type FieldLookupIsExact = Expect<Equal<ReturnType<typeof getNotFoundField>, 'NOT_FOUND'>>;
type MetadataStateIsExact = Expect<
    Equal<ReturnType<typeof getTemporaryMetadata>['registryStatus'], 'temporary'>
>;

function getNotFoundCode() {
    return getStatusCode('NOT_FOUND');
}
function getNotFoundName() {
    return getStatusName(404);
}
function getNotFoundMessage() {
    return getReasonPhrase(404);
}
function getNotFoundField() {
    return getStatus(404, 'name');
}
function getTemporaryMetadata() {
    return getStatusMetadata(104);
}
void getNotFoundCode;
void getNotFoundName;
void getNotFoundMessage;
void getNotFoundField;
void getTemporaryMetadata;

const validName: HttpStatusName = 'OK';
const validCode: HttpStatusCode = Status.OK;
void validName;
void validCode;

// @ts-expect-error invalid names must not enter the generated union
const invalidName: HttpStatusName = 'INVALID_STATUS';
// @ts-expect-error unregistered values must not enter the generated union
const invalidCode: HttpStatusCode = 499;
void invalidName;
void invalidCode;

declare const input: unknown;
if (isStatusCode(input)) {
    const narrowed: HttpStatusCode = input;
    void narrowed;
}

declare let assertedInput: unknown;
assertStatusCode(assertedInput);
const asserted: HttpStatusCode = assertedInput;
void asserted;

export type {
    CodeLookupIsExact,
    FieldLookupIsExact,
    MessageLookupIsExact,
    MetadataStateIsExact,
    NameLookupIsExact,
    StatusMessageIsExact,
    StatusNameIsExact,
};
