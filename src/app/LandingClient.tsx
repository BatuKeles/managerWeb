'use client'

import Navbar from '@/components/sections/Navbar'
import ScrollStorySection from '@/components/sections/ScrollStorySection'
import IpadFlipSection from '@/components/IpadFlip/IpadFlipSection'
import PricingSection from '@/components/sections/PricingSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import SupportBubble from '@/components/chat/SupportBubble'
import IntroOverlay from '@/components/IntroOverlay'
import type { ContentBlock, Package } from '@/types'


interface LandingClientProps {
  contentBlocks: ContentBlock[]
  packages: Package[]
}

function getContent(blocks: ContentBlock[], key: string): string | null {
  return blocks.find((b) => b.key === key)?.value || null
}

export default function LandingClient({ contentBlocks, packages }: LandingClientProps) {
  // Hero stats from ContentBlock
  const heroStats = [
    { value: getContent(contentBlocks, 'hero_stat_students') || '12.400+', label: 'Aktif Öğrenci',  color: '#6366f1' },
    { value: getContent(contentBlocks, 'hero_stat_clubs')    || '320+',    label: 'Aktif Kulüp',    color: '#8b5cf6' },
    { value: getContent(contentBlocks, 'hero_stat_parents')  || '8.900+',  label: 'Aktif Veli',     color: '#10b981' },
    { value: getContent(contentBlocks, 'hero_stat_coaches')  || '1.100+',  label: 'Aktif Antrenör', color: '#f97316' },
  ]

  return (
    <>
      {/* Intro scroll trap — 200vh creates the scrollable space for the cinematic intro */}
      <div id="intro-scroll-trap" style={{ height: '200vh', pointerEvents: 'none' }} />

      <Navbar />

      <main>
        {/* 3D iPad flip showcase */}
        <IpadFlipSection />

        {/* Hero + stats */}
        <ScrollStorySection stats={heroStats} />

        {/* Paketler */}
        <PricingSection packages={packages} />

        {/* Hakkımızda */}
        <AboutSection
          title={getContent(contentBlocks, 'about_title') || undefined}
          description={getContent(contentBlocks, 'about_description') || undefined}
          address={getContent(contentBlocks, 'contact_address') || undefined}
          phone={getContent(contentBlocks, 'contact_phone') || undefined}
          website={getContent(contentBlocks, 'contact_website') || undefined}
          hours={getContent(contentBlocks, 'contact_hours') || undefined}
          yearFounded={getContent(contentBlocks, 'about_year_founded') || undefined}
          clubsCount={getContent(contentBlocks, 'about_stat_clubs') || undefined}
          citiesCount={getContent(contentBlocks, 'about_stat_cities') || undefined}
        />

        {/* İletişim */}
        <ContactSection
          email={getContent(contentBlocks, 'contact_email') || undefined}
          phone={getContent(contentBlocks, 'contact_phone') || undefined}
          address={getContent(contentBlocks, 'contact_address') || undefined}
        />
      </main>

      <Footer />
      <SupportBubble />

      {/* Cinematic intro — fixed overlay, dismisses after scrolling through the trap */}
      <IntroOverlay />
    </>
  )
}
