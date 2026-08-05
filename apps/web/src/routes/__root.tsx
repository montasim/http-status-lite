import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { SITE_CONFIG } from '@/config/site'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: SITE_CONFIG.title,
            },
            {
                name: 'description',
                content: SITE_CONFIG.description,
            },
            {
                name: 'application-name',
                content: SITE_CONFIG.name,
            },
            {
                name: 'author',
                content: SITE_CONFIG.author,
            },
            {
                name: 'robots',
                content:
                    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            },
            {
                name: 'theme-color',
                content: '#111a2c',
            },
            {
                property: 'og:title',
                content: SITE_CONFIG.title,
            },
            {
                property: 'og:description',
                content: SITE_CONFIG.description,
            },
            {
                property: 'og:image',
                content: `${SITE_CONFIG.url}/og.png`,
            },
            {
                property: 'og:image:secure_url',
                content: `${SITE_CONFIG.url}/og.png`,
            },
            {
                property: 'og:image:type',
                content: 'image/png',
            },
            {
                property: 'og:image:width',
                content: '1200',
            },
            {
                property: 'og:image:height',
                content: '630',
            },
            {
                property: 'og:image:alt',
                content:
                    'http-status-lite — status codes that TypeScript understands',
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:site_name',
                content: SITE_CONFIG.name,
            },
            {
                property: 'og:locale',
                content: SITE_CONFIG.locale,
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: SITE_CONFIG.title,
            },
            {
                name: 'twitter:description',
                content: SITE_CONFIG.description,
            },
            {
                name: 'twitter:image',
                content: `${SITE_CONFIG.url}/og.png`,
            },
            {
                name: 'twitter:image:alt',
                content:
                    'http-status-lite — status codes that TypeScript understands',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
            {
                rel: 'icon',
                href: '/favicon.svg',
                type: 'image/svg+xml',
                sizes: 'any',
            },
            {
                rel: 'icon',
                href: '/favicon-32.png',
                type: 'image/png',
                sizes: '32x32',
            },
            {
                rel: 'apple-touch-icon',
                href: '/apple-touch-icon.png',
                sizes: '180x180',
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
                <script
                    src="https://www.supportkori.com/widget.js"
                    data-id="montasim"
                    data-message="Support montasim"
                    data-color="#FFDD00"
                    data-position="right"
                ></script>
            </body>
        </html>
    )
}
