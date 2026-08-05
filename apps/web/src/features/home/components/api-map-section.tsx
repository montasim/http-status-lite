import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const ENTRY_POINTS = [
    {
        path: '/codes',
        title: 'Constants',
        description: 'Named values and the complete Status object.',
        exports: 'OK · NOT_FOUND · Status',
    },
    {
        path: '/predicates',
        title: 'Classification',
        description: 'Range helpers for any valid HTTP integer.',
        exports: 'isSuccess · isError · getCategory',
    },
    {
        path: '/metadata',
        title: 'Standards data',
        description: 'References, categories, and IANA lifecycle state.',
        exports: 'getStatusMetadata',
    },
] as const

export function ApiMapSection() {
    return (
        <section
            id="migration"
            className="border-t border-slate-200 bg-slate-100 px-5 py-20 md:px-[4.5%] lg:py-28"
        >
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-blue-600 uppercase">
                Pick the smallest entry point
            </p>
            <h2 className="mt-3 max-w-xl text-[clamp(2.4rem,4vw,4.3rem)] leading-[0.96] font-extrabold tracking-[-0.055em] text-slate-950">
                Use only what you need.
            </h2>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
                {ENTRY_POINTS.map((entry) => (
                    <Card
                        key={entry.path}
                        className="min-h-52 bg-white/90 transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        <CardContent className="flex h-full flex-col p-6">
                            <Badge className="mb-auto w-fit bg-blue-100 font-mono text-blue-800">
                                {entry.path}
                            </Badge>
                            <h3 className="mt-10 font-bold text-slate-950">
                                {entry.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                {entry.description}
                            </p>
                            <code className="mt-4 font-mono text-[10px] text-slate-500">
                                {entry.exports}
                            </code>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-4 grid items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[auto_1fr_auto]">
                <Badge variant="secondary" className="text-blue-800">
                    Migrating?
                </Badge>
                <p className="text-sm text-slate-600">
                    The original{' '}
                    <code className="rounded bg-slate-100 px-1 font-mono text-xs text-slate-900">
                        httpStatusLite
                    </code>{' '}
                    namespace and legacy RFC names remain supported.
                </p>
                <a
                    href="https://github.com/montasim/http-status-lite#compatibility-and-migration"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                >
                    Read migration notes <ArrowRight className="size-4" />
                </a>
            </div>
        </section>
    )
}
