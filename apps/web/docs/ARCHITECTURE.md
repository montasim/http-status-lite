# Architecture

## Goal

The demo has one job: make `http-status-lite` easy to understand, search, and adopt. It stays synchronized with the package, renders on the server, and keeps interactive concerns separate from the status-code domain.

## Boundaries

### Routes

`src/routes` owns TanStack Start route declarations and document metadata. Route files stay thin and delegate rendering to feature modules.

### Features

Each feature owns its model, pure logic, and composed UI:

- `home` composes the landing page sections.
- `install` owns package-manager commands and controls.
- `status-reference` owns category presentation, filtering, and registry exploration.

Features may depend on shared components and utilities. Shared modules do not depend on features.

### UI primitives

`src/components/ui` contains shadcn primitives. These solve generic interaction and accessibility concerns without package-specific business language.

### Package data

The application imports `statusMetadata` from `http-status-lite/metadata`. It does not maintain a second status registry. Filtering is a pure function, keeping domain behavior independent from React.

## SOLID application

- **Single responsibility:** routes declare routes, feature components render features, and pure functions transform data.
- **Open/closed:** categories and install commands are data-driven records; new values do not require structural rewrites.
- **Liskov substitution:** shadcn primitives preserve native behavior and can be replaced by compatible implementations.
- **Interface segregation:** components receive the smallest useful props, usually immutable status arrays or one metadata entry.
- **Dependency inversion:** features depend on shared interfaces and package types rather than framework-specific global state.

## Styling

Tailwind utilities are the only component styling mechanism. `src/styles.css` contains only Tailwind imports, design tokens, and global base rules. There are no CSS modules, CSS-in-JS libraries, or feature stylesheets.

## TanStack Start conventions

- `getRouter` creates a fresh router for each request.
- The root route renders `HeadContent` and `Scripts` in the document shell.
- Generated route types live in `src/routeTree.gen.ts` and are never edited manually.
- Browser-only APIs are accessed from event handlers, never during server rendering.
