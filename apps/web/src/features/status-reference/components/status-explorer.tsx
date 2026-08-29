import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { HttpStatusCategory } from 'http-status-lite'
import type {
    HttpStatusMetadata,
    HttpStatusRegistryState,
} from 'http-status-lite/metadata'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { filterStatuses } from '@/features/status-reference/lib/filter-statuses'
import {
    CATEGORY_DETAILS,
    CATEGORY_ORDER,
} from '@/features/status-reference/model/category'

type StatusExplorerProps = {
    statuses: ReadonlyArray<HttpStatusMetadata>
}

const LIFECYCLES: ReadonlyArray<HttpStatusRegistryState | 'all'> = [
    'all',
    'permanent',
    'temporary',
    'unused',
    'obsolete',
]

export function StatusExplorer({ statuses }: StatusExplorerProps) {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState<HttpStatusCategory | 'all'>('all')
    const [lifecycle, setLifecycle] = useState<HttpStatusRegistryState | 'all'>(
        'all',
    )
    const [selectedCode, setSelectedCode] = useState(200)

    const filteredStatuses = useMemo(
        () => filterStatuses(statuses, { query, category, lifecycle }),
        [category, lifecycle, query, statuses],
    )
    const selectedStatus =
        statuses.find((status) => status.code === selectedCode) ?? statuses[0]

    return (
        <section
            id="reference"
            className="bg-white px-5 py-20 md:px-[4.5%] lg:py-28"
            aria-labelledby="reference-title"
        >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="font-mono text-xs font-bold tracking-label text-blue-600 uppercase">
                        Standards registry
                    </p>
                    <h2
                        id="reference-title"
                        className="mt-3 text-section font-bold tracking-section text-foreground"
                    >
                        Find a status code
                    </h2>
                </div>
                <p className="text-sm text-slate-500">
                    {statuses.length} represented entries, sourced from the IANA
                    registry.
                </p>
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-[minmax(320px,1fr)_auto_auto]">
                <label className="relative">
                    <span className="sr-only">Search status codes</span>
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search 404, NOT_FOUND, or message..."
                        className="h-11 bg-white pr-10 pl-10"
                    />
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setQuery('')}
                            className="absolute top-1/2 right-3 -translate-y-1/2"
                            aria-label="Clear search"
                        >
                            <X />
                        </Button>
                    )}
                </label>

                <div
                    className="flex overflow-x-auto rounded-lg border border-slate-200 bg-slate-100 p-1"
                    aria-label="Filter by category"
                >
                    <Button
                        type="button"
                        size="sm"
                        variant={category === 'all' ? 'outline' : 'ghost'}
                        onClick={() => setCategory('all')}
                        className="shrink-0"
                    >
                        All{' '}
                        <span className="font-mono text-meta text-blue-600">
                            {statuses.length}
                        </span>
                    </Button>
                    {CATEGORY_ORDER.map((item) => (
                        <Button
                            key={item}
                            type="button"
                            size="sm"
                            variant={category === item ? 'outline' : 'ghost'}
                            onClick={() => setCategory(item)}
                            className="shrink-0"
                        >
                            {item}
                        </Button>
                    ))}
                </div>

                <label className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-600">
                    <span>Lifecycle</span>
                    <select
                        value={lifecycle}
                        onChange={(event) =>
                            setLifecycle(
                                event.target.value as
                                    | HttpStatusRegistryState
                                    | 'all',
                            )
                        }
                        className="min-w-24 bg-transparent capitalize outline-none"
                    >
                        {LIFECYCLES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="mt-4 grid overflow-hidden rounded-xl border border-slate-200 lg:grid-cols-[minmax(0,1fr)_minmax(310px,.35fr)]">
                <div
                    className="max-h-[690px] min-w-0 overflow-y-auto"
                    role="list"
                    aria-label={`${filteredStatuses.length} matching status codes`}
                >
                    {filteredStatuses.length > 0 ? (
                        filteredStatuses.map((status) => (
                            <StatusRow
                                key={status.code}
                                status={status}
                                selected={status.code === selectedStatus.code}
                                onSelect={() => setSelectedCode(status.code)}
                            />
                        ))
                    ) : (
                        <div className="grid min-h-52 place-items-center p-8 text-center">
                            <div>
                                <p className="font-semibold text-foreground">
                                    No status codes match
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Try a code, constant name, or broader
                                    filter.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <StatusInspector status={selectedStatus} />
            </div>
        </section>
    )
}

type StatusRowProps = {
    status: HttpStatusMetadata
    selected: boolean
    onSelect: () => void
}

function StatusRow({ status, selected, onSelect }: StatusRowProps) {
    const details = CATEGORY_DETAILS[status.category]

    return (
        <button
            type="button"
            role="listitem"
            onClick={onSelect}
            className={cn(
                'group grid min-h-20 w-full grid-cols-[54px_minmax(0,1fr)_32px] items-center gap-3 border-b border-slate-200 px-3 text-left last:border-b-0 hover:bg-blue-50/60 sm:grid-cols-[62px_minmax(210px,1fr)_110px_150px_32px] sm:px-5',
                selected && `border-l-[3px] bg-blue-50/70 ${details.border}`,
            )}
        >
            <span
                className={cn('font-mono text-lg font-bold', details.text)}
            >
                {status.code}
            </span>
            <span className="min-w-0">
                <strong className="block truncate text-sm text-foreground">
                    {status.message}
                </strong>
                <code className="mt-1 block truncate font-mono text-meta text-slate-500">
                    {status.name}
                </code>
            </span>
            <span className="hidden text-xs font-medium text-slate-600 sm:inline-flex">
                <i
                    className={cn(
                        'mr-2 size-1.5 self-center rounded-full',
                        lifecycleColor(status.registryStatus),
                    )}
                />
                {capitalize(status.registryStatus)}
            </span>
            <span className="hidden truncate font-mono text-meta text-slate-500 sm:block">
                {status.reference}
            </span>
            <span className="grid size-8 place-items-center rounded-md border border-transparent group-hover:border-slate-200 group-hover:bg-white">
                <ArrowRight className="size-4" />
            </span>
        </button>
    )
}

function StatusInspector({ status }: { status: HttpStatusMetadata }) {
    const details = CATEGORY_DETAILS[status.category]
    const usage = `import { Status } from 'http-status-lite';\n\nStatus.${status.name}; // ${status.code}`

    return (
        <aside
            className="relative overflow-hidden border-t border-slate-200 bg-slate-50 p-5 lg:border-t-0 lg:border-l"
            aria-label={`Details for ${status.code} ${status.message}`}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'absolute -right-8 top-40 rotate-90 text-7xl font-extrabold tracking-display opacity-[0.06]',
                    details.text,
                )}
            >
                {status.code}
            </span>
            <div
                className={cn(
                    'relative z-10 font-mono text-meta font-bold tracking-wider uppercase',
                    details.text,
                )}
            >
                {status.category} / {details.label}
            </div>
            <div
                className={cn(
                    'relative z-10 mt-7 text-4xl leading-none font-extrabold tracking-display',
                    details.text,
                )}
            >
                {status.code}
            </div>
            <h3 className="relative z-10 mt-4 text-base font-bold text-foreground">
                {status.message}
            </h3>
            <code className="relative z-10 font-mono text-meta text-slate-500">
                {status.name}
            </code>

            <dl className="relative z-10 mt-6 border-t border-slate-200 text-xs">
                <MetadataRow
                    label="Lifecycle"
                    value={capitalize(status.registryStatus)}
                    dot={lifecycleColor(status.registryStatus)}
                />
                <MetadataRow label="Reference" value={status.reference} />
                <MetadataRow label="Category" value={status.category} />
            </dl>

            <Card className="relative z-10 mt-5 gap-0 bg-dark-surface py-0 text-slate-100 ring-white/15">
                <div className="flex items-center justify-between border-b border-white/15 px-3 py-2 text-meta text-slate-300">
                    <span>Use in code</span>
                    <CopyButton
                        value={usage}
                        className="size-7 text-slate-300 hover:bg-white/10 hover:text-white"
                    />
                </div>
                <CardContent className="overflow-x-auto p-4">
                    <pre className="font-mono text-meta leading-6">
                        <code>
                            <span className="text-violet-300">import</span>{' '}
                            {'{ Status }'}{' '}
                            <span className="text-violet-300">from</span>
                            {`\n  `}
                            <span className="text-emerald-300">
                                'http-status-lite'
                            </span>
                            ;{`\n\n`}Status.{status.name};{' '}
                            <span className="text-slate-500">
                                // {status.code}
                            </span>
                        </code>
                    </pre>
                </CardContent>
            </Card>

            <div className="relative z-10 mt-4 rounded-lg border border-slate-200 bg-white/80 p-4">
                <strong className="text-xs">Typed lookup</strong>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                    <code className="rounded bg-slate-100 px-1 font-mono">
                        getStatus({status.code})
                    </code>{' '}
                    returns a literal-typed entry whose name is exactly{' '}
                    <code className="rounded bg-slate-100 px-1 font-mono">
                        '{status.name}'
                    </code>
                    .
                </p>
            </div>
        </aside>
    )
}

function MetadataRow({
    label,
    value,
    dot,
}: {
    label: string
    value: string
    dot?: string
}) {
    return (
        <div className="flex justify-between gap-4 border-b border-slate-200 py-3">
            <dt className="text-slate-500">{label}</dt>
            <dd className="m-0 text-right font-semibold text-foreground">
                {dot && (
                    <i
                        className={cn(
                            'mr-2 inline-block size-1.5 rounded-full',
                            dot,
                        )}
                    />
                )}
                {value}
            </dd>
        </div>
    )
}

function lifecycleColor(lifecycle: HttpStatusRegistryState) {
    if (lifecycle === 'permanent') return 'bg-emerald-500'
    if (lifecycle === 'temporary') return 'bg-blue-500'
    if (lifecycle === 'obsolete') return 'bg-rose-500'
    return 'bg-slate-400'
}

function capitalize(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
