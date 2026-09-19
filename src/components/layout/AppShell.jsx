import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'
import { ScrollProgress } from './ScrollProgress/ScrollProgress'
import { CustomCursor } from '@/components/common/CustomCursor/CustomCursor'
import './AppShell.css'

/**
 * AppShell component
 * Orchestrates global shell elements: CustomCursor, ScrollProgress, Navbar, Main, and Footer.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AppShell({ children }) {
  return (
    <div className="app-shell">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main-content" className="app-shell__main" role="main">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default AppShell
