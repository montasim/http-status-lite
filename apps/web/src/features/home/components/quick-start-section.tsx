import { ArrowLeftRight, Check, Type } from 'lucide-react'

const FEATURES = [
    {
        title: 'Exact generated types',
        description:
            'Literal-preserving lookups and unions generated from one reviewable registry.',
        icon: Type,
    },
    {
        title: 'Safe at the boundary',
        description:
            'Parse, validate, assert, and narrow unknown status values at runtime.',
        icon: Check,
    },
    {
        title: 'Small by design',
        description:
            'Import only constants, predicates, or metadata through tree-shakeable entry points.',
        icon: ArrowLeftRight,
    },
] as const

export function QuickStartSection() {
    return (
        <section
            id="api"
            className="grid items-center gap-10 border-b border-slate-200 px-5 py-20 md:px-[4.5%] lg:grid-cols-[.82fr_1.25fr_.85fr] lg:gap-12 lg:py-28"
        >
            <div>
                <p className="font-mono text-xs font-bold tracking-[0.14em] text-blue-600 uppercase">
                    Typed from end to end
                </p>
                <h2 className="mt-4 text-[clamp(2.4rem,4vw,4.3rem)] leading-[0.95] font-extrabold tracking-[-0.055em] text-slate-950">
                    One import.
                    <br />
                    Exact answers.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-6 text-slate-600">
                    Literal inputs keep literal outputs, so your editor knows
                    the exact name and message—not just{' '}
                    <code className="rounded bg-slate-200 px-1 py-0.5 font-mono text-xs text-slate-900">
                        string
                    </code>
                    .
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl shadow-slate-900/20">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-700 px-4 py-3 font-mono text-[10px] text-slate-400">
                    <div className="flex gap-1.5">
                        <i className="size-2 rounded-full bg-rose-400" />
                        <i className="size-2 rounded-full bg-amber-400" />
                        <i className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span>response.ts</span>
                    <span className="justify-self-end">TypeScript</span>
                </div>
                <pre className="min-h-72 overflow-x-auto p-6 font-mono text-xs leading-7 sm:p-8 sm:text-sm">
                    <code>
                        <span className="text-violet-300">import</span>{' '}
                        {'{ Status, getStatus, isSuccess }'}
                        {`\n  `}
                        <span className="text-violet-300">from</span>{' '}
                        <span className="text-emerald-300">
                            'http-status-lite'
                        </span>
                        ;{`\n\n`}
                        <span className="text-violet-300">const</span> status =
                        getStatus(
                        <span className="text-orange-300">404</span>);{`\n\n`}
                        status.name;{' '}
                        <span className="text-slate-500">// 'NOT_FOUND'</span>
                        {`\n`}status.message;{' '}
                        <span className="text-slate-500">// 'Not Found'</span>
                        {`\n`}isSuccess(Status.NO_CONTENT);{' '}
                        <span className="text-slate-500">// true</span>
                    </code>
                </pre>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1">
                {FEATURES.map(({ title, description, icon: Icon }) => (
                    <article
                        key={title}
                        className="grid grid-cols-[40px_1fr] gap-4 border-b border-slate-200 py-5 last:border-b-0 sm:border-b-0 sm:px-3 lg:border-b lg:px-0"
                    >
                        <span className="grid size-10 place-items-center rounded-lg border border-slate-300 bg-white text-blue-600 shadow-sm">
                            <Icon className="size-4" />
                        </span>
                        <div>
                            <h3 className="text-sm font-bold text-slate-950">
                                {title}
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                                {description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
