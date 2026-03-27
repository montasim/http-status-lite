# http-status-lite

> Lightweight, type-safe HTTP status codes utility for Node.js and browsers

[![npm version](https://badge.fury.io/js/http-status-lite.svg)](https://www.npmjs.com/package/http-status-lite)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/http-status-lite)](https://bundlephobia.com/result?p=http-status-lite)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://http-status-lite-demo.netlify.app)

## Features

- 📦 **Ultra-lightweight**: ~5-7 KB minified, zero runtime dependencies
- 🔒 **Type-safe**: Full TypeScript support with generated union types
- 🌐 **Comprehensive**: All ~64 IANA-registered HTTP status codes
- 🔄 **Dual ESM/CJS**: Works in Node.js and modern browsers
- 🛠️ **Utility helpers**: Category checks and status lookups
- 📝 **Well-documented**: Full JSDoc comments with examples
- 🌲 **Tree-shakeable**: Import only what you need

## Installation

```bash
# npm
npm install http-status-lite

# yarn
yarn add http-status-lite

# pnpm
pnpm add http-status-lite

# bun
bun add http-status-lite
```

## Quick Start

```typescript
import { httpStatusLite, HttpStatusName } from 'http-status-lite';

// Access status codes directly
console.log(httpStatusLite.OK); // 200
console.log(httpStatusLite.NOT_FOUND); // 404
console.log(httpStatusLite.INTERNAL_SERVER_ERROR); // 500

// Access status messages
console.log(httpStatusLite.OK_MESSAGE); // 'OK'
console.log(httpStatusLite.NOT_FOUND_MESSAGE); // 'Not Found'

// Type-safe access with union types
const status: HttpStatusName = 'CREATED';
console.log(httpStatusLite[status]); // 201

// Reverse lookup by numeric code
console.log(httpStatusLite[200]); // 'OK'
console.log(httpStatusLite[404]); // 'Not Found'
```

## Use Cases

### 1. HTTP API Responses

```typescript
import { httpStatusLite, HttpStatusName } from 'http-status-lite';

function createApiResponse(status: HttpStatusName, data: unknown) {
    return {
        statusCode: httpStatusLite[status],
        body: JSON.stringify(data),
    };
}

// Usage
const response = createApiResponse('OK', { message: 'Success' });
// { statusCode: 200, body: '{"message":"Success"}' }
```

### 2. Status Category Checks

```typescript
import { httpStatusLite } from 'http-status-lite';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (httpStatusLite.isSuccess(response.status)) {
        console.log('Request succeeded');
    } else if (httpStatusLite.isClientError(response.status)) {
        console.error('Client error - check your request');
    } else if (httpStatusLite.isServerError(response.status)) {
        console.error('Server error - try again later');
    }

    return response;
}
```

### 3. Error Handling Middleware

```typescript
import { httpStatusLite, HttpStatusName } from 'http-status-lite';

function errorHandler(error: Error) {
    const status: HttpStatusName =
        error.name === 'ValidationError' ? 'BAD_REQUEST' : 'INTERNAL_SERVER_ERROR';

    return {
        status: httpStatusLite[status],
        message: error.message,
    };
}
```

### 4. Status Code Details

```typescript
import { httpStatusLite } from 'http-status-lite';

// Get full status information
const status = httpStatusLite.getStatus(404);
console.log(status);
// { code: 404, name: 'NOT_FOUND', message: 'Not Found' }

// Extract specific fields
console.log(httpStatusLite.getStatus(200, 'message')); // 'OK'
console.log(httpStatusLite.getStatus(404, 'name')); // 'NOT_FOUND'
console.log(httpStatusLite.getStatus(500, 'code')); // 500
```

### 5. Category Grouping

```typescript
import { httpStatusLite } from 'http-status-lite';

// Get category for a status code
console.log(httpStatusLite.getCategory(200)); // '2xx'
console.log(httpStatusLite.getCategory(301)); // '3xx'
console.log(httpStatusLite.getCategory(404)); // '4xx'
console.log(httpStatusLite.getCategory(500)); // '5xx'
```

## API Reference

### Status Code Constants

All status codes available as uppercase constants:

```typescript
httpStatusLite.OK; // 200
httpStatusLite.CREATED; // 201
httpStatusLite.ACCEPTED; // 202
httpStatusLite.MOVED_PERMANENTLY; // 301
httpStatusLite.BAD_REQUEST; // 400
httpStatusLite.UNAUTHORIZED; // 401
httpStatusLite.FORBIDDEN; // 403
httpStatusLite.NOT_FOUND; // 404
httpStatusLite.INTERNAL_SERVER_ERROR; // 500
httpStatusLite.SERVICE_UNAVAILABLE; // 503
// ... and ~54 more codes
```

### Status Message Constants

Status messages available as `{CODE}_MESSAGE` constants:

```typescript
httpStatusLite.OK_MESSAGE; // 'OK'
httpStatusLite.NOT_FOUND_MESSAGE; // 'Not Found'
httpStatusLite.INTERNAL_SERVER_ERROR_MESSAGE; // 'Internal Server Error'
```

### Helper Functions

#### `getStatus(code, field?)`

Get detailed information about a status code.

```typescript
// Parameters
code: number           // HTTP status code (e.g., 200, 404, 500)
field?: 'code' | 'name' | 'message'  // Optional field to extract

// Returns
HttpStatusEntry | number | string | null

// Examples
httpStatusLite.getStatus(200);
// { code: 200, name: 'OK', message: 'OK' }

httpStatusLite.getStatus(404, 'message'); // 'Not Found'
httpStatusLite.getStatus(500, 'code');    // 500
httpStatusLite.getStatus(999);            // null (unknown code)
```

#### `isSuccess(code)`

Check if status code indicates success (2xx).

```typescript
httpStatusLite.isSuccess(200); // true
httpStatusLite.isSuccess(404); // false
```

#### `isRedirect(code)`

Check if status code is a redirect (3xx).

```typescript
httpStatusLite.isRedirect(301); // true
httpStatusLite.isRedirect(200); // false
```

#### `isClientError(code)`

Check if status code is a client error (4xx).

```typescript
httpStatusLite.isClientError(404); // true
httpStatusLite.isClientError(500); // false
```

#### `isServerError(code)`

Check if status code is a server error (5xx).

```typescript
httpStatusLite.isServerError(500); // true
httpStatusLite.isServerError(404); // false
```

#### `isError(code)`

Check if status code is any error (4xx or 5xx).

```typescript
httpStatusLite.isError(404); // true
httpStatusLite.isError(500); // true
httpStatusLite.isError(200); // false
```

#### `getCategory(code)`

Get the category string for a status code.

```typescript
httpStatusLite.getCategory(200); // '2xx'
httpStatusLite.getCategory(301); // '3xx'
httpStatusLite.getCategory(404); // '4xx'
httpStatusLite.getCategory(500); // '5xx'
```

## TypeScript Support

Full TypeScript support with generated union types:

```typescript
import { httpStatusLite, HttpStatusName } from 'http-status-lite';

// HttpStatusName is a union of all status code names
type StatusName = HttpStatusName;
// 'CONTINUE' | 'SWITCHING_PROTOCOLS' | 'OK' | 'CREATED' | ...

// Type-safe status code access
function sendResponse(status: HttpStatusName, body: unknown) {
    return {
        statusCode: httpStatusLite[status],
        body,
    };
}

// TypeScript will validate status names
sendResponse('OK', {}); // ✅ Valid
sendResponse('INVALID_STATUS', {}); // ❌ Type error
```

## Status Codes

This package includes all IANA-registered HTTP status codes:

### Informational (1xx)

- `100 CONTINUE` - Continue
- `101 SWITCHING_PROTOCOLS` - Switching Protocols
- `102 PROCESSING` - Processing (WebDAV)
- `103 EARLY_HINTS` - Early Hints

### Success (2xx)

- `200 OK` - OK
- `201 CREATED` - Created
- `202 ACCEPTED` - Accepted
- `203 NON_AUTHORITATIVE_INFORMATION` - Non-Authoritative Information
- `204 NO_CONTENT` - No Content
- `205 RESET_CONTENT` - Reset Content
- `206 PARTIAL_CONTENT` - Partial Content
- `207 MULTI_STATUS` - Multi-Status (WebDAV)
- `208 ALREADY_REPORTED` - Already Reported (WebDAV)
- `226 IM_USED` - IM Used (WebDAV)

### Redirection (3xx)

- `300 MULTIPLE_CHOICES` - Multiple Choices
- `301 MOVED_PERMANENTLY` - Moved Permanently
- `302 FOUND` - Found
- `303 SEE_OTHER` - See Other
- `304 NOT_MODIFIED` - Not Modified
- `305 USE_PROXY` - Use Proxy (Deprecated)
- `306 UNUSED` - Unused
- `307 TEMPORARY_REDIRECT` - Temporary Redirect
- `308 PERMANENT_REDIRECT` - Permanent Redirect

### Client Error (4xx)

- `400 BAD_REQUEST` - Bad Request
- `401 UNAUTHORIZED` - Unauthorized
- `402 PAYMENT_REQUIRED` - Payment Required
- `403 FORBIDDEN` - Forbidden
- `404 NOT_FOUND` - Not Found
- `405 METHOD_NOT_ALLOWED` - Method Not Allowed
- `406 NOT_ACCEPTABLE` - Not Acceptable
- `407 PROXY_AUTHENTICATION_REQUIRED` - Proxy Authentication Required
- `408 REQUEST_TIMEOUT` - Request Timeout
- `409 CONFLICT` - Conflict
- `410 GONE` - Gone
- `411 LENGTH_REQUIRED` - Length Required
- `412 PRECONDITION_FAILED` - Precondition Failed
- `413 PAYLOAD_TOO_LARGE` - Payload Too Large
- `414 URI_TOO_LONG` - URI Too Long
- `415 UNSUPPORTED_MEDIA_TYPE` - Unsupported Media Type
- `416 RANGE_NOT_SATISFIABLE` - Range Not Satisfiable
- `417 EXPECTATION_FAILED` - Expectation Failed
- `418 IM_A_TEAPOT` - I'm a teapot
- `422 UNPROCESSABLE_ENTITY` - Unprocessable Entity (WebDAV)
- `423 LOCKED` - Locked (WebDAV)
- `424 FAILED_DEPENDENCY` - Failed Dependency (WebDAV)
- `425 TOO_EARLY` - Too Early
- `426 UPGRADE_REQUIRED` - Upgrade Required
- `428 PRECONDITION_REQUIRED` - Precondition Required
- `429 TOO_MANY_REQUESTS` - Too Many Requests
- `431 REQUEST_HEADER_FIELDS_TOO_LARGE` - Request Header Fields Too Large
- `451 UNAVAILABLE_FOR_LEGAL_REASONS` - Unavailable For Legal Reasons

### Server Error (5xx)

- `500 INTERNAL_SERVER_ERROR` - Internal Server Error
- `501 NOT_IMPLEMENTED` - Not Implemented
- `502 BAD_GATEWAY` - Bad Gateway
- `503 SERVICE_UNAVAILABLE` - Service Unavailable
- `504 GATEWAY_TIMEOUT` - Gateway Timeout
- `505 HTTP_VERSION_NOT_SUPPORTED` - HTTP Version Not Supported
- `506 VARIANT_ALSO_NEGOTIATES` - Variant Also Negotiates
- `507 INSUFFICIENT_STORAGE` - Insufficient Storage (WebDAV)
- `508 LOOP_DETECTED` - Loop Detected (WebDAV)
- `510 NOT_EXTENDED` - Not Extended
- `511 NETWORK_AUTHENTICATION_REQUIRED` - Network Authentication Required

**Reference:** [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 80+
- Firefox 72+
- Safari 13.1+
- Edge 80+

## Node.js Support

- Node.js 18.0.0+ (LTS)
- Uses ESM format (import/export)
- CommonJS build included for compatibility

## Contributing

Contributions are welcome! Please follow these guidelines:

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Node.js/version** you're using
- **Expected behavior** vs actual behavior
- **Minimal code example** reproducing the issue
- **Error messages** or stack traces

### Suggesting Features

Feature suggestions are welcome! Please provide:

- **Use case** for the feature
- **Proposed API** if applicable
- **Examples** of how it would be used

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with:
    - Clear, descriptive commit messages
    - JSDoc comments for new public APIs
    - Tests for new functionality
    - Updated README if needed
4. Ensure tests pass (`npm test`)
5. Build the package (`npm run build`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/http-status-lite.git
cd http-status-lite

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Watch mode for development
npm run dev
```

### Code Style

- Use TypeScript for all source code
- Follow existing code formatting
- Add JSDoc comments for all public APIs
- Include usage examples in documentation
- Keep functions small and focused

## License

[![by-nc-nd/4.0](https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This work is licensed under a **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License** (CC BY-NC-ND 4.0).

### You are free to:

- **Share** — Copy and redistribute the material in any medium or format

### Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial** — You may not use the material for commercial purposes
- **NoDerivatives** — If you remix, transform, or build upon the material, you may not distribute the modified material

See [LICENSE](LICENSE) for the full text.

## Links

- [npm Package](https://www.npmjs.com/package/http-status-lite)
- [GitHub Repository](https://github.com/montasim/http-status-lite)
- [Live Demo & Documentation](https://http-status-lite-demo.netlify.app) - Interactive demo with all status codes
- [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)

## Acknowledgments

- HTTP status codes sourced from [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
- Inspired by popular packages like [http-status](https://www.npmjs.com/package/http-status) and [http-status-codes](https://www.npmjs.com/package/http-status-codes)

## Related Packages

- [http-status](https://www.npmjs.com/package/http-status) - Comprehensive HTTP status utility
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Simple status code constants

---

**Made with ❤️ for the JavaScript community**
