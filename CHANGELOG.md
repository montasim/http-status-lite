# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-03-27

### Changed
- Complete project refresh with latest industry-standard tooling
- Updated all dependencies to latest versions
- Simplified ESLint configuration (removed @eslint/js dependency)
- Improved CI/CD workflow

### Added
- Standard-version for automated versioning
- Comprehensive GitHub templates (issues, PRs)
- Enhanced documentation with SECURITY.md, CONTRIBUTING.md
- .versionrc.json for version management

## [1.0.0] - 2026-03-27

### Added

- Initial release of http-status-lite
- All ~64 IANA-registered HTTP status codes (1xx-5xx)
- Type-safe API with TypeScript union types
- Status code constants (e.g., `OK`, `NOT_FOUND`, `INTERNAL_SERVER_ERROR`)
- Status message constants (e.g., `OK_MESSAGE`, `NOT_FOUND_MESSAGE`)
- Reverse lookup by numeric code (e.g., `httpStatusLite[404]`)
- Helper functions:
    - `getStatus()` - Get full status details
    - `isSuccess()` - Check if 2xx status
    - `isRedirect()` - Check if 3xx status
    - `isClientError()` - Check if 4xx status
    - `isServerError()` - Check if 5xx status
    - `isError()` - Check if 4xx or 5xx status
    - `getCategory()` - Get status category (1xx/2xx/3xx/4xx/5xx)
- Dual ESM/CJS builds
- Full TypeScript type definitions
- Zero runtime dependencies
- Comprehensive JSDoc documentation
- Full test coverage (23 tests)

### Documentation

- Complete README with installation, usage examples, and API reference
- Industry-standard tooling (ESLint, Prettier, Husky, lint-staged)
- Conventional commit enforcement
- Contributing guidelines
- Security policy
- Issue and PR templates

[Unreleased]: https://github.com/montasim/http-status-lite/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/montasim/http-status-lite/releases/tag/v3.0.0
[1.0.0]: https://github.com/montasim/http-status-lite/releases/tag/v1.0.0
