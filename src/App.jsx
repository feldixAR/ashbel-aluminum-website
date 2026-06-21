import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Gallery } from '@/components/Gallery'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Knowledge } from '@/components/Knowledge'
import { MobileActions } from '@/components/MobileActions'
import { Process } from '@/components/Process'
import { Services } from '@/components/Services'
import './App.css'

function App() {
  return (
    <main className="site-shell" id="top">
      <Header />
      <Hero />
      <Services />
      <About />
      <Process />
      <Gallery />
      <Knowledge />
      <Contact />
      <MobileActions />
      <Footer />
    </main>
  )
}

export default App
