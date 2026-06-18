import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './components/Home/Home'
import Stack from './components/Stack/Stack'
import Contact from './components/Contact/Contact'
import './App.css'

const pages = [
  { id: 'home', component: Home },
  { id: 'stack', component: Stack },
  { id: 'contact', component: Contact },
]

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    scale: direction > 0 ? 0.92 : 1.08,
    y: direction > 0 ? 40 : -40,
    filter: 'blur(8px)',
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: direction > 0 ? 1.08 : 0.92,
    y: direction > 0 ? -40 : 40,
    filter: 'blur(8px)',
    transition: {
      duration: 0.35,
      ease: [0.55, 0.06, 0.68, 0.19],
    },
  }),
}

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastScrollTime = useRef(Date.now())

  const goToPage = useCallback((index, dir) => {
    if (index >= 0 && index < pages.length && !isTransitioning) {
      setDirection(dir)
      setIsTransitioning(true)
      setCurrentPage(index)
    }
  }, [isTransitioning])

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now()
      if (now - lastScrollTime.current < 500) return
      if (isTransitioning) return

      if (e.deltaY > 15) {
        lastScrollTime.current = now
        goToPage(currentPage + 1, 1)
      } else if (e.deltaY < -15) {
        lastScrollTime.current = now
        goToPage(currentPage - 1, -1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentPage, isTransitioning, goToPage])

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  const CurrentComponent = pages[currentPage].component

  return (
    <div className="app">
      <main>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            className="page"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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
            onClick={() => goToPage(index, index > currentPage ? 1 : -1)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </nav>
    </div>
  )
}

export default App
