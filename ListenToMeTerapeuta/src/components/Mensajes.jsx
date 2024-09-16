import { useState } from 'react'

export default function Mensajes() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')

  const chats = [
    { id: 1, name: 'Juan Pérez', messages: [{ text: 'Hola, ¿cómo estás?', sender: 'patient' }] },
    { id: 2, name: 'María García', messages: [{ text: 'Gracias por la sesión de hoy', sender: 'patient' }] },
    { id: 3, name: 'Carlos Rodríguez', messages: [{ text: 'Nos vemos mañana', sender: 'patient' }] },
    { id: 4, name: 'Ana Martínez', messages: [{ text: '¿Podemos cambiar la hora?', sender: 'patient' }] },
  ]

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { text: message, sender: 'psychologist' }],
          }
        }
        return chat
      })
      setSelectedChat(updatedChats.find((chat) => chat.id === selectedChat.id))
      setMessage('')
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/3 border-r">
        <h2 className="text-2xl font-bold p-4">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedChat?.id === chat.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.sender === 'psychologist'
                      ? 'bg-indigo-100 ml-auto'
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded-l"
                placeholder="Escribe un mensaje..."
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700"
              >
                Enviar
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Selecciona un chat para comenzar
          </div>
        )}
      </div>
    </div>
  )
}