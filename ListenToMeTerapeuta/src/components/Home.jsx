import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Home() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const fileInputRef = useRef(null) // Referencia al input de archivo

  const stories = [
    { id: 'add', type: 'add' },
    { id: 1, name: 'Juan P.', image: '/placeholder.svg?height=60&width=60' },
    { id: 2, name: 'María G.', image: '/placeholder.svg?height=60&width=60' },
    { id: 3, name: 'Carlos R.', image: '/placeholder.svg?height=60&width=60' },
    { id: 4, name: 'Ana M.', image: '/placeholder.svg?height=60&width=60' },
    { id: 5, name: 'Luis S.', image: '/placeholder.svg?height=60&width=60' },
  ]

  const recentChats = [
    { id: 1, name: 'Juan Pérez', lastMessage: 'Hola, ¿cómo estás?' },
    { id: 2, name: 'María García', lastMessage: 'Gracias por la sesión de hoy' },
    { id: 3, name: 'Carlos Rodríguez', lastMessage: 'Nos vemos mañana' },
    { id: 4, name: 'Ana Martínez', lastMessage: '¿Podemos cambiar la hora?' },
  ]

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex + 5 < stories.length ? prevIndex + 1 : prevIndex
    )
  }

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0)
  }

  const latestAppointment = {
    date: '2023-06-15',
    time: '14:30',
    patientName: 'Laura Sánchez'
  }

  // Función para abrir el selector de archivos
  const handleAddStoryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Disparar el click en el input de archivo
    }
  }

  return (
    <div className="space-y-8 p-6 min-h-screen">
      <div className="relative">
        <div className="flex space-x-4 overflow-x-hidden">
          {stories.slice(currentStoryIndex, currentStoryIndex + 5).map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              {story.type === 'add' ? (
                <div 
                  className="w-16 h-16 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center cursor-pointer transition-colors"
                  onClick={handleAddStoryClick}
                >
                  <PlusCircle className="w-8 h-8 text-blue-600" />
                </div>
              ) : (
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
              )}
              <span className="text-sm mt-1 text-blue-700">{story.type === 'add' ? 'Agregar' : story.name}</span>
            </div>
          ))}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Esconder el input
        />
        {currentStoryIndex > 0 && (
          <button 
            onClick={prevStory} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-blue-200 transition"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>
        )}
        {currentStoryIndex + 5 < stories.length && (
          <button 
            onClick={nextStory} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-blue-200 transition"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Próxima Cita</h3>
        <p className="text-blue-600">Fecha: {latestAppointment.date}</p>
        <p className="text-blue-600">Hora: {latestAppointment.time}</p>
        <p className="text-blue-600">Paciente: {latestAppointment.patientName}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Chats Recientes</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentChats.map((chat) => (
            <Link 
              key={chat.id} 
              to={`/mensajes/${chat.id}`} 
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-100 hover:border-blue-200"
            >
              <h3 className="font-semibold text-blue-800">{chat.name}</h3>
              <p className="text-sm text-blue-600 truncate">{chat.lastMessage}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
