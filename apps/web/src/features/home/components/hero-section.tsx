import { InstallCommandTabs } from '@/features/install/components/install-command-tabs'

export function HeroSection() {
    return (
        <section
            id="top"
            className="relative overflow-hidden bg-white bg-[linear-gradient(to_right,rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.055)_1px,transparent_1px)] bg-[size:64px_64px] px-5 py-14 md:min-h-[575px] md:px-[4.5%] md:py-16"
            aria-labelledby="hero-title"
        >
            <div className="relative z-10 flex items-center gap-2 text-sm text-slate-500">
                <span className="size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <strong className="font-mono text-xs text-slate-950">
                    v2.3.0
                </strong>
                <span className="hidden sm:inline">
                    Registry updated August 2026
                </span>
            </div>

            <div
                aria-hidden="true"
                className="mt-16 flex items-baseline gap-[clamp(.55rem,2.5vw,2.8rem)] whitespace-nowrap font-sans text-[clamp(3rem,10.3vw,10rem)] leading-[0.75] font-black tracking-[-0.075em] md:mt-20"
            >
                <span className="text-slate-300">HTTP/1.1</span>
                <span className="text-blue-600">200</span>
                <span className="text-slate-950">OK</span>
            </div>

            <div className="relative z-10 mt-20 grid items-end gap-8 lg:mt-28 lg:grid-cols-[1.1fr_minmax(390px,.9fr)] lg:gap-[8%]">
                <div>
                    <h1
                        id="hero-title"
                        className="max-w-3xl text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.055em] text-slate-950"
                    >
                        Status codes that
                        <br />
                        TypeScript understands.
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Tiny, standards-backed HTTP status codes with exact
                        types, safe parsing, and literal-preserving lookups.
                        Zero runtime dependencies.
                    </p>
                </div>
                <div id="install">
                    <InstallCommandTabs />
                </div>
            </div>
        </section>
    )
}
