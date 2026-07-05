import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './components/Home/Home'
import Stack from './components/Stack/Stack'
import Friends from './components/Friends/Friends'
import Contact from './components/Contact/Contact'
import './App.css'

const pages = [
  { id: 'home', component: Home },
  { id: 'stack', component: Stack },
  { id: 'contact', component: Contact },
  { id: 'friends', component: Friends },
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
  const lockedRef = useRef(false)
  const currentPageRef = useRef(0)
  const lastChangeTimeRef = useRef(0)

  currentPageRef.current = currentPage

  const goToPage = (index, dir) => {
    if (index < 0 || index >= pages.length) return
    lockedRef.current = true
    setDirection(dir)
    setCurrentPage(index)
    lastChangeTimeRef.current = Date.now()
  }

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 3) return
      const scrollable = e.target.closest?.('.friends-cards')
      if (scrollable) {
        const canScrollDown = e.deltaY > 0 && scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1
        const canScrollUp = e.deltaY < 0 && scrollable.scrollTop > 0
        if (canScrollDown || canScrollUp) return
      }
      if (Date.now() - lastChangeTimeRef.current < 800) return

      const page = currentPageRef.current
      if (e.deltaY > 0 && page < pages.length - 1) {
        goToPage(page + 1, 1)
      } else if (e.deltaY < 0 && page > 0) {
        goToPage(page - 1, -1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

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
            onClick={() => {
              if (lockedRef.current) return
              const dir = index > currentPageRef.current ? 1 : -1
              goToPage(index, dir)
            }}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </nav>
    </div>
  )
}

export default App
