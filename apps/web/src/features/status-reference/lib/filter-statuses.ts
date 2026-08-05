import type { HttpStatusCategory } from 'http-status-lite'
import type {
    HttpStatusMetadata,
    HttpStatusRegistryState,
} from 'http-status-lite/metadata'

export type StatusFilters = {
    query: string
    category: HttpStatusCategory | 'all'
    lifecycle: HttpStatusRegistryState | 'all'
}

export function filterStatuses(
    statuses: ReadonlyArray<HttpStatusMetadata>,
    filters: StatusFilters,
) {
    const query = filters.query.trim().toLowerCase()

    return statuses.filter((status) => {
        const matchesCategory =
            filters.category === 'all' || status.category === filters.category
        const matchesLifecycle =
            filters.lifecycle === 'all' ||
            status.registryStatus === filters.lifecycle
        const matchesQuery =
            query.length === 0 ||
            status.code.toString().includes(query) ||
            status.name.toLowerCase().includes(query) ||
            status.message.toLowerCase().includes(query)

        return matchesCategory && matchesLifecycle && matchesQuery
    })
}
