import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './components/Home'
import Agenda from './components/Agenda'
import Mensajes from './components/Mensajes'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/mensajes" element={<Mensajes />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}