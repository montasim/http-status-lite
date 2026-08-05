# Contributing to http-status-lite

Contributions are welcome across the package and reference site. Package changes should preserve its focus: a small, accurate, framework-independent HTTP status utility.

## Setup

```sh
git clone https://github.com/montasim/http-status-lite.git
cd http-status-lite
pnpm install
pnpm check
```

Use a focused branch and conventional commit messages such as `feat: add status parser` or `fix: preserve literal lookup type`.

## Before opening a pull request

- Explain the developer problem, not only the proposed API.
- Add runtime tests for behavior changes.
- Add compile-time assertions for type changes.
- Update documentation for public API changes.
- Run `pnpm check:package` against the packed package.
- Keep runtime dependencies at zero unless there is an exceptional, measured reason.

## Registry changes

The reviewable source of truth is [`packages/http-status-lite/registry/statuses.json`](packages/http-status-lite/registry/statuses.json). Do not edit `packages/http-status-lite/src/generated/` or `packages/http-status-lite/src/codes.ts` directly.

To synchronize with IANA:

```sh
pnpm registry:update
pnpm generate:check
```

Review lifecycle changes carefully. IANA can include temporary, obsolete, and unused values that should not be described as permanent standards.

## Project structure

```text
apps/web/                              Interactive reference and documentation site
packages/http-status-lite/registry/    Reviewable IANA-derived source data
packages/http-status-lite/scripts/     Generation and package verification
packages/http-status-lite/src/         Package implementation and generated tables
packages/http-status-lite/test/        Runtime and compile-time tests
prototypes/                            Archived interface prototype
```

The web app consumes the package with `workspace:*`. Build the package before running workspace-specific web commands, or use `pnpm dev`, `pnpm build:web`, and `pnpm check:web` from the root, which handle that ordering.

## Design guidelines

- Prefer explicit, composable functions over multi-purpose abstractions.
- Preserve literal types across public APIs.
- Distinguish registry membership from numeric range classification.
- Put heavier or specialized data behind a subpath export.
- Measure bundle changes and update budgets deliberately.
- Avoid framework-specific runtime integrations; documentation examples are preferred.

For a significant feature or breaking API change, open an issue first so the use case and tradeoffs can be discussed.
