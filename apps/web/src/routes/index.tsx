import { createFileRoute } from '@tanstack/react-router'
import { statusMetadata } from 'http-status-lite/metadata'

import { SITE_CONFIG, STRUCTURED_DATA } from '@/config/site'
import { HomePage } from '@/features/home/home-page'

export const Route = createFileRoute('/')({
    component: HomeRoute,
    head: () => ({
        meta: [
            {
                property: 'og:url',
                content: `${SITE_CONFIG.url}/`,
            },
        ],
        links: [
            {
                rel: 'canonical',
                href: `${SITE_CONFIG.url}/`,
            },
        ],
        scripts: [
            {
                type: 'application/ld+json',
                children: JSON.stringify(STRUCTURED_DATA),
            },
        ],
    }),
})

function HomeRoute() {
    return <HomePage statuses={statusMetadata} />
}
