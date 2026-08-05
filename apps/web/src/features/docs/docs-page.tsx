import { ArrowRight, ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/features/docs/components/code-block'
import { SiteFooter } from '@/features/home/components/site-footer'
import { SiteHeader } from '@/features/home/components/site-header'

const SECTIONS = [
    ['start', 'Start'],
    ['constants', 'Constants'],
    ['lookups', 'Lookups'],
    ['validation', 'Validation'],
    ['predicates', 'Predicates'],
    ['metadata', 'Metadata'],
    ['types', 'Types'],
    ['migration', 'Migration'],
] as const

const quickStart = `import { Status, getStatus, isSuccess } from 'http-status-lite';

Status.OK; // 200

const status = getStatus(404);
status.name;    // 'NOT_FOUND'
status.message; // 'Not Found'

isSuccess(Status.NO_CONTENT); // true`

const constants = `import { NOT_FOUND, OK, Status } from 'http-status-lite';

OK;               // 200
NOT_FOUND;        // 404
Status.CREATED;   // 201

// Constants-only entry point
import { BAD_REQUEST } from 'http-status-lite/codes';`

const lookups = `import {
  getReasonPhrase,
  getStatus,
  getStatusCode,
  getStatusName,
} from 'http-status-lite';

getStatus(404);              // complete entry
getStatusCode('NOT_FOUND');  // 404
getStatusName(404);          // 'NOT_FOUND'
getReasonPhrase(404);        // 'Not Found'
getStatus(499);              // null`

const validation = `import {
  assertStatusCode,
  isStatusCode,
  isStatusName,
  parseStatusCode,
} from 'http-status-lite';

parseStatusCode('404');        // 404
parseStatusCode('499');        // null
isStatusCode(404);             // true; narrows the value
isStatusName('NOT_FOUND');     // true; narrows the value
assertStatusCode(value);       // narrows or throws TypeError`

const predicates = `import {
  getCategory,
  isClientError,
  isError,
  isRedirect,
  isServerError,
  isSuccess,
} from 'http-status-lite/predicates';

isClientError(499);  // true: any integer in the 4xx range
isStatusCode(499);   // false: not a represented registry entry
getCategory(499);    // '4xx'`

const metadata = `import { getStatusMetadata } from 'http-status-lite/metadata';

getStatusMetadata(104);
// {
//   code: 104,
//   name: 'UPLOAD_RESUMPTION_SUPPORTED',
//   message: 'Upload Resumption Supported',
//   reference: 'draft-ietf-httpbis-resumable-upload-05',
//   registryStatus: 'temporary',
//   category: '1xx'
// }`

const types = `import type {
  HttpStatusCategory,
  HttpStatusCode,
  HttpStatusEntry,
  HttpStatusName,
} from 'http-status-lite';

const code: HttpStatusCode = 404;
const name: HttpStatusName = 'NOT_FOUND';

const invalid: HttpStatusCode = 499; // TypeScript error`

const migration = `import { httpStatusLite } from 'http-status-lite';

httpStatusLite.OK;                    // 200
httpStatusLite.NOT_FOUND_MESSAGE;     // 'Not Found'
httpStatusLite[404];                  // 'NOT_FOUND'
httpStatusLite.PAYLOAD_TOO_LARGE;     // legacy alias

// Prefer the current RFC 9110 name in new code:
Status.CONTENT_TOO_LARGE;             // 413`

function SectionHeading({
    label,
    title,
    children,
}: {
    label: string
    title: string
    children: React.ReactNode
}) {
    return (
        <header>
            <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-blue-600 uppercase">
                {label}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {title}
            </h2>
            <div className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                {children}
            </div>
        </header>
    )
}

export function DocsPage() {
    return (
        <div className="mx-auto min-h-screen w-full max-w-[1480px] overflow-hidden bg-white shadow-2xl shadow-slate-900/15 sm:my-4 sm:w-[calc(100%-2rem)] sm:rounded-2xl sm:border sm:border-slate-300">
            <SiteHeader active="docs" />

            <main id="top">
                <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-5 py-16 text-white md:px-[4.5%] md:py-24">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(96,165,250,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,.1)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    />
                    <div className="relative grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">
                        <div>
                            <Badge className="border border-blue-400/30 bg-blue-400/10 font-mono text-blue-200">
                                Documentation · v2.3.0
                            </Badge>
                            <h1 className="mt-8 max-w-3xl text-[clamp(3.4rem,7vw,7.5rem)] leading-[0.82] font-black tracking-[-0.075em]">
                                From status
                                <br />
                                to certainty.
                            </h1>
                            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                                Install the package, choose the smallest entry
                                point, and keep exact HTTP status types from
                                input to response.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80 font-mono shadow-2xl">
                            <div className="flex items-center justify-between border-b border-slate-700 px-5 py-3 text-[10px] tracking-wider text-slate-400 uppercase">
                                <span>GET /docs</span>
                                <span className="text-emerald-400">200 OK</span>
                            </div>
                            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 p-5 text-xs sm:p-6">
                                <span className="text-slate-500">
                                    content-type
                                </span>
                                <span className="text-blue-300">
                                    application/typescript
                                </span>
                                <span className="text-slate-500">
                                    dependencies
                                </span>
                                <span className="text-emerald-300">0</span>
                                <span className="text-slate-500">module</span>
                                <span className="text-violet-300">
                                    ESM + CommonJS
                                </span>
                                <span className="text-slate-500">runtime</span>
                                <span className="text-amber-300">
                                    Node.js + browser
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="border-b border-slate-200 bg-slate-50 px-5 py-5 lg:border-r lg:border-b-0 lg:px-8 lg:py-12">
                        <div className="lg:sticky lg:top-28">
                            <p className="mb-3 font-mono text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase">
                                Response trace
                            </p>
                            <nav
                                className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1"
                                aria-label="Documentation contents"
                            >
                                {SECTIONS.map(([id, label], index) => (
                                    <a
                                        key={id}
                                        href={`#${id}`}
                                        className="group flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-700 lg:w-full"
                                    >
                                        <span className="font-mono text-[10px] text-slate-400 group-hover:text-blue-500">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {label}
                                    </a>
                                ))}
                            </nav>
                            <div className="mt-8 hidden border-t border-slate-200 pt-6 lg:block">
                                <p className="text-xs leading-5 text-slate-500">
                                    Looking for a specific code?
                                </p>
                                <a
                                    href="/#reference"
                                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                                >
                                    Open the reference{' '}
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </div>
                    </aside>

                    <div className="min-w-0 px-5 md:px-[8%] lg:px-[9%]">
                        <section
                            id="start"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="01 / Start"
                                title="Two commands to typed statuses."
                            >
                                <p>
                                    Install the package, then import from the
                                    main entry point. There are no runtime
                                    dependencies or setup steps.
                                </p>
                            </SectionHeading>
                            <CodeBlock language="Shell">
                                npm install http-status-lite
                            </CodeBlock>
                            <CodeBlock>{quickStart}</CodeBlock>
                            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
                                <strong>Literal in, literal out.</strong>{' '}
                                Calling{' '}
                                <code className="font-mono text-xs">
                                    getStatus(404)
                                </code>{' '}
                                preserves{' '}
                                <code className="font-mono text-xs">
                                    'NOT_FOUND'
                                </code>{' '}
                                and{' '}
                                <code className="font-mono text-xs">
                                    'Not Found'
                                </code>{' '}
                                in the returned type—not merely{' '}
                                <code className="font-mono text-xs">
                                    string
                                </code>
                                .
                            </div>
                        </section>

                        <section
                            id="constants"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="02 / API"
                                title="Use constants without magic numbers."
                            >
                                <p>
                                    Import individual constants or use the
                                    complete{' '}
                                    <code className="font-mono text-sm text-slate-900">
                                        Status
                                    </code>{' '}
                                    object. Choose{' '}
                                    <code className="font-mono text-sm text-slate-900">
                                        /codes
                                    </code>{' '}
                                    when constants are all you need.
                                </p>
                            </SectionHeading>
                            <CodeBlock>{constants}</CodeBlock>
                        </section>

                        <section
                            id="lookups"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="03 / API"
                                title="Translate codes, names, and phrases."
                            >
                                <p>
                                    Lookup helpers return exact types for known
                                    literal inputs and{' '}
                                    <code className="font-mono text-sm text-slate-900">
                                        null
                                    </code>{' '}
                                    when a registry entry is unknown.
                                </p>
                            </SectionHeading>
                            <CodeBlock>{lookups}</CodeBlock>
                        </section>

                        <section
                            id="validation"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="04 / Boundaries"
                                title="Narrow values you do not control."
                            >
                                <p>
                                    Parse environment variables, route
                                    parameters, and other external input before
                                    using them as known status codes.
                                </p>
                            </SectionHeading>
                            <CodeBlock>{validation}</CodeBlock>
                        </section>

                        <section
                            id="predicates"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="05 / Classification"
                                title="Ranges and registry entries stay separate."
                            >
                                <p>
                                    Predicates classify any integer in the HTTP
                                    range. Registry guards answer the stricter
                                    question: does this package know the code?
                                </p>
                            </SectionHeading>
                            <CodeBlock>{predicates}</CodeBlock>
                        </section>

                        <section
                            id="metadata"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="06 / Standards"
                                title="Load standards data only when needed."
                            >
                                <p>
                                    References, categories, and IANA lifecycle
                                    states live in the optional metadata entry
                                    point, keeping them out of the core bundle.
                                </p>
                            </SectionHeading>
                            <CodeBlock>{metadata}</CodeBlock>
                            <p className="text-sm leading-6 text-slate-600">
                                Lifecycle values are{' '}
                                <code className="font-mono text-xs">
                                    permanent
                                </code>
                                ,{' '}
                                <code className="font-mono text-xs">
                                    temporary
                                </code>
                                ,{' '}
                                <code className="font-mono text-xs">
                                    unused
                                </code>
                                , or{' '}
                                <code className="font-mono text-xs">
                                    obsolete
                                </code>
                                .
                            </p>
                        </section>

                        <section
                            id="types"
                            className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="07 / TypeScript"
                                title="Bring the registry into your type system."
                            >
                                <p>
                                    Use generated unions when an API accepts
                                    only represented codes, names, categories,
                                    or complete entries.
                                </p>
                            </SectionHeading>
                            <CodeBlock>{types}</CodeBlock>
                        </section>

                        <section
                            id="migration"
                            className="scroll-mt-24 py-16 lg:py-24"
                        >
                            <SectionHeading
                                label="08 / Compatibility"
                                title="Migrate when you are ready."
                            >
                                <p>
                                    The original namespace and legacy RFC names
                                    remain supported. New code should prefer
                                    current names on{' '}
                                    <code className="font-mono text-sm text-slate-900">
                                        Status
                                    </code>
                                    .
                                </p>
                            </SectionHeading>
                            <CodeBlock>{migration}</CodeBlock>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button
                                    className="bg-slate-950 text-white hover:bg-blue-700"
                                    asChild
                                >
                                    <a href="/#reference">
                                        Explore all status codes{' '}
                                        <ArrowRight data-icon="inline-end" />
                                    </a>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a
                                        href="https://github.com/montasim/http-status-lite"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View source{' '}
                                        <ExternalLink data-icon="inline-end" />
                                    </a>
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
