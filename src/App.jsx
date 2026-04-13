import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import LegalEcosystem from './components/sections/LegalEcosystem'
import HowIWork from './components/sections/HowIWork'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import './index.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <LegalEcosystem />
        <HowIWork />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
