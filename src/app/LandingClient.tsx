'use client'

import Navbar from '@/components/sections/Navbar'
import ScrollStorySection from '@/components/sections/ScrollStorySection'
import PricingSection from '@/components/sections/PricingSection'
import AppStoreSection from '@/components/sections/AppStoreSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import type { ContentBlock, Package } from '@/types'

interface LandingClientProps {
  contentBlocks: ContentBlock[]
  packages: Package[]
}

function getContent(blocks: ContentBlock[], key: string): string | null {
  return blocks.find((b) => b.key === key)?.value || null
}

export default function LandingClient({ contentBlocks, packages }: LandingClientProps) {
  return (
    <>
      <Navbar />

      <main>
        {/* Tablet scroll hikâyesi — hero + roller (5 slide) */}
        <ScrollStorySection />

        {/* Paketler */}
        <PricingSection packages={packages} />

        {/* App store linkleri */}
        {/* <AppStoreSection /> */}

        {/* Hakkımızda */}
        <AboutSection
          title={getContent(contentBlocks, 'about_title') || undefined}
          description={getContent(contentBlocks, 'about_description') || undefined}
        />

        {/* İletişim */}
        <ContactSection
          email={getContent(contentBlocks, 'contact_email') || undefined}
          phone={getContent(contentBlocks, 'contact_phone') || undefined}
          address={getContent(contentBlocks, 'contact_address') || undefined}
        />
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}
