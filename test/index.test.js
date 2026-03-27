import { describe, it } from 'node:test';
import assert from 'node:assert';
import { httpStatusLite } from '../dist/index.js';

describe('Status Code Constants', () => {
    it('should export 1xx informational codes', () => {
        assert.strictEqual(httpStatusLite.CONTINUE, 100);
        assert.strictEqual(httpStatusLite.SWITCHING_PROTOCOLS, 101);
        assert.strictEqual(httpStatusLite.PROCESSING, 102);
        assert.strictEqual(httpStatusLite.EARLY_HINTS, 103);
    });

    it('should export 2xx success codes', () => {
        assert.strictEqual(httpStatusLite.OK, 200);
        assert.strictEqual(httpStatusLite.CREATED, 201);
        assert.strictEqual(httpStatusLite.ACCEPTED, 202);
        assert.strictEqual(httpStatusLite.NO_CONTENT, 204);
        assert.strictEqual(httpStatusLite.MULTI_STATUS, 207);
    });

    it('should export 3xx redirect codes', () => {
        assert.strictEqual(httpStatusLite.MOVED_PERMANENTLY, 301);
        assert.strictEqual(httpStatusLite.FOUND, 302);
        assert.strictEqual(httpStatusLite.TEMPORARY_REDIRECT, 307);
    });

    it('should export 4xx client error codes', () => {
        assert.strictEqual(httpStatusLite.BAD_REQUEST, 400);
        assert.strictEqual(httpStatusLite.UNAUTHORIZED, 401);
        assert.strictEqual(httpStatusLite.NOT_FOUND, 404);
        assert.strictEqual(httpStatusLite.IM_A_TEAPOT, 418);
        assert.strictEqual(httpStatusLite.UNPROCESSABLE_ENTITY, 422);
    });

    it('should export 5xx server error codes', () => {
        assert.strictEqual(httpStatusLite.INTERNAL_SERVER_ERROR, 500);
        assert.strictEqual(httpStatusLite.NOT_IMPLEMENTED, 501);
        assert.strictEqual(httpStatusLite.SERVICE_UNAVAILABLE, 503);
        assert.strictEqual(httpStatusLite.INSUFFICIENT_STORAGE, 507);
    });

    it('should export status message constants', () => {
        assert.strictEqual(httpStatusLite.OK_MESSAGE, 'OK');
        assert.strictEqual(httpStatusLite.NOT_FOUND_MESSAGE, 'Not Found');
        assert.strictEqual(httpStatusLite.INTERNAL_SERVER_ERROR_MESSAGE, 'Internal Server Error');
    });

    it('should support reverse lookup by numeric code', () => {
        assert.strictEqual(httpStatusLite[200], 'OK');
        assert.strictEqual(httpStatusLite[404], 'NOT_FOUND');
        assert.strictEqual(httpStatusLite[500], 'INTERNAL_SERVER_ERROR');
    });
});

describe('Helper Functions', () => {
    describe('getStatus', () => {
        it('should return full status object without field parameter', () => {
            const status = httpStatusLite.getStatus(200);
            assert.deepStrictEqual(status, {
                code: 200,
                name: 'OK',
                message: 'OK',
            });
        });

        it('should return specific field when field parameter provided', () => {
            assert.strictEqual(httpStatusLite.getStatus(200, 'message'), 'OK');
            assert.strictEqual(httpStatusLite.getStatus(404, 'name'), 'NOT_FOUND');
            assert.strictEqual(httpStatusLite.getStatus(500, 'code'), 500);
        });

        it('should return null for unknown status code', () => {
            assert.strictEqual(httpStatusLite.getStatus(999), null);
            assert.strictEqual(httpStatusLite.getStatus(0), null);
        });

        it('should return undefined for invalid field parameter', () => {
            assert.strictEqual(httpStatusLite.getStatus(200, 'invalid'), undefined);
        });
    });

    describe('isSuccess', () => {
        it('should return true for 2xx codes', () => {
            assert.strictEqual(httpStatusLite.isSuccess(200), true);
            assert.strictEqual(httpStatusLite.isSuccess(204), true);
            assert.strictEqual(httpStatusLite.isSuccess(206), true);
        });

        it('should return false for non-2xx codes', () => {
            assert.strictEqual(httpStatusLite.isSuccess(100), false);
            assert.strictEqual(httpStatusLite.isSuccess(300), false);
            assert.strictEqual(httpStatusLite.isSuccess(400), false);
            assert.strictEqual(httpStatusLite.isSuccess(500), false);
        });
    });

    describe('isRedirect', () => {
        it('should return true for 3xx codes', () => {
            assert.strictEqual(httpStatusLite.isRedirect(301), true);
            assert.strictEqual(httpStatusLite.isRedirect(307), true);
        });

        it('should return false for non-3xx codes', () => {
            assert.strictEqual(httpStatusLite.isRedirect(200), false);
            assert.strictEqual(httpStatusLite.isRedirect(404), false);
        });
    });

    describe('isClientError', () => {
        it('should return true for 4xx codes', () => {
            assert.strictEqual(httpStatusLite.isClientError(400), true);
            assert.strictEqual(httpStatusLite.isClientError(404), true);
            assert.strictEqual(httpStatusLite.isClientError(422), true);
        });

        it('should return false for non-4xx codes', () => {
            assert.strictEqual(httpStatusLite.isClientError(200), false);
            assert.strictEqual(httpStatusLite.isClientError(500), false);
        });
    });

    describe('isServerError', () => {
        it('should return true for 5xx codes', () => {
            assert.strictEqual(httpStatusLite.isServerError(500), true);
            assert.strictEqual(httpStatusLite.isServerError(503), true);
        });

        it('should return false for non-5xx codes', () => {
            assert.strictEqual(httpStatusLite.isServerError(200), false);
            assert.strictEqual(httpStatusLite.isServerError(404), false);
        });
    });

    describe('isError', () => {
        it('should return true for 4xx and 5xx codes', () => {
            assert.strictEqual(httpStatusLite.isError(400), true);
            assert.strictEqual(httpStatusLite.isError(404), true);
            assert.strictEqual(httpStatusLite.isError(500), true);
            assert.strictEqual(httpStatusLite.isError(503), true);
        });

        it('should return false for success and redirect codes', () => {
            assert.strictEqual(httpStatusLite.isError(200), false);
            assert.strictEqual(httpStatusLite.isError(301), false);
        });
    });

    describe('getCategory', () => {
        it('should return correct category for each range', () => {
            assert.strictEqual(httpStatusLite.getCategory(100), '1xx');
            assert.strictEqual(httpStatusLite.getCategory(200), '2xx');
            assert.strictEqual(httpStatusLite.getCategory(300), '3xx');
            assert.strictEqual(httpStatusLite.getCategory(400), '4xx');
            assert.strictEqual(httpStatusLite.getCategory(500), '5xx');
        });

        it('should return null for unknown codes', () => {
            assert.strictEqual(httpStatusLite.getCategory(999), null);
            assert.strictEqual(httpStatusLite.getCategory(0), null);
        });
    });
});
