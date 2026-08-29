import { ArrowUpRight } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { Button } from '@/components/ui/button'

type SiteHeaderProps = {
    active?: 'reference' | 'docs' | 'none'
}

export function SiteHeader({ active = 'reference' }: SiteHeaderProps) {
    const navItemClass =
        'rounded-lg px-3 py-2 text-sm font-semibold transition-colors'

    return (
        <header className="sticky top-0 z-50 grid min-h-16 grid-cols-[1fr_auto] items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl md:grid-cols-[1fr_auto_1fr] md:px-[4.5%]">
            <a
                href="/#top"
                className="flex w-fit items-center gap-2.5 font-semibold tracking-tight"
            >
                <BrandMark />
                <span>http-status-lite</span>
            </a>

            <nav
                className="hidden items-center gap-1 md:flex"
                aria-label="Primary navigation"
            >
                <a
                    className={`${navItemClass} ${active === 'reference' ? 'bg-slate-100 text-foreground' : 'text-slate-600 hover:bg-slate-100 hover:text-foreground'}`}
                    href="/#reference"
                >
                    Reference
                </a>
                <a
                    className={`${navItemClass} ${active === 'docs' ? 'bg-slate-100 text-foreground' : 'text-slate-600 hover:bg-slate-100 hover:text-foreground'}`}
                    href="/docs"
                >
                    Docs
                </a>
                <a
                    className={`${navItemClass} text-slate-600 hover:bg-slate-100 hover:text-foreground`}
                    href="/#migration"
                >
                    Migration
                </a>
            </nav>

            <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="sm" className="md:hidden" asChild>
                    <a href={active === 'docs' ? '/#reference' : '/docs'}>
                        {active === 'docs' ? 'Reference' : 'Docs'}
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                    asChild
                >
                    <a
                        href="https://www.npmjs.com/package/http-status-lite"
                        target="_blank"
                        rel="noreferrer"
                    >
                        npm
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                    asChild
                >
                    <a
                        href="https://github.com/montasim/http-status-lite"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </Button>
                <Button
                    size="sm"
                    className="ml-1 bg-dark-surface text-white hover:bg-blue-700"
                    asChild
                >
                    <a href="/#install">
                        Install <ArrowUpRight data-icon="inline-end" />
                    </a>
                </Button>
            </div>
        </header>
    )
}
