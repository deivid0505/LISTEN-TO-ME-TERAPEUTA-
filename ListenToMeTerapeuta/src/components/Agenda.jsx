import { useState } from 'react'
import { format, addDays, startOfWeek } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '' })

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentDate), i))

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment])
    setNewAppointment({ date: '', time: '', patient: '' })
    setIsModalOpen(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex">
          {weekDays.map((day) => (
            <div key={day.toString()} className="flex-1 p-2 text-center border-r last:border-r-0">
              <div className="font-semibold">{format(day, 'EEEE', { locale: es })}</div>
              <div>{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        {/* Aquí irían las citas programadas */}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Agregar Cita
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Nueva Cita</h3>
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              value={newAppointment.patient}
              onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
              placeholder="Nombre del paciente"
              className="block w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddAppointment}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}