import type { HttpStatusMetadata } from 'http-status-lite/metadata'

import { ApiMapSection } from '@/features/home/components/api-map-section'
import { CategoryRibbon } from '@/features/home/components/category-ribbon'
import { HeroSection } from '@/features/home/components/hero-section'
import { QuickStartSection } from '@/features/home/components/quick-start-section'
import { SiteFooter } from '@/features/home/components/site-footer'
import { SiteHeader } from '@/features/home/components/site-header'
import { StatusExplorer } from '@/features/status-reference/components/status-explorer'

type HomePageProps = {
    statuses: ReadonlyArray<HttpStatusMetadata>
}

export function HomePage({ statuses }: HomePageProps) {
    return (
        <div className="mx-auto min-h-screen w-full max-w-[1480px] overflow-hidden bg-background shadow-2xl shadow-slate-900/15 sm:my-4 sm:w-[calc(100%-2rem)] sm:rounded-2xl sm:border sm:border-slate-300">
            <SiteHeader />
            <main>
                <HeroSection />
                <CategoryRibbon statuses={statuses} />
                <QuickStartSection />
                <StatusExplorer statuses={statuses} />
                <ApiMapSection />
            </main>
            <SiteFooter />
        </div>
    )
}
