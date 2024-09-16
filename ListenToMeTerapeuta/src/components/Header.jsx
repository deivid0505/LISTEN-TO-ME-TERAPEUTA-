import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'

export default function Header() {
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Inicio</Link></li>
            <li><Link to="/agenda" className="text-gray-600 hover:text-gray-900 font-medium">Agenda</Link></li>
            <li><Link to="/mensajes" className="text-gray-600 hover:text-gray-900 font-medium">Mensajes</Link></li>
          </ul>
        </nav>
        <Menu as="div" className="relative">
          <Menu.Button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <img src="/placeholder.svg?height=40&width=40" alt="Perfil" className="w-full h-full object-cover" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => setIsConfigOpen(true)}
                  >
                    Configuración
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  )
}