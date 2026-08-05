import type { HttpStatusMetadata } from 'http-status-lite/metadata'

import {
    CATEGORY_DETAILS,
    CATEGORY_ORDER,
} from '@/features/status-reference/model/category'

type CategoryRibbonProps = {
    statuses: ReadonlyArray<HttpStatusMetadata>
}

export function CategoryRibbon({ statuses }: CategoryRibbonProps) {
    return (
        <section
            className="grid auto-cols-[minmax(150px,1fr)] grid-flow-col overflow-x-auto bg-slate-900 text-white"
            aria-label="HTTP status categories"
        >
            {CATEGORY_ORDER.map((category) => {
                const details = CATEGORY_DETAILS[category]
                const count = statuses.filter(
                    (status) => status.category === category,
                ).length

                return (
                    <div
                        key={category}
                        className={`grid grid-cols-[auto_1fr] gap-x-3 border-r border-white/10 border-b-4 px-5 py-4 ${details.border}`}
                    >
                        <strong
                            className={`row-span-2 font-mono text-lg ${details.text}`}
                        >
                            {category}
                        </strong>
                        <span className="justify-self-end font-mono text-[10px] text-slate-500">
                            {count.toString().padStart(2, '0')}
                        </span>
                        <span className="justify-self-end text-xs text-slate-300">
                            {details.label}
                        </span>
                    </div>
                )
            })}
        </section>
    )
}
