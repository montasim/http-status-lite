import httpStatusLite, { HttpStatusType } from '../src/index';

describe('httpStatusLite', () => {
    /**
     * Ensures the httpStatusLite module is defined and immutable.
     */
    it('should be defined and frozen', () => {
        expect(httpStatusLite).toBeDefined();
        expect(Object.isFrozen(httpStatusLite)).toBe(true); // Ensures the object is immutable
    });

    /**
     * Verifies correct status codes for informational responses.
     */
    it('should return correct status codes for informational responses (1xx)', () => {
        expect(httpStatusLite.CONTINUE).toBe(100);
        expect(httpStatusLite.SWITCHING_PROTOCOLS).toBe(101);
        expect(httpStatusLite.PROCESSING).toBe(102);
        expect(httpStatusLite.EARLY_HINTS).toBe(103);
    });

    /**
     * Verifies correct status codes for successful responses.
     */
    it('should return correct status codes for successful responses (2xx)', () => {
        expect(httpStatusLite.OK).toBe(200);
        expect(httpStatusLite.CREATED).toBe(201);
        expect(httpStatusLite.ACCEPTED).toBe(202);
        expect(httpStatusLite.NON_AUTHORITATIVE_INFORMATION).toBe(203);
        expect(httpStatusLite.NO_CONTENT).toBe(204);
        expect(httpStatusLite.RESET_CONTENT).toBe(205);
        expect(httpStatusLite.PARTIAL_CONTENT).toBe(206);
        expect(httpStatusLite.MULTI_STATUS).toBe(207);
        expect(httpStatusLite.ALREADY_REPORTED).toBe(208);
        expect(httpStatusLite.IM_USED).toBe(226);
    });

    /**
     * Verifies correct status codes for redirection messages.
     */
    it('should return correct status codes for redirection messages (3xx)', () => {
        expect(httpStatusLite.MULTIPLE_CHOICES).toBe(300);
        expect(httpStatusLite.MOVED_PERMANENTLY).toBe(301);
        expect(httpStatusLite.FOUND).toBe(302);
        expect(httpStatusLite.SEE_OTHER).toBe(303);
        expect(httpStatusLite.NOT_MODIFIED).toBe(304);
        expect(httpStatusLite.USE_PROXY).toBe(305);
        expect(httpStatusLite.UNUSED).toBe(306);
        expect(httpStatusLite.TEMPORARY_REDIRECT).toBe(307);
        expect(httpStatusLite.PERMANENT_REDIRECT).toBe(308);
    });

    /**
     * Verifies correct status codes for client error responses.
     */
    it('should return correct status codes for client error responses (4xx)', () => {
        expect(httpStatusLite.BAD_REQUEST).toBe(400);
        expect(httpStatusLite.UNAUTHORIZED).toBe(401);
        expect(httpStatusLite.PAYMENT_REQUIRED).toBe(402);
        expect(httpStatusLite.FORBIDDEN).toBe(403);
        expect(httpStatusLite.NOT_FOUND).toBe(404);
        expect(httpStatusLite.METHOD_NOT_ALLOWED).toBe(405);
        expect(httpStatusLite.NOT_ACCEPTABLE).toBe(406);
        expect(httpStatusLite.PROXY_AUTHENTICATION_REQUIRED).toBe(407);
        expect(httpStatusLite.REQUEST_TIMEOUT).toBe(408);
        expect(httpStatusLite.CONFLICT).toBe(409);
        expect(httpStatusLite.GONE).toBe(410);
        expect(httpStatusLite.LENGTH_REQUIRED).toBe(411);
        expect(httpStatusLite.PRECONDITION_FAILED).toBe(412);
        expect(httpStatusLite.PAYLOAD_TOO_LARGE).toBe(413);
        expect(httpStatusLite.URI_TOO_LONG).toBe(414);
        expect(httpStatusLite.UNSUPPORTED_MEDIA_TYPE).toBe(415);
        expect(httpStatusLite.RANGE_NOT_SATISFIABLE).toBe(416);
        expect(httpStatusLite.EXPECTATION_FAILED).toBe(417);
        expect(httpStatusLite.IM_A_TEAPOT).toBe(418);
        expect(httpStatusLite.MISDIRECTED_REQUEST).toBe(421);
        expect(httpStatusLite.UNPROCESSABLE_ENTITY).toBe(422);
        expect(httpStatusLite.LOCKED).toBe(423);
        expect(httpStatusLite.FAILED_DEPENDENCY).toBe(424);
        expect(httpStatusLite.TOO_EARLY).toBe(425);
        expect(httpStatusLite.UPGRADE_REQUIRED).toBe(426);
        expect(httpStatusLite.PRECONDITION_REQUIRED).toBe(428);
        expect(httpStatusLite.TOO_MANY_REQUESTS).toBe(429);
        expect(httpStatusLite.REQUEST_HEADER_FIELDS_TOO_LARGE).toBe(431);
        expect(httpStatusLite.UNAVAILABLE_FOR_LEGAL_REASONS).toBe(451);
    });

    /**
     * Verifies correct status codes for server error responses.
     */
    it('should return correct status codes for server error responses (5xx)', () => {
        expect(httpStatusLite.INTERNAL_SERVER_ERROR).toBe(500);
        expect(httpStatusLite.NOT_IMPLEMENTED).toBe(501);
        expect(httpStatusLite.BAD_GATEWAY).toBe(502);
        expect(httpStatusLite.SERVICE_UNAVAILABLE).toBe(503);
        expect(httpStatusLite.GATEWAY_TIMEOUT).toBe(504);
        expect(httpStatusLite.HTTP_VERSION_NOT_SUPPORTED).toBe(505);
        expect(httpStatusLite.VARIANT_ALSO_NEGOTIATES).toBe(506);
        expect(httpStatusLite.INSUFFICIENT_STORAGE).toBe(507);
        expect(httpStatusLite.LOOP_DETECTED).toBe(508);
        expect(httpStatusLite.NOT_EXTENDED).toBe(510);
        expect(httpStatusLite.NETWORK_AUTHENTICATION_REQUIRED).toBe(511);
    });

    /**
     * Validates that only valid keys are allowed as HttpStatusType type.
     * Ensures TypeScript type safety for valid and invalid keys.
     */
    it('should allow only valid keys as HttpStatusType type', () => {
        const validStatusCode: HttpStatusType = 'OK';
        expect(httpStatusLite[validStatusCode]).toBe(200);

        // @ts-expect-error This should throw a TypeScript error during compilation
        const invalidStatusCode: HttpStatusType = 'INVALID';
        // Uncomment below to test runtime behavior if needed:
        expect(httpStatusLite[invalidStatusCode]).toBeUndefined();
    });

    /**
     * Creates a snapshot of the entire httpStatusLite object for consistency checks.
     */
    it('should match snapshot for the entire constants object', () => {
        expect(httpStatusLite).toMatchSnapshot();
    });
});
