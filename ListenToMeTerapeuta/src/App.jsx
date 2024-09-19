import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Home, Calendar, MessageSquare, Settings } from 'lucide-react'
import { useEffect } from 'react'
import Inicio from './components/Home'
import Agenda from './components/Agenda'
import Mensajes from './components/Mensajes'

function Sidebar() {
  const location = useLocation()
  const isMessagesRoute = location.pathname.startsWith('/mensajes')

  const navItems = [
    { icon: <Home size={24} />, text: 'Inicio', path: '/' },
    { icon: <Calendar size={24} />, text: 'Agenda', path: '/agenda' },
    { icon: <MessageSquare size={24} />, text: 'Mensajes', path: '/mensajes' },
    { icon: <Settings size={24} />, text: 'Configuración', path: '/configuracion' },
  ]

  return (
    <nav className="w-200 bg-indigo-600 shadow-md flex flex-col py-5">
      {navItems.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className="flex items-center space-x-4 p-5 rounded-lg hover:bg-blue-500 text-white mb-3 transition-all duration-30"
          title={item.text}
        >
          {item.icon}
          {!isMessagesRoute && (
            <span className="text-sm">{item.text}</span>
          )}
        </a>
      ))}
    </nav>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    // Cambiar el título de la pestaña dependiendo de la ruta actual
    switch (location.pathname) {
      case '/':
        document.title = 'Inicio - Mi App'
        break
      case '/agenda':
        document.title = 'Agenda - Mi App'
        break
      case '/mensajes':
        document.title = 'Mensajes - Mi App'
        break
      case '/configuracion':
        document.title = 'Configuración - Mi App'
        break
      default:
        document.title = 'Mi App'
        break
    }
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/configuracion" element={<div>Configuración</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
