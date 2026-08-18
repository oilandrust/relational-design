import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowIWork />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
