export const SITE_CONFIG = {
    name: 'http-status-lite',
    alternateName: 'HTTP Status Lite',
    title: 'HTTP Status Codes for TypeScript | http-status-lite',
    description:
        'Browse all 64 IANA HTTP status codes with exact TypeScript types, safe parsing, RFC references, and lifecycle metadata. Zero runtime dependencies.',
    url: 'https://http-status-lite-demo.netlify.app',
    locale: 'en_US',
    author: 'Montasim',
    version: '2.3.0',
    repository: 'https://github.com/montasim/http-status-lite',
    npm: 'https://www.npmjs.com/package/http-status-lite',
} as const

export const STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_CONFIG.url}/#website`,
            url: `${SITE_CONFIG.url}/`,
            name: SITE_CONFIG.name,
            alternateName: SITE_CONFIG.alternateName,
            description: SITE_CONFIG.description,
            inLanguage: 'en',
        },
        {
            '@type': 'WebApplication',
            '@id': `${SITE_CONFIG.url}/#web-application`,
            url: `${SITE_CONFIG.url}/`,
            name: SITE_CONFIG.name,
            description: SITE_CONFIG.description,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires a modern web browser',
            softwareVersion: SITE_CONFIG.version,
            isAccessibleForFree: true,
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
            },
            author: {
                '@type': 'Person',
                name: SITE_CONFIG.author,
                url: 'https://github.com/montasim',
            },
        },
        {
            '@type': 'SoftwareSourceCode',
            '@id': `${SITE_CONFIG.url}/#source-code`,
            name: SITE_CONFIG.name,
            description:
                'Tiny, standards-backed, type-safe HTTP status codes for Node.js and browsers.',
            codeRepository: SITE_CONFIG.repository,
            downloadUrl: SITE_CONFIG.npm,
            license: `${SITE_CONFIG.repository}/blob/main/LICENSE`,
            programmingLanguage: 'TypeScript',
            runtimePlatform: ['Node.js', 'Web browser'],
            version: SITE_CONFIG.version,
        },
    ],
} as const

export const DOCS_STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_CONFIG.url}/docs#article`,
    url: `${SITE_CONFIG.url}/docs`,
    headline: 'http-status-lite documentation',
    description:
        'Install and use typed HTTP status constants, lookups, predicates, validation, and registry metadata.',
    inLanguage: 'en',
    isPartOf: {
        '@id': `${SITE_CONFIG.url}/#website`,
    },
    author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: 'https://github.com/montasim',
    },
    about: {
        '@type': 'SoftwareSourceCode',
        name: SITE_CONFIG.name,
        version: SITE_CONFIG.version,
        codeRepository: SITE_CONFIG.repository,
    },
} as const
