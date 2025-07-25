/**
 * An object representing different HTTP status codes.
 * @enum {number}
 */
const httpStatusLite = Object.freeze({
    /** Informational responses (100–199) */

    /**
     * CONTINUE The initial part of a request has been received and has not yet been rejected by the server.
     * Example: The client uploads a large file in chunks; the server responds with 100 Continue after receiving the headers.
     */
    CONTINUE: 100 as const,

    /**
     * SWITCHING_PROTOCOLS The server is switching protocols as requested by the client.
     * Example: The client requests to switch from HTTP/1.1 to HTTP/2 using an Upgrade header.
     */
    SWITCHING_PROTOCOLS: 101 as const,

    /**
     * PROCESSING The server has received and is processing the request, but no response is available yet.
     * Example: Used in WebDAV for asynchronous requests.
     */
    PROCESSING: 102 as const,

    /**
     * EARLY_HINTS The server sends preloading hints to the client before the final response.
     * Example: A Early Hints can include links to stylesheets or scripts to improve loading times.
     */
    EARLY_HINTS: 103 as const,

    /** Successful responses (200–299) */

    /**
     * OK The request has succeeded.
     * Example: A GET request for a resource is successfully returned with a 200 OK response.
     */
    OK: 200 as const,

    /**
     * CREATED The request has been fulfilled and resulted in the creation of a new resource.
     * Example: A POST request to create a new user account returns 201 Created.
     */
    CREATED: 201 as const,

    /**
     * ACCEPTED The request has been accepted for processing but is not yet completed.
     * Example: An asynchronous request for a long-running operation returns 202 Accepted.
     */
    ACCEPTED: 202 as const,

    /**
     * NON_AUTHORITATIVE_INFORMATION The returned meta-information is from a local or third-party copy, not the origin server.
     * Example: A 203 response might be returned by a cache server.
     */
    NON_AUTHORITATIVE_INFORMATION: 203 as const,

    /**
     * NO_CONTENT The server successfully processed the request, but there is no content to return.
     * Example: A DELETE request returns 204 No Content when the resource is successfully deleted.
     */
    NO_CONTENT: 204 as const,

    /**
     * RESET_CONTENT The server successfully processed the request, and the client should reset the view.
     * Example: Used in form submissions where the form is cleared after submission.
     */
    RESET_CONTENT: 205 as const,

    /**
     * PARTIAL_CONTENT The server is delivering only part of the resource due to a range header sent by the client.
     * Example: A video streaming service uses this for seeking within a file.
     */
    PARTIAL_CONTENT: 206 as const,

    /**
     * MULTI_STATUS The server sends multiple status codes for a WebDAV request.
     * Example: Used for batch processing where individual resources may return different status codes.
     */
    MULTI_STATUS: 207 as const,

    /**
     * ALREADY_REPORTED The members of a DAV binding have already been reported in a previous reply.
     * Example: Used in WebDAV to avoid reporting the same resource multiple times.
     */
    ALREADY_REPORTED: 208 as const,

    /**
     * IM_USED The server has fulfilled the request using an instance-manipulation.
     * Example: Used for advanced HTTP content negotiation.
     */
    IM_USED: 226 as const,

    /** Redirection messages (300–399) */

    /**
     * MULTIPLE_CHOICES The request has multiple options for the resource.
     * Example: A URL could lead to multiple pages or formats (HTML, JSON, etc.).
     */
    MULTIPLE_CHOICES: 300 as const,

    /**
     * MOVED_PERMANENTLY The resource has been permanently moved to a new URL.
     * Example: Redirecting to a new domain with 301 Moved Permanently.
     */
    MOVED_PERMANENTLY: 301 as const,

    /**
     * FOUND The resource is temporarily available at a different URL.
     * Example: Temporary redirect for a resource under maintenance.
     */
    FOUND: 302 as const,

    /**
     * SEE_OTHER The client should use a different URL to fetch the resource.
     * Example: After a POST request, redirecting to a status page.
     */
    SEE_OTHER: 303 as const,

    /**
     * NOT_MODIFIED The resource has not been modified since the last request.
     * Example: A cache validation request with If-None-Match returns 304 if the resource is unchanged.
     */
    NOT_MODIFIED: 304 as const,

    /**
     * USE_PROXY The requested resource is only available through a proxy, and the address is provided in the response.
     * Example: A 305 Use Proxy status code indicates the client must use a proxy specified in the response.
     * Note: Deprecated due to security concerns.
     */
    USE_PROXY: 305 as const,

    /**
     * UNUSED This code is no longer used but was reserved in the past.
     * Example: It was once intended to indicate an unused HTTP status.
     */
    UNUSED: 306 as const,

    /**
     * TEMPORARY_REDIRECT The resource resides temporarily at a different URI and the client should retry the request using the same method.
     * Example: Used during server maintenance or load balancing.
     */
    TEMPORARY_REDIRECT: 307 as const,

    /**
     * PERMANENT_REDIRECT The resource has been permanently moved to a new URL and future requests should use the new URL.
     * Example: A website migrates to HTTPS with 308 Permanent Redirect.
     */
    PERMANENT_REDIRECT: 308 as const,

    /** Client error responses (400–499) */

    /**
     * BAD_REQUEST The server cannot process the request due to a client error.
     * Example: Invalid JSON in a POST request body returns 400 Bad Request.
     */
    BAD_REQUEST: 400 as const,

    /**
     * UNAUTHORIZED The client must authenticate itself to get the requested response.
     * Example: An API requires an access token and responds with 401 Unauthorized if it is missing or invalid.
     */
    UNAUTHORIZED: 401 as const,

    /**
     * PAYMENT_REQUIRED Reserved for future use.
     * Example: Currently not widely used.
     */
    PAYMENT_REQUIRED: 402 as const,

    /**
     * FORBIDDEN The server understands the request but refuses to authorize it.
     * Example: Accessing a restricted resource without the necessary permissions returns 403 Forbidden.
     */
    FORBIDDEN: 403 as const,

    /**
     * NOT_FOUND The server cannot find the requested resource.
     * Example: A 404 Not Found is returned for a non-existent page.
     */
    NOT_FOUND: 404 as const,

    /**
     * METHOD_NOT_ALLOWED The HTTP method is not allowed for the requested resource.
     * Example: A GET request to a resource that only supports POST returns 405 Method Not Allowed.
     */
    METHOD_NOT_ALLOWED: 405 as const,

    /**
     * NOT_ACCEPTABLE The server cannot produce a response matching the accept headers sent by the client.
     * Example: A client requests JSON but the server only supports XML, returning 406 Not Acceptable.
     */
    NOT_ACCEPTABLE: 406 as const,

    /**
     * PROXY_AUTHENTICATION_REQUIRED The client must authenticate with a proxy.
     * Example: A proxy server requires authentication for further requests.
     */
    PROXY_AUTHENTICATION_REQUIRED: 407 as const,

    /**
     * REQUEST_TIMEOUT The client did not send a request within the time the server was prepared to wait.
     * Example: Slow connections may result in a 408 Request Timeout.
     */
    REQUEST_TIMEOUT: 408 as const,

    /**
     * CONFLICT The request could not be processed because of a conflict in the request.
     * Example: A 409 Conflict is returned when trying to update a resource with stale data.
     */
    CONFLICT: 409 as const,

    /**
     * GONE The requested resource is no longer available on the server and no forwarding address is provided.
     * Example: A 410 Gone status code is used for permanently removed resources.
     */
    GONE: 410 as const,

    /**
     * LENGTH_REQUIRED The server refuses to accept the request without a defined Content-Length header.
     * Example: A 411 Length Required is returned when the Content-Length is missing.
     */
    LENGTH_REQUIRED: 411 as const,

    /**
     * PRECONDITION_FAILED The server does not meet one of the preconditions specified by the client.
     * Example: A 412 Precondition Failed is used when an If-Match header fails validation.
     */
    PRECONDITION_FAILED: 412 as const,

    /**
     * PAYLOAD_TOO_LARGE The request entity is larger than the server is willing or able to process.
     * Example: A file upload exceeding the server limit returns 413 Payload Too Large.
     */
    PAYLOAD_TOO_LARGE: 413 as const,

    /**
     * URI_TOO_LONG The URI requested by the client is longer than the server is willing to interpret.
     * Example: A 414 URI Too Long is returned when a query string is too long.
     */
    URI_TOO_LONG: 414 as const,

    /**
     * UNSUPPORTED_MEDIA_TYPE The server refuses to accept the request because the payload format is unsupported.
     * Example: A 415 Unsupported Media Type is used when sending an unsupported file type.
     */
    UNSUPPORTED_MEDIA_TYPE: 415 as const,

    /**
     * RANGE_NOT_SATISFIABLE The server cannot fulfill the Range header specified in the request.
     * Example: A 416 Range Not Satisfiable is returned when requesting a range outside the file's length.
     */
    RANGE_NOT_SATISFIABLE: 416 as const,

    /**
     * EXPECTATION_FAILED The server cannot meet the requirements of the Expect header in the request.
     * Example: A 417 Expectation Failed is returned if the server cannot fulfill the Expect: 100-continue.
     */
    EXPECTATION_FAILED: 417 as const,

    /**
     * IM_A_TEAPOT The server refuses to brew coffee because it is, permanently, a teapot.
     * Example: A playful 418 I'm a teapot is defined in the Hyper Text Coffee Pot Control Protocol.
     */
    IM_A_TEAPOT: 418 as const,

    /**
     * MISDIRECTED_REQUEST The server cannot produce a response for this request because it is not properly configured to do so.
     * Example: A 421 Misdirected Request is returned when the request is directed at a server that cannot handle it.
     */
    MISDIRECTED_REQUEST: 421 as const,

    /**
     * UNPROCESSABLE_ENTITY The server understands the request but cannot process it due to semantic errors.
     * Example: A 422 Unprocessable Entity is used in WebDAV extensions.
     */
    UNPROCESSABLE_ENTITY: 422 as const,

    /**
     * LOCKED The requested resource is locked.
     * Example: A 423 Locked status code is used in WebDAV extensions for locked resources.
     */
    LOCKED: 423 as const,

    /**
     * FAILED_DEPENDENCY The request failed due to failure of a previous request.
     * Example: A 424 Failed Dependency is used in WebDAV when a dependency fails.
     */
    FAILED_DEPENDENCY: 424 as const,

    /**
     * TOO_EARLY The server is unwilling to risk processing a request that might be replayed.
     * Example: A 425 Too Early is used to prevent replay attacks in early requests.
     */
    TOO_EARLY: 425 as const,

    /**
     * UPGRADE_REQUIRED The client should switch to a different protocol.
     * Example: A 426 Upgrade Required is used to indicate a protocol switch, such as to HTTP/2.
     */
    UPGRADE_REQUIRED: 426 as const,

    /**
     * PRECONDITION_REQUIRED The server requires the request to be conditional.
     * Example: A 428 Precondition Required is used to avoid race conditions during updates.
     */
    PRECONDITION_REQUIRED: 428 as const,

    /**
     * TOO_MANY_REQUESTS The user has sent too many requests in a given amount of time.
     * Example: A 429 Too Many Requests is used for rate-limiting APIs.
     */
    TOO_MANY_REQUESTS: 429 as const,

    /**
     * REQUEST_HEADER_FIELDS_TOO_LARGE The server is unwilling to process the request because the headers are too large.
     * Example: A 431 Request Header Fields Too Large is used for requests with excessive headers.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431 as const,

    /**
     * UNAVAILABLE_FOR_LEGAL_REASONS The server cannot serve the resource due to legal reasons.
     * Example: A 451 Unavailable For Legal Reasons is returned when access is restricted by law.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS: 451 as const,

    /** Server error responses (500–599) */

    /**
     * INTERNAL_SERVER_ERROR The server encountered an unexpected condition that prevented it from fulfilling the request.
     * Example: A 500 Internal Server Error is a generic server error response.
     */
    INTERNAL_SERVER_ERROR: 500 as const,

    /**
     * NOT_IMPLEMENTED The server does not support the functionality required to fulfill the request.
     * Example: A 501 Not Implemented is returned for unsupported HTTP methods.
     */
    NOT_IMPLEMENTED: 501 as const,

    /**
     * BAD_GATEWAY The server received an invalid response from the upstream server.
     * Example: A 502 Bad Gateway is returned for gateway or proxy issues.
     */
    BAD_GATEWAY: 502 as const,

    /**
     * SERVICE_UNAVAILABLE The server is currently unable to handle the request due to temporary overload or maintenance.
     * Example: A 503 Service Unavailable is used during server downtime.
     */
    SERVICE_UNAVAILABLE: 503 as const,

    /**
     * GATEWAY_TIMEOUT The server did not receive a timely response from the upstream server.
     * Example: A 504 Gateway Timeout is returned when a request times out at the gateway.
     */
    GATEWAY_TIMEOUT: 504 as const,

    /**
     * HTTP_VERSION_NOT_SUPPORTED The server does not support the HTTP version used in the request.
     * Example: A 505 HTTP Version Not Supported indicates an unsupported HTTP protocol version.
     */
    HTTP_VERSION_NOT_SUPPORTED: 505 as const,

    /**
     * VARIANT_ALSO_NEGOTIATES The server has an internal configuration error.
     * Example: A 506 Variant Also Negotiates is returned for a misconfigured transparent content negotiation.
     */
    VARIANT_ALSO_NEGOTIATES: 506 as const,

    /**
     * INSUFFICIENT_STORAGE The server is unable to store the representation needed to complete the request.
     * Example: A 507 Insufficient Storage is used in WebDAV for insufficient space.
     */
    INSUFFICIENT_STORAGE: 507 as const,

    /**
     * LOOP_DETECTED The server detected an infinite loop while processing the request.
     * Example: A 508 Loop Detected is used in WebDAV for circular references.
     */
    LOOP_DETECTED: 508 as const,

    /**
     * NOT_EXTENDED Further extensions to the request are required for the server to fulfill it.
     * Example: A 510 Not Extended is used when additional extension details are needed.
     */
    NOT_EXTENDED: 510 as const,

    /**
     * NETWORK_AUTHENTICATION_REQUIRED The client must authenticate to gain network access.
     * Example: A captive portal redirects unauthenticated users to a login page.
     */
    NETWORK_AUTHENTICATION_REQUIRED: 511 as const,
});

/**
 * Type definition for HTTP status codes.
 */
export type HttpStatusType = keyof typeof httpStatusLite;

export default httpStatusLite;
