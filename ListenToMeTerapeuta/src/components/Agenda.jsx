import { useState } from 'react'
import { ChevronLeft, ChevronRight, Users, X } from 'lucide-react'

const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', title: '', attendees: 1 })
  const [scheduleItems, setScheduleItems] = useState([
    { id: 1, title: 'Rapat con Bruce Wayne', time: '09:00 - 10:00', attendees: 2, date: new Date() },
    { id: 2, title: 'Test en Dusun Wekuada', time: '13:00 - 15:00', attendees: 2, date: new Date() },
    { id: 3, title: 'Urus SIM en samsat Klayatan', time: '11:00 - 12:00', attendees: 1, date: new Date() },
    { id: 4, title: 'Urus SIM en samsat Klayatan', time: '12:00 - 16:00', attendees: 1, date: new Date() },
  ])

  const getWeekDates = (date) => {
    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(date)
      day.setDate(date.getDate() - date.getDay() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentDate)

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + direction * 7)
    setCurrentDate(newDate)
  }

  const handleAddAppointment = () => {
    const id = scheduleItems.length + 1
    const newItem = { 
      ...newAppointment, 
      id, 
      date: selectedDate // Asegurar que la fecha de la cita sea la fecha seleccionada
    }
    setScheduleItems([...scheduleItems, newItem])
    setNewAppointment({ date: '', time: '', title: '', attendees: 1 })
    setIsModalOpen(false)
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const selectDate = (date) => {
    setSelectedDate(date)
    setNewAppointment(prev => ({ ...prev, date: formatDate(date) }))
  }

  const hasAppointments = (date) => {
    return scheduleItems.some(item => isSameDay(item.date, date))
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeWeek(-1)} className="p-2">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex space-x-2">
            {weekDates.map((date, index) => (
              <button 
                key={index} 
                onClick={() => selectDate(date)}
                className={`flex flex-col items-center ${
                  isSameDay(date, selectedDate) ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xs">{weekDays[index]}</span>
                <span className={`text-lg font-semibold ${
                  isSameDay(date, selectedDate) ? 'bg-blue-600 text-white' : ''
                } rounded-full w-8 h-8 flex items-center justify-center ${
                  hasAppointments(date) ? 'border-2 border-blue-400' : ''
                }`}>
                  {date.getDate()}
                </span>
              </button>
            ))}
          </div>
          <button onClick={() => changeWeek(1)} className="p-2">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Agenda del día {selectedDate.toLocaleDateString()}
        </h2>

        <div className="space-y-4">
          {scheduleItems
            .filter(item => isSameDay(item.date, selectedDate))
            .map((item) => (
              <div key={item.id} className="bg-blue-100 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800">{item.title}</h3>
                <p className="text-blue-600 text-sm">{item.time}</p>
                <div className="flex items-center mt-2">
                  <Users className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-blue-600 text-sm">{item.attendees}</span>
                </div>
              </div>
            ))}
        </div>

        {scheduleItems.filter(item => isSameDay(item.date, selectedDate)).length === 0 && (
          <p className="text-gray-500 text-center mt-4">No hay citas para este día.</p>
        )}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Agendar paciente
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Agregar cita</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
              placeholder="Hora (ej: 09:00 - 10:00)"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={newAppointment.title}
              onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
              placeholder="Título de la cita"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="number"
              value={newAppointment.attendees}
              onChange={(e) => setNewAppointment({...newAppointment, attendees: parseInt(e.target.value)})}
              placeholder="Número de asistentes"
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleAddAppointment}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Agregar cita
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
