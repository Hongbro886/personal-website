import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import './App.css'

const pages = [
  { id: 'home', component: Home },
  { id: 'contact', component: Contact },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToPage = useCallback((index) => {
    if (index >= 0 && index < pages.length && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentPage(index)
    }
  }, [isTransitioning])

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return

      if (e.deltaY > 15) {
        goToPage(currentPage + 1)
      } else if (e.deltaY < -15) {
        goToPage(currentPage - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentPage, isTransitioning, goToPage])

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  const CurrentComponent = pages[currentPage].component

  return (
    <div className="app">
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.30, ease: 'easeInOut' }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="page-dots">
        {pages.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentPage === index ? 'active' : ''}`}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </nav>
    </div>
  )
}

export default App
