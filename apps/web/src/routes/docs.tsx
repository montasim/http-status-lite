import { createFileRoute } from '@tanstack/react-router'

import { DOCS_STRUCTURED_DATA, SITE_CONFIG } from '@/config/site'
import { DocsPage } from '@/features/docs/docs-page'

const DOCS_TITLE =
    'TypeScript HTTP Status Code Documentation | http-status-lite'
const DOCS_DESCRIPTION =
    'Install and use typed HTTP status constants, lookups, predicates, validation, and IANA registry metadata with practical TypeScript examples.'

export const Route = createFileRoute('/docs')({
    component: DocsPage,
    head: () => ({
        meta: [
            {
                title: DOCS_TITLE,
            },
            {
                name: 'description',
                content: DOCS_DESCRIPTION,
            },
            {
                property: 'og:title',
                content: DOCS_TITLE,
            },
            {
                property: 'og:description',
                content: DOCS_DESCRIPTION,
            },
            {
                property: 'og:url',
                content: `${SITE_CONFIG.url}/docs`,
            },
            {
                name: 'twitter:title',
                content: DOCS_TITLE,
            },
            {
                name: 'twitter:description',
                content: DOCS_DESCRIPTION,
            },
        ],
        links: [
            {
                rel: 'canonical',
                href: `${SITE_CONFIG.url}/docs`,
            },
        ],
        scripts: [
            {
                type: 'application/ld+json',
                children: JSON.stringify(DOCS_STRUCTURED_DATA),
            },
        ],
    }),
})
