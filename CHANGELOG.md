# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 2.2.0 (2026-03-27)

### Features

- optimize bundle size and improve tree-shaking ([b552622](https://github.com/montasim/http-status-lite/commits/b552622fe4e9ed7aea769e0861e9af37872d5028))

### Documentation

- add demo website reference to package.json and README ([97ef8c2](https://github.com/montasim/http-status-lite/commits/97ef8c235c2fd690dac12d887cc71c17974b3bd3))

### Chore

- change license from MIT to CC BY-NC-ND 4.0 ([4e27b75](https://github.com/montasim/http-status-lite/commits/4e27b75943f822d22ca240fae034dcfc62438ac1))
- **release:** 2.1.0 ([0d577c8](https://github.com/montasim/http-status-lite/commits/0d577c8cb6caed76c4dd0bde3cb7f0367d7ab357))
- rollback version from 3.0.0 to 2.0.0 ([1dedf35](https://github.com/montasim/http-status-lite/commits/1dedf35f54b5b6583b9de5c204cb5f1d05a08a49))

## 2.1.0 (2026-03-27)

### Features

- optimize bundle size and improve tree-shaking ([b552622](https://github.com/montasim/http-status-lite/commits/b552622fe4e9ed7aea769e0861e9af37872d5028))

### Chore

- rollback version from 3.0.0 to 2.0.0 ([1dedf35](https://github.com/montasim/http-status-lite/commits/1dedf35f54b5b6583b9de5c204cb5f1d05a08a49))

## [2.0.0] - 2026-03-27

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
