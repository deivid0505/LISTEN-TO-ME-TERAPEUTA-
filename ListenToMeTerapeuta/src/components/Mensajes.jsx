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
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      {/* Sidebar de chats */}
      <div className="w-1/3 border-r bg-white">
        <h2 className="text-2xl font-semibold p-4 border-b">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 mr-3" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{chat.name}</span>
                <span className="text-sm text-gray-500">
                  {chat.messages[chat.messages.length - 1].text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel de mensajes */}
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                <span className="text-lg font-semibold text-gray-800">{selectedChat.name}</span>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'psychologist'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe un mensaje..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
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
