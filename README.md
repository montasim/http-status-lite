# http-status-lite

[![npm version](https://img.shields.io/npm/v/http-status-lite.svg)](https://www.npmjs.com/package/http-status-lite)
[![CI](https://github.com/montasim/http-status-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/montasim/http-status-lite/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Support on SupportKori](https://img.shields.io/badge/Support-SupportKori-FFDD00)](https://www.supportkori.com/montasim)

A pnpm monorepo for the zero-dependency `http-status-lite` TypeScript library and its interactive TanStack Start status-code reference. Keeping both projects together means the web app exercises the local package on every build, so registry, API, and documentation changes can be verified and shipped from one repository.

**[Explore HTTP status codes](https://http-status-lite-demo.netlify.app/) · [Read the interactive docs](https://http-status-lite-demo.netlify.app/docs) · [Install from npm](https://www.npmjs.com/package/http-status-lite)**

## What is included

| Workspace                   | Purpose                                                                                          | Documentation                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `packages/http-status-lite` | Published ESM/CommonJS package with typed codes, lookups, predicates, parsing, and IANA metadata | [Package README](packages/http-status-lite/README.md) |
| `apps/web`                  | React 19 and TanStack Start reference and documentation site                                     | [Web README](apps/web/README.md)                      |

The web workspace depends on `http-status-lite` through pnpm's `workspace:*` protocol. Local builds therefore use the package in this repository rather than a separately installed npm release.

## Quick start

Prerequisites:

- Node.js 24 (selected by `.nvmrc`; Node.js 20.19 or newer can manage the workspace)
- pnpm 11.7.0

```sh
git clone https://github.com/montasim/http-status-lite.git
cd http-status-lite
pnpm install
pnpm dev
```

The root development command builds the package and starts the web app at [http://localhost:3000](http://localhost:3000). No environment variables or external services are required.

## Use the package

Consumers can install the published package independently:

```sh
pnpm add http-status-lite
```

```ts
import { Status, getStatus, isStatusCode, isSuccess } from "http-status-lite";

Status.OK; // 200
getStatus(404); // { code: 404, name: 'NOT_FOUND', message: 'Not Found' }
isSuccess(Status.NO_CONTENT); // true
isStatusCode(404); // true
```

Literal inputs preserve literal output types, and separate entry points keep constants, predicates, and lifecycle metadata independently importable. See the [package API documentation](packages/http-status-lite/README.md#api) for the complete surface and migration notes.

## Workspace commands

Run these commands from the repository root:

| Command                | Purpose                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`             | Build the package and start the web app on port 3000                           |
| `pnpm build`           | Build the package followed by the production web app                           |
| `pnpm build:package`   | Build package ESM, CommonJS, declarations, and source maps                     |
| `pnpm build:web`       | Build the package and production web app                                       |
| `pnpm test`            | Run generation, type, runtime, build, and size checks for the package          |
| `pnpm test:all`        | Also test the actual packed package in ESM, CommonJS, and TypeScript consumers |
| `pnpm check:package`   | Run the package's complete validation                                          |
| `pnpm check:web`       | Build the package, then check and build the web app                            |
| `pnpm check`           | Run complete package and web verification                                      |
| `pnpm registry:update` | Fetch the current IANA CSV and regenerate package sources                      |
| `pnpm format`          | Format every workspace that defines a formatter                                |
| `pnpm format:check`    | Check formatting in every workspace                                            |

## Repository layout

```text
.
├── apps/
│   └── web/                     # TanStack Start reference site
├── packages/
│   └── http-status-lite/        # Published npm package, registry, tests, and API docs
├── prototypes/                  # Archived interface prototype
├── .github/workflows/           # Workspace CI, registry drift, and npm publishing
├── netlify.toml                 # Monorepo-aware web deployment
└── pnpm-workspace.yaml          # Workspace package discovery
```

The dependency direction is one-way: `apps/web` consumes `packages/http-status-lite`; the package does not depend on the application.

## Registry and package behavior

The reviewable registry snapshot lives at [`packages/http-status-lite/registry/statuses.json`](packages/http-status-lite/registry/statuses.json). It follows the [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) and records permanent, temporary, obsolete, and unused entries explicitly. Generated files are committed so package builds and application startup do not require a network request.

Range predicates classify integers in the HTTP range even when an integer is not a represented registry entry. For example, `isClientError(499)` is `true`, while `isStatusCode(499)` is `false`.

## Quality and release workflow

CI installs the frozen pnpm lockfile and runs `pnpm check`, covering registry drift, types, linting, formatting, runtime behavior, bundle budgets, packed-package consumers, and the web production build. It also uploads the npm tarball and tests that artifact on Node.js 18, 20, 22, and 24.

Package releases use tags in the form `http-status-lite-vX.Y.Z`. The publish workflow verifies the tag against `packages/http-status-lite/package.json` before publishing that workspace to npm with provenance. Review the [package changelog](packages/http-status-lite/CHANGELOG.md) before upgrading.

## Deployment

The root [Netlify configuration](netlify.toml) runs `pnpm build:web` and publishes `apps/web/dist/client`. TanStack Start SSR and server functions are handled by the official Netlify Vite integration. Local Netlify development runs on port 8888 and targets the Vite server on port 3000.

## Compatibility, accuracy, and security

The published package supports Node.js 18 and newer as well as modern browsers through ESM and CommonJS builds. It has no runtime dependencies and performs no network, file-system, or process operations when imported. Registry synchronization is a maintainer command that fetches data from IANA.

HTTP registry state changes over time. The committed snapshot makes updates reviewable, while the scheduled registry workflow reports drift monthly. Report vulnerabilities privately through the [security policy](packages/http-status-lite/SECURITY.md).

## Contributing and support

Issues and focused pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, generated-file rules, package design guidelines, and the checks required before a pull request. Use [GitHub Issues](https://github.com/montasim/http-status-lite/issues) for bugs and feature requests; do not disclose vulnerabilities publicly.

Optional support through [SupportKori](https://www.supportkori.com/montasim) helps fund standards tracking, compatibility testing, and continued maintenance. Bug reports, standards references, documentation improvements, and code contributions are equally valuable ways to help.

## Author and license

Created and maintained by [Montasim](https://github.com/montasim). Licensed under the [MIT License](LICENSE).
