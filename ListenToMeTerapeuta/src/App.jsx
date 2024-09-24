'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom'
import { Home, Calendar, MessageSquare, Settings } from 'lucide-react'

const Inicio = () => <div>Inicio</div>
const Agenda = () => <div>Agenda</div>
const Mensajes = () => <div>Mensajes</div>

function LandingPage() {
  const [text, setText] = useState('');
  const fullText = "Gestiona tus pacientes";
  const [isTextComplete, setIsTextComplete] = useState(false);

  useEffect(() => {
    if (!isTextComplete) {
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < fullText.length) {
          setText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingEffect);
          setIsTextComplete(true);
        }
      }, 50);

      return () => clearInterval(typingEffect);
    }
  }, [isTextComplete, fullText]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Listen To Me</h1>
        <div className="space-x-4">
          <Link to="/crear-cuenta" className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
            Crear cuenta
          </Link>
          <Link to="/iniciar-sesion" className="px-4 md:px-6 py-2 bg-white text-blue-600 rounded-full border border-blue-600 hover:bg-blue-50 transition duration-300">
            Iniciar sesión
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto mt-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 h-20">
            {text}
          </h2>
          <p className="text-lg md:text-xl text-blue-700">
          Nuestra plataforma conecta a pacientes con psicólogos calificados, ofreciendo terapia en línea de forma rápida, segura y accesible. Con un sistema sencillo de reservas y atención personalizada, facilitamos el acceso al apoyo emocional desde cualquier lugar. ¡Tu bienestar mental, a solo un clic!
          </p>
          <Link to="/crear-cuenta" className="inline-block px-6 md:px-8 py-3 bg-blue-600 text-white rounded-full text-lg md:text-xl hover:bg-blue-700 transition duration-300">
            Comenzar ahora
          </Link>
        </div>
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0 relative overflow-hidden"
          whileHover={{ y: -10, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
        
          <img
            src="/src/assets/Example_1.png" 
            alt="Personas usando la plataforma"
            className="rounded-lg relative z-10"
          />
        </motion.div>

      </main>
    </div>
  );
}



function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
            Crear cuenta
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link to="/iniciar-sesion" className="text-blue-600 hover:text-blue-800">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <Link to="/crear-cuenta" className="text-blue-600 hover:text-blue-800">Crea una cuenta</Link>
        </p>
      </div>
    </div>
  )
}

function Sidebar() {
  const location = useLocation()
  const isMessagesRoute = location.pathname.startsWith('/mensajes')

  const navItems = [
    { icon: <Home size={24} />, text: 'Inicio', path: '/' },
    { icon: <Calendar size={24} />, text: 'Agenda', path: '/agenda' },
    { icon: <MessageSquare size={24} />, text: 'Mensajes', path: '/mensajes' },
    { icon: <Settings size={24} />, text: 'Configuración', path: '/configuracion' },
  ]

  const shouldHideSidebar = ['/', '/crear-cuenta', '/iniciar-sesion'].includes(location.pathname)

  if (shouldHideSidebar) return null

  return (
    <div className="h-full w-48 bg-gray-100 shadow-lg">
      <nav className="space-y-4 mt-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-4 rounded-md flex items-center space-x-4 ${isMessagesRoute && item.text === 'Mensajes' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-200'
              }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/crear-cuenta" element={<CreateAccount />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/mensajes" element={<Mensajes />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
