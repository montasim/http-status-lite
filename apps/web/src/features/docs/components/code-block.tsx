import { CopyButton } from '@/components/copy-button'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
    children: string
    language?: string
    className?: string
}

export function CodeBlock({
    children,
    language = 'TypeScript',
    className,
}: CodeBlockProps) {
    return (
        <div
            className={cn(
                'my-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg shadow-slate-900/10',
                className,
            )}
        >
            <div className="flex h-10 items-center justify-between border-b border-slate-700 px-4 font-mono text-[10px] tracking-wide text-slate-400 uppercase">
                <span>{language}</span>
                <CopyButton
                    value={children}
                    className="size-7 text-slate-400 hover:bg-slate-800 hover:text-white"
                />
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-200 sm:p-6">
                <code>{children}</code>
            </pre>
        </div>
    )
}
