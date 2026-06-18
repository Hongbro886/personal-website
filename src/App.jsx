import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <main>
        <div className="page page-1">
          <Home />
        </div>
        <div className="page page-2">
          <Contact />
        </div>
      </main>
    </div>
  )
}

export default App
