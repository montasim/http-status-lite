import { BrandMark } from '@/components/brand-mark'

const LINKS = [
    ['Docs', '/docs'],
    ['npm', 'https://www.npmjs.com/package/http-status-lite'],
    ['GitHub', 'https://github.com/montasim/http-status-lite'],
    [
        'License',
        'https://github.com/montasim/http-status-lite/blob/main/LICENSE',
    ],
    [
        'Security',
        'https://github.com/montasim/http-status-lite/blob/main/packages/http-status-lite/SECURITY.md',
    ],
] as const

export function SiteFooter() {
    return (
        <footer className="grid items-center gap-8 border-t border-white/15 bg-dark-surface px-5 py-10 text-white md:grid-cols-[1fr_auto_1fr] md:px-[4.5%]">
            <div>
                <a
                    href="#top"
                    className="inline-flex items-center gap-2.5 font-semibold"
                >
                    <BrandMark />
                    http-status-lite
                </a>
                <p className="mt-2 text-xs text-slate-400">
                    Standards-backed status codes for Node.js and browsers.
                </p>
            </div>
            <nav
                className="flex flex-wrap gap-5 text-xs text-slate-300"
                aria-label="Footer navigation"
            >
                {LINKS.map(([label, href]) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noreferrer' : undefined}
                        className="hover:text-white"
                    >
                        {label}
                    </a>
                ))}
            </nav>
            <p className="text-xs text-slate-400 md:justify-self-end">
                MIT License · Built by Montasim
            </p>
        </footer>
    )
}
