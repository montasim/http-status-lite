# http-status-lite

Tiny, standards-backed, type-safe HTTP status codes for Node.js and browsers.

[![npm version](https://img.shields.io/npm/v/http-status-lite)](https://www.npmjs.com/package/http-status-lite)
[![CI](https://github.com/montasim/http-status-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/montasim/http-status-lite/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/http-status-lite)](LICENSE)
[![Support on SupportKori](https://img.shields.io/badge/Support-SupportKori-FFDD00)](https://www.supportkori.com/montasim)

**[Try the live reference](https://http-status-lite-demo.netlify.app/) · [View the monorepo](https://github.com/montasim/http-status-lite)**

## Why use it?

- Exact `HttpStatusCode` and `HttpStatusName` unions generated from one registry snapshot
- Literal-preserving lookups: `getStatus(404).name` is typed as `'NOT_FOUND'`
- Named constants and small subpath exports for effective tree-shaking
- Runtime parsing, validation, and type guards for untrusted values
- Explicit IANA lifecycle metadata in an optional entry point
- ESM, CommonJS, Node.js, and browser support with no runtime dependencies
- Compatibility with the original `httpStatusLite` namespace

## Install

```sh
npm install http-status-lite
```

## Quick start

```ts
import { Status, getReasonPhrase, getStatus, isStatusCode, isSuccess } from 'http-status-lite';

Status.OK; // 200
Status.NOT_FOUND; // 404
getReasonPhrase(404); // 'Not Found'
getStatus(404); // { code: 404, name: 'NOT_FOUND', message: 'Not Found' }
isSuccess(204); // true
isStatusCode(404); // true
```

Literal inputs keep literal outputs:

```ts
const status = getStatus(404);
// typeof status.name is 'NOT_FOUND', not string
// typeof status.message is 'Not Found', not string
```

## API

### Constants

```ts
import { NOT_FOUND, OK, Status } from 'http-status-lite';

OK; // 200
NOT_FOUND; // 404
Status.CREATED; // 201
```

For a constants-only bundle:

```ts
import { NOT_FOUND } from 'http-status-lite/codes';
```

### Lookups

```ts
import { getReasonPhrase, getStatus, getStatusCode, getStatusName } from 'http-status-lite';

getStatus(404); // complete entry
getStatusCode('NOT_FOUND'); // 404
getStatusName(404); // 'NOT_FOUND'
getReasonPhrase(404); // 'Not Found'
getStatus(499); // null
```

### Parsing and validation

```ts
import { assertStatusCode, isStatusCode, isStatusName, parseStatusCode } from 'http-status-lite';

parseStatusCode('404'); // 404
parseStatusCode('499'); // null: not a known entry
isStatusCode(404); // true, and narrows the value
isStatusName('NOT_FOUND'); // true, and narrows the value
assertStatusCode(value); // narrows or throws TypeError
```

### Range predicates

```ts
import {
    getCategory,
    isClientError,
    isError,
    isInformational,
    isRedirect,
    isServerError,
    isSuccess,
} from 'http-status-lite/predicates';
```

Range predicates classify any integer in the HTTP range. Registry validation is intentionally separate:

```ts
isClientError(499); // true: it is in the 4xx range
isStatusCode(499); // false: it is not a represented registry entry
getCategory(499); // '4xx'
```

### Registry metadata

Metadata has its own entry point so references and lifecycle data do not increase the core bundle:

```ts
import { getStatusMetadata } from 'http-status-lite/metadata';

getStatusMetadata(104);
// {
//   code: 104,
//   name: 'UPLOAD_RESUMPTION_SUPPORTED',
//   message: 'Upload Resumption Supported',
//   reference: 'draft-ietf-httpbis-resumable-upload-05',
//   registryStatus: 'temporary',
//   category: '1xx'
// }
```

Lifecycle values are `permanent`, `temporary`, `unused`, or `obsolete`. Code `418` remains available as `IM_A_TEAPOT` for developer compatibility while metadata correctly identifies its current IANA state as `unused`.

## Types

```ts
import type {
    HttpStatusCategory,
    HttpStatusCode,
    HttpStatusEntry,
    HttpStatusName,
} from 'http-status-lite';

const code: HttpStatusCode = 404;
const name: HttpStatusName = 'NOT_FOUND';
```

Invalid known-code assignments fail during compilation:

```ts
const code: HttpStatusCode = 499; // TypeScript error
```

## Common recipes

### Fetch

```ts
import { isClientError, isServerError } from 'http-status-lite';

const response = await fetch(url);
if (isClientError(response.status)) throw new Error('The request was rejected');
if (isServerError(response.status)) throw new Error('The service failed');
```

### Express, Fastify, Hono, or Next.js

The constants are framework-independent:

```ts
import { Status } from 'http-status-lite';

return new Response(JSON.stringify(data), { status: Status.CREATED });
// Express: res.status(Status.CREATED).json(data)
// Fastify: reply.code(Status.CREATED).send(data)
// Hono: return c.json(data, Status.CREATED)
```

### Validate an external value

```ts
import { parseStatusCode } from 'http-status-lite';

const status = parseStatusCode(process.env.EXPECTED_STATUS);
if (status === null) throw new Error('EXPECTED_STATUS must be a known HTTP status code');
```

## Compatibility and migration

The original namespace remains supported:

```ts
import { httpStatusLite } from 'http-status-lite';

httpStatusLite.OK; // 200
httpStatusLite.NOT_FOUND_MESSAGE; // 'Not Found'
httpStatusLite[404]; // 'NOT_FOUND'
httpStatusLite.UNPROCESSABLE_ENTITY; // 422, legacy alias
httpStatusLite.PAYLOAD_TOO_LARGE; // 413, legacy alias
```

RFC 9110 renamed `Payload Too Large` to `Content Too Large` and `Unprocessable Entity` to `Unprocessable Content`. New code should use `CONTENT_TOO_LARGE` and `UNPROCESSABLE_CONTENT`; the previous names remain on `httpStatusLite`.

## Registry maintenance

[`registry/statuses.json`](registry/statuses.json) is the reviewable source snapshot. Generated TypeScript must not be edited directly:

```sh
pnpm generate
pnpm generate:check
pnpm registry:update # fetch the latest official IANA CSV, then regenerate
```

The snapshot follows the [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml). Temporary and historical entries are represented explicitly instead of being silently treated as permanent standards.

A scheduled CI job compares the committed snapshot with IANA each month, making registry drift visible without putting a network request in package builds or application startup.

## Development

From the repository root:

```sh
pnpm install
pnpm check:package
```

The full check covers linting, formatting, generation drift, compile-time type assertions, runtime behavior, bundle budgets, ESM/CommonJS exports, and the actual `npm pack` artifact.

See the repository [contribution guide](../../CONTRIBUTING.md) for generated-file rules and pull request expectations. Security issues should be reported privately according to the [security policy](SECURITY.md).

## Release process

Package releases are published from the monorepo with tags in the form `http-status-lite-vX.Y.Z`. The publish workflow verifies that the tag matches this package's version, runs the complete package check, and publishes to npm with provenance. See the [changelog](CHANGELOG.md) for release details.

The package follows semantic versioning. Treat removed exports or narrowed accepted values as breaking changes; additive status metadata and standards-snapshot updates still require release-note review because downstream behavior may change.

## Project status and limitations

- The represented registry is a committed snapshot, not a runtime request to IANA; the scheduled drift workflow reports when review is needed.
- Range predicates classify integers by HTTP class even when the code is not a represented registry entry.
- `418` remains available for compatibility while its metadata reports the current IANA lifecycle state.
- The library provides protocol constants and metadata, not application-specific error handling or HTTP semantics enforcement.
- Temporary registrations can change upstream and should be reviewed before being embedded into long-lived contracts.

## Documentation and support

- [Interactive reference and recipes](https://http-status-lite-demo.netlify.app/docs)
- [Registry source](registry/statuses.json)
- [Contribution guide](../../CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [CI workflow](../../.github/workflows/ci.yml)
- [Registry drift workflow](../../.github/workflows/registry.yml)

Use [GitHub Issues](https://github.com/montasim/http-status-lite/issues) for reproducible bugs and standards-registry discrepancies. Do not report vulnerabilities publicly.

## Funding

Optional support through [SupportKori](https://www.supportkori.com/montasim) helps fund standards tracking, compatibility testing, and continued maintenance. Bug reports, standards references, documentation improvements, and code contributions are equally valuable ways to help.

## Author

Built and maintained by [Montasim](https://github.com/montasim).

## License

[MIT](LICENSE)
