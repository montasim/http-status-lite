type BrandMarkProps = {
    className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
    return (
        <img
            src="/logo-mark.svg"
            alt=""
            width="64"
            height="64"
            className={className ?? 'size-7'}
        />
    )
}
