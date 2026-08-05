import { CopyButton } from '@/components/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const INSTALL_COMMANDS = {
    npm: 'npm install http-status-lite',
    pnpm: 'pnpm add http-status-lite',
    yarn: 'yarn add http-status-lite',
    bun: 'bun add http-status-lite',
} as const

export function InstallCommandTabs() {
    return (
        <Tabs
            defaultValue="npm"
            className="overflow-hidden rounded-xl border border-slate-300 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur"
        >
            <div className="flex flex-col border-b border-slate-200 px-4 pt-2.5 sm:flex-row sm:items-end sm:justify-between">
                <span className="pb-2 font-mono text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase">
                    Install package
                </span>
                <TabsList
                    variant="line"
                    className="h-8 max-w-full justify-start"
                >
                    {Object.keys(INSTALL_COMMANDS).map((manager) => (
                        <TabsTrigger
                            key={manager}
                            value={manager}
                            className="px-2 font-mono text-[11px] capitalize"
                        >
                            {manager}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {Object.entries(INSTALL_COMMANDS).map(([manager, command]) => (
                <TabsContent key={manager} value={manager} className="mt-0">
                    <div className="flex min-w-0 items-center gap-2 px-4 py-3">
                        <code className="min-w-0 flex-1 truncate font-mono text-xs sm:text-sm">
                            <span className="mr-2 text-blue-600">$</span>
                            {command}
                        </code>
                        <CopyButton value={command} className="bg-slate-100" />
                    </div>
                </TabsContent>
            ))}

            <div className="flex flex-wrap justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
                <span>
                    <b className="text-slate-900">64</b> known codes
                </span>
                <span>
                    <b className="text-slate-900">0</b> dependencies
                </span>
                <span>
                    <b className="text-slate-900">MIT</b> licensed
                </span>
            </div>
        </Tabs>
    )
}
