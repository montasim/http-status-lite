import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
    Status,
    assertStatusCode,
    getCategory,
    getReasonPhrase,
    getStatus,
    getStatusCode,
    getStatusName,
    httpStatusLite,
    isClientError,
    isError,
    isInformational,
    isKnownStatus,
    isRedirect,
    isServerError,
    isStatusCode,
    isStatusName,
    isSuccess,
    parseStatusCode,
    statuses,
} from '../dist/index.js';
import { getStatusMetadata, statusMetadata } from '../dist/metadata.js';

describe('registry integrity', () => {
    it('contains unique, ordered codes and names', () => {
        const codes = statuses.map(({ code }) => code);
        const names = statuses.map(({ name }) => name);

        assert.equal(new Set(codes).size, codes.length);
        assert.equal(new Set(names).size, names.length);
        assert.deepEqual(
            codes,
            [...codes].sort((left, right) => left - right),
        );
    });

    it('contains recent and easily missed registry entries', () => {
        assert.equal(Status.UPLOAD_RESUMPTION_SUPPORTED, 104);
        assert.equal(Status.MISDIRECTED_REQUEST, 421);
        assert.equal(Status.CONTENT_TOO_LARGE, 413);
        assert.equal(Status.UNPROCESSABLE_CONTENT, 422);
    });

    it('exposes immutable entries', () => {
        assert.equal(Object.isFrozen(statuses), true);
        assert.equal(Object.isFrozen(statuses[0]), true);
        assert.throws(() => {
            statuses[0].code = 999;
        }, TypeError);
    });
});

describe('lookups', () => {
    it('looks up complete status entries', () => {
        assert.deepEqual(getStatus(404), {
            code: 404,
            name: 'NOT_FOUND',
            message: 'Not Found',
        });
        assert.equal(getStatus(404, 'name'), 'NOT_FOUND');
        assert.equal(getStatus(404, 'message'), 'Not Found');
        assert.equal(getStatus(404, 'code'), 404);
        assert.equal(getStatus(499), null);
        assert.equal(getStatus(499, 'name'), null);
    });

    it('supports explicit forward and reverse lookups', () => {
        assert.equal(getStatusCode('NOT_FOUND'), 404);
        assert.equal(getStatusCode('UNKNOWN'), null);
        assert.equal(getStatusName(404), 'NOT_FOUND');
        assert.equal(getStatusName(499), null);
        assert.equal(getReasonPhrase(404), 'Not Found');
        assert.equal(getReasonPhrase(499), null);
    });

    it('distinguishes known entries from valid numeric ranges', () => {
        assert.equal(isClientError(499), true);
        assert.equal(isKnownStatus(499), false);
        assert.equal(isStatusCode(404), true);
        assert.equal(isStatusName('NOT_FOUND'), true);
        assert.equal(isStatusName('Not Found'), false);
    });
});

describe('parsing and validation', () => {
    it('parses only exact known status values', () => {
        assert.equal(parseStatusCode(404), 404);
        assert.equal(parseStatusCode('404'), 404);
        assert.equal(parseStatusCode(' 404 '), null);
        assert.equal(parseStatusCode('404.0'), null);
        assert.equal(parseStatusCode(499), null);
        assert.equal(parseStatusCode(null), null);
    });

    it('asserts and narrows registered codes', () => {
        assert.doesNotThrow(() => assertStatusCode(204));
        assert.throws(() => assertStatusCode(499), {
            name: 'TypeError',
            message: 'Expected a registered HTTP status code; received 499.',
        });
    });
});

describe('range predicates', () => {
    it('covers every HTTP status class', () => {
        assert.equal(isInformational(103), true);
        assert.equal(isSuccess(204), true);
        assert.equal(isRedirect(308), true);
        assert.equal(isClientError(451), true);
        assert.equal(isServerError(503), true);
        assert.equal(isError(404), true);
        assert.equal(isError(503), true);
    });

    it('rejects invalid numeric values', () => {
        for (const value of [NaN, Infinity, -Infinity, 200.5, 99, 600]) {
            assert.equal(getCategory(value), null);
            assert.equal(isSuccess(value), false);
            assert.equal(isError(value), false);
        }
    });

    it('returns categories for registered and unregistered in-range codes', () => {
        assert.equal(getCategory(104), '1xx');
        assert.equal(getCategory(250), '2xx');
        assert.equal(getCategory(399), '3xx');
        assert.equal(getCategory(499), '4xx');
        assert.equal(getCategory(599), '5xx');
    });
});

describe('optional metadata entry point', () => {
    it('keeps standards lifecycle information available', () => {
        assert.equal(statusMetadata.length, statuses.length);
        assert.deepEqual(getStatusMetadata(104), {
            code: 104,
            name: 'UPLOAD_RESUMPTION_SUPPORTED',
            message: 'Upload Resumption Supported',
            reference: 'draft-ietf-httpbis-resumable-upload-05',
            registryStatus: 'temporary',
            category: '1xx',
        });
        assert.equal(getStatusMetadata(418)?.registryStatus, 'unused');
        assert.equal(getStatusMetadata(510)?.registryStatus, 'obsolete');
    });
});

describe('backward compatibility', () => {
    it('retains the original namespace and legacy RFC terminology', () => {
        assert.equal(httpStatusLite.OK, 200);
        assert.equal(httpStatusLite.OK_MESSAGE, 'OK');
        assert.equal(httpStatusLite[404], 'NOT_FOUND');
        assert.equal(httpStatusLite[413], 'PAYLOAD_TOO_LARGE');
        assert.equal(httpStatusLite[422], 'UNPROCESSABLE_ENTITY');
        assert.equal(httpStatusLite.getStatus(404, 'message'), 'Not Found');
        assert.equal(httpStatusLite.PAYLOAD_TOO_LARGE, 413);
        assert.equal(httpStatusLite.UNPROCESSABLE_ENTITY, 422);
        assert.equal(httpStatusLite.isSuccess(200), true);
    });
});
