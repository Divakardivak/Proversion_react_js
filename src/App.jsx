import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { SmoothScroll } from '@/components/common/SmoothScroll'
import { LoadingScreen } from '@/components/common/LoadingScreen/LoadingScreen'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { WhyUs } from '@/components/whyUs/WhyUs'
import { MobileSales } from '@/components/mobileSales'
import { Entrepreneurship } from '@/components/entrepreneurship/Entrepreneurship'
import { CareerPath } from '@/components/careerPath/CareerPath'
import { Testimonials } from '@/components/testimonials/Testimonials'
import { Contact } from '@/components/contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <SmoothScroll>
        <AppShell>
          <Hero />
          <About />
          <WhyUs />
          <MobileSales />
          <Entrepreneurship />
          <CareerPath />
          <Testimonials />
          <Contact />
        </AppShell>
      </SmoothScroll>
    </>
  )
}

export default App
