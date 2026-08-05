import type { HttpStatusCategory } from 'http-status-lite'

export const CATEGORY_ORDER: ReadonlyArray<HttpStatusCategory> = [
    '1xx',
    '2xx',
    '3xx',
    '4xx',
    '5xx',
]

export const CATEGORY_DETAILS = {
    '1xx': {
        label: 'Informational',
        text: 'text-cyan-600',
        border: 'border-cyan-500',
        background: 'bg-cyan-500',
    },
    '2xx': {
        label: 'Success',
        text: 'text-emerald-600',
        border: 'border-emerald-500',
        background: 'bg-emerald-500',
    },
    '3xx': {
        label: 'Redirection',
        text: 'text-violet-600',
        border: 'border-violet-500',
        background: 'bg-violet-500',
    },
    '4xx': {
        label: 'Client error',
        text: 'text-amber-600',
        border: 'border-amber-500',
        background: 'bg-amber-500',
    },
    '5xx': {
        label: 'Server error',
        text: 'text-rose-600',
        border: 'border-rose-500',
        background: 'bg-rose-500',
    },
} as const satisfies Record<
    HttpStatusCategory,
    { label: string; text: string; border: string; background: string }
>
