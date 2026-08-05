import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CopyButtonProps = {
    value: string
    className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    async function copyValue() {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={copyValue}
            className={cn('shrink-0', className)}
            aria-label={copied ? 'Copied' : `Copy ${value}`}
        >
            {copied ? <Check className="text-emerald-600" /> : <Copy />}
        </Button>
    )
}
