import { useState, useEffect } from 'react'
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
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return !params.has('no-loader')
    }
    return true
  })

  // Auto-scroll to target section if hash is present in URL
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return
    const targetId = window.location.hash
    const timer = setTimeout(() => {
      const el = document.querySelector(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'auto' })
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [isLoading])

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
