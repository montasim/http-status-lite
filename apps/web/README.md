<p align="center">
  <img src="public/logo.svg" alt="http-status-lite" width="360" />
</p>

<p align="center">
  An interactive, standards-backed TypeScript reference for every status code represented by <a href="https://github.com/montasim/http-status-lite"><code>http-status-lite</code></a>.
</p>

<p align="center">
  <a href="https://http-status-lite-demo.netlify.app/"><strong>Live reference</strong></a>
  ·
  <a href="https://http-status-lite-demo.netlify.app/docs"><strong>Documentation</strong></a>
  ·
  <a href="https://www.npmjs.com/package/http-status-lite"><strong>npm package</strong></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/http-status-lite"><img src="https://img.shields.io/npm/v/http-status-lite?label=http-status-lite" alt="http-status-lite npm version" /></a>
  <img src="https://img.shields.io/badge/statuses-64-2265e5" alt="64 represented HTTP status codes" />
  <img src="https://img.shields.io/badge/runtime_dependencies-0-169c62" alt="Zero runtime dependencies in http-status-lite" />
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/license-MIT-111a2c" alt="MIT license" /></a>
  <a href="https://www.supportkori.com/montasim"><img src="https://img.shields.io/badge/Support-SupportKori-FFDD00" alt="Support on SupportKori" /></a>
</p>

## About

This workspace is the official demo and documentation application for `http-status-lite`. It reads the local package's generated registry metadata directly instead of maintaining a second status-code dataset, keeping codes, constant names, reason phrases, RFC references, categories, and IANA lifecycle states synchronized with the library.

The current registry represents 64 entries across the five HTTP status classes:

| Class | Meaning       | Entries |
| :---- | :------------ | ------: |
| `1xx` | Informational |       5 |
| `2xx` | Success       |      10 |
| `3xx` | Redirection   |       9 |
| `4xx` | Client error  |      29 |
| `5xx` | Server error  |      11 |

## Features

- Search by numeric code, constant name, or reason phrase
- Filter by HTTP category and IANA lifecycle state
- Inspect RFC references and exact generated TypeScript names
- Copy typed constants and installation commands
- npm, pnpm, Yarn, and Bun installation guidance
- Practical documentation for constants, lookups, parsing, predicates, metadata, types, and migration
- Full-document SSR with route-specific canonical URLs and metadata
- Open Graph, Twitter cards, JSON-LD, sitemap, robots, manifest, and complete favicon assets
- Responsive and keyboard-accessible interface built with shadcn/ui primitives

## Package quick start

Install the package using your preferred package manager:

```sh
pnpm add http-status-lite
```

```ts
import { Status, getStatus, isStatusCode, isSuccess } from 'http-status-lite'

Status.OK // 200

const status = getStatus(404)
status.name // 'NOT_FOUND'
status.message // 'Not Found'

isSuccess(Status.NO_CONTENT) // true
isStatusCode(404) // true
```

Literal inputs preserve literal outputs, so `getStatus(404).name` is typed as `'NOT_FOUND'`, not merely `string`.

## Technology

- [TanStack Start](https://tanstack.com/start) with file-based TanStack Router routes
- React 19 and strict TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com/) with Radix primitives
- Vite 8
- pnpm

## Local development

```sh
git clone https://github.com/montasim/http-status-lite.git
cd http-status-lite
pnpm install
pnpm dev
```

The development server uses port 3000 or the next available port.

## Quality checks

From the repository root:

```sh
pnpm check:web
pnpm build:web
```

`pnpm check:web` generates the route tree, verifies formatting, runs ESLint and strict TypeScript, and creates the production build. `pnpm build:web` builds the local package dependency before producing the client and server-rendered web bundles.

## Deploying to Netlify

The repository includes the official Netlify adapter for TanStack Start and a production-ready `netlify.toml`. Connect this GitHub repository in Netlify and use `main` as the production branch; the build command, publish directory, and Node.js version are read from the repository automatically.

- Build command: `pnpm build:web`
- Publish directory: `apps/web/dist/client`
- Node.js: 24
- Canonical production URL: `https://http-status-lite-demo.netlify.app`

TanStack Start owns application routing and server rendering, so an SPA fallback redirect is neither needed nor recommended. Netlify Deploy Previews can remain enabled for pull requests.

## Project structure

```text
src/
├── components/
│   ├── ui/                 # shadcn primitives
│   └── *.tsx               # shared application components
├── config/                 # site metadata and structured data
├── features/
│   ├── docs/               # documentation page and examples
│   ├── home/               # landing-page composition
│   ├── install/            # package-manager installation UI
│   └── status-reference/   # domain model, filtering, and explorer
├── lib/                    # framework-independent utilities
├── routes/                 # TanStack file routes and route metadata
├── router.tsx              # request-safe router factory
└── styles.css              # Tailwind imports, tokens, and base layer

public/
├── logo.svg                # full brand lockup
├── logo-mark.svg           # compact status-display mark
├── og.png                  # social sharing image
├── site.webmanifest
├── robots.txt
└── sitemap.xml
```

The approved static explorations are retained under `prototypes/v1`.

## Architecture

The application uses feature-oriented modules and small, focused component interfaces. Routes own routing and metadata, pure functions own status filtering, feature modules own domain presentation, and `components/ui` contains reusable shadcn primitives.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for module boundaries and SOLID design decisions.

## Project status and limitations

- The site presents the registry snapshot committed with the local `http-status-lite` package; it does not fetch IANA data at runtime.
- Temporary, obsolete, and unused registrations are shown according to package metadata and can change when the reviewed registry snapshot is updated.
- Range predicates describe numeric HTTP classes and do not imply that every in-range number is a represented IANA entry.
- The reference provides protocol constants, metadata, and examples rather than application-specific error-handling guidance.
- Netlify availability and server rendering depend on the configured deployment platform; the published npm package remains independently usable.

## Related project

- [`packages/http-status-lite`](../../packages/http-status-lite) — package source, API documentation, releases, and registry maintenance
- [`http-status-lite` on npm](https://www.npmjs.com/package/http-status-lite) — published package

## Support and security

Use [GitHub Issues](https://github.com/montasim/http-status-lite/issues) for reproducible site bugs, documentation problems, and package feature requests. Include the affected route, browser, expected result, and actual result when reporting a web issue.

Report vulnerabilities privately according to the package [security policy](../../packages/http-status-lite/SECURITY.md), not through a public issue.

## Contributing

Issues and focused pull requests are welcome. Read the repository [contribution guide](../../CONTRIBUTING.md), run `pnpm check:web` for web changes, and keep package data changes synchronized with the generated reference.

The repository does not currently include a separate code of conduct. Keep participation respectful, standards-focused, and scoped to observable project behavior.

## Funding

Optional support helps fund hosting, standards tracking, compatibility testing, and continued maintenance of the package and reference site.

[![Support http-status-lite on SupportKori](https://img.shields.io/badge/Support_http--status--lite-SupportKori-FFDD00?style=for-the-badge)](https://www.supportkori.com/montasim)

Bug reports, standards references, documentation improvements, and code contributions are equally valuable ways to help.

## Author

Built and maintained by [Montasim](https://github.com/montasim).

## License

[MIT](../../LICENSE) © Montasim
