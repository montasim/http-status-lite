import { ArrowRight, BookOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SiteFooter } from '@/features/home/components/site-footer'
import { SiteHeader } from '@/features/home/components/site-header'

export function NotFoundPage() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-[1480px] flex-col overflow-hidden bg-white shadow-2xl shadow-slate-900/15 sm:my-4 sm:min-h-[calc(100vh-2rem)] sm:w-[calc(100%-2rem)] sm:rounded-2xl sm:border sm:border-slate-300">
            <SiteHeader active="none" />

            <main
                id="top"
                className="relative flex flex-1 items-center overflow-hidden bg-white bg-[linear-gradient(to_right,rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.055)_1px,transparent_1px)] bg-[size:64px_64px] px-5 py-16 md:px-[4.5%] md:py-24"
            >
                <div className="relative z-10 grid w-full gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
                    <div>
                        <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.12em] text-blue-600 uppercase">
                            <span className="size-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                            Request completed
                        </div>

                        <div
                            aria-hidden="true"
                            className="mt-12 flex items-baseline gap-[clamp(.5rem,2vw,2rem)] whitespace-nowrap text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.76] font-black tracking-[-0.075em]"
                        >
                            <span className="text-slate-300">HTTP/1.1</span>
                            <span className="text-amber-500">404</span>
                        </div>

                        <h1 className="mt-14 max-w-3xl text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.06em] text-foreground">
                            This route is
                            <br />
                            not in the registry.
                        </h1>
                    </div>

                    <div className="max-w-xl lg:pb-1">
                        <p className="text-base leading-7 text-slate-600 sm:text-lg">
                            The address may be mistyped or the page may have
                            moved. Continue with the interactive status
                            reference or open the usage guide.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button
                                size="lg"
                                className="bg-dark-surface text-white hover:bg-blue-700"
                                asChild
                            >
                                <a href="/#reference">
                                    Open the reference{' '}
                                    <ArrowRight data-icon="inline-end" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="/docs">
                                    <BookOpen data-icon="inline-start" /> Read
                                    the docs
                                </a>
                            </Button>
                        </div>

                        <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-slate-200 pt-6 font-mono text-xs">
                            <dt className="text-slate-400">status</dt>
                            <dd className="m-0 text-amber-600">
                                404 Not Found
                            </dd>
                            <dt className="text-slate-400">next</dt>
                            <dd className="m-0 text-blue-600">/#reference</dd>
                        </dl>
                    </div>
                </div>

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-[0.08em] -bottom-[0.25em] select-none text-[clamp(15rem,38vw,36rem)] leading-none font-black tracking-[-0.1em] text-slate-100"
                >
                    404
                </span>
            </main>

            <SiteFooter />
        </div>
    )
}
