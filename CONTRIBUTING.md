# Contributing to http-status-lite

Contributions are welcome when they preserve the package's focus: a small, accurate, framework-independent HTTP status utility.

## Setup

```sh
git clone https://github.com/montasim/http-status-lite.git
cd http-status-lite
npm ci
npm run check
```

Use a focused branch and conventional commit messages such as `feat: add status parser` or `fix: preserve literal lookup type`.

## Before opening a pull request

- Explain the developer problem, not only the proposed API.
- Add runtime tests for behavior changes.
- Add compile-time assertions for type changes.
- Update documentation for public API changes.
- Run `npm run check` against the packed package.
- Keep runtime dependencies at zero unless there is an exceptional, measured reason.

## Registry changes

The reviewable source of truth is [`registry/statuses.json`](registry/statuses.json). Do not edit `src/generated/` or `src/codes.ts` directly.

To synchronize with IANA:

```sh
npm run registry:update
npm run generate:check
```

Review lifecycle changes carefully. IANA can include temporary, obsolete, and unused values that should not be described as permanent standards.

## Project structure

```text
registry/                 Reviewable IANA-derived source data
scripts/                  Generation and release verification
src/generated/            Generated core and metadata tables
src/codes.ts              Generated constants and Status object
src/lookup.ts             Typed forward and reverse lookups
src/parsing.ts            Runtime parsing and assertion
src/predicates.ts         Numeric range classification
src/metadata.ts           Optional metadata entry point
src/legacy.ts             Backward-compatible namespace
test/                     Runtime and compile-time tests
```

## Design guidelines

- Prefer explicit, composable functions over multi-purpose abstractions.
- Preserve literal types across public APIs.
- Distinguish registry membership from numeric range classification.
- Put heavier or specialized data behind a subpath export.
- Measure bundle changes and update budgets deliberately.
- Avoid framework-specific runtime integrations; documentation examples are preferred.

For a significant feature or breaking API change, open an issue first so the use case and tradeoffs can be discussed.
