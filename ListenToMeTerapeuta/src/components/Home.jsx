import { Link } from 'react-router-dom'

export default function Home() {
  const recentChats = [
    { id: 1, name: 'Juan Pérez', lastMessage: 'Hola, ¿cómo estás?' },
    { id: 2, name: 'María García', lastMessage: 'Gracias por la sesión de hoy' },
    { id: 3, name: 'Carlos Rodríguez', lastMessage: 'Nos vemos mañana' },
    { id: 4, name: 'Ana Martínez', lastMessage: '¿Podemos cambiar la hora?' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chats Recientes</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentChats.map((chat) => (
          <Link key={chat.id} to={`/mensajes/${chat.id}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}