'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Star, LogOut } from 'lucide-react'

interface Car {
  id: number
  title: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: string
  fuelType: string
  images: string
  available: boolean
  featured: boolean
}

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [tab, setTab] = useState<'cars' | 'appointments'>('cars')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCar, setNewCar] = useState({
    title: '', make: '', model: '', year: 2024, price: 0,
    mileage: 0, color: '', transmission: 'Automatic', fuelType: 'Gasoline',
    description: '', images: '', featured: false
  })

  const adminKey = password

  const login = () => {
    if (password === 'vico2024admin') setAuthenticated(true)
  }

  const fetchCars = async () => {
    const res = await fetch('/api/cars')
    setCars(await res.json())
  }

  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments', {
      headers: { 'x-admin-key': adminKey }
    })
    setAppointments(await res.json())
  }

  useEffect(() => {
    if (authenticated) {
      fetchCars()
      fetchAppointments()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  const deleteCar = async (id: number) => {
    if (!confirm('Remove this car from inventory?')) return
    await fetch(`/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey }
    })
    fetchCars()
  }

  const addCar = async () => {
    const imageArr = newCar.images ? [newCar.images] : []
    await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ ...newCar, images: JSON.stringify(imageArr) })
    })
    setShowAddForm(false)
    setNewCar({ title: '', make: '', model: '', year: 2024, price: 0, mileage: 0, color: '', transmission: 'Automatic', fuelType: 'Gasoline', description: '', images: '', featured: false })
    fetchCars()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="bg-[#161B22] border border-[#222] p-10 w-full max-w-md">
          <div className="font-display text-3xl gold mb-2">VICO ADMIN</div>
          <p className="text-gray-500 font-condensed text-sm mb-8 tracking-wide">Inventory Management Portal</p>
          <input type="password" placeholder="Admin Password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full bg-[#1C2128] border border-[#333] text-white font-condensed px-4 py-3 outline-none mb-4 tracking-wide" />
          <button onClick={login} className="w-full bg-gold text-black font-condensed font-bold tracking-widest uppercase py-3 hover:bg-[#E8C876] transition-colors">
            LOGIN →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="bg-[#161B22] border-b border-[#222] px-6 py-4 flex items-center justify-between">
        <div className="font-display text-2xl gold">VICO ADMIN</div>
        <div className="flex items-center gap-4">
          <button onClick={() => setTab('cars')} className={`font-condensed text-sm tracking-widest uppercase px-4 py-2 transition-colors ${tab === 'cars' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}>Cars ({cars.length})</button>
          <button onClick={() => setTab('appointments')} className={`font-condensed text-sm tracking-widest uppercase px-4 py-2 transition-colors ${tab === 'appointments' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}>Appointments ({appointments.length})</button>
          <button onClick={() => setAuthenticated(false)} className="text-gray-600 hover:text-white transition-colors p-2"><LogOut size={18} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'cars' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-white">INVENTORY</h2>
              <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-gold text-black font-condensed font-semibold tracking-widest uppercase px-6 py-3 hover:bg-[#E8C876] transition-colors">
                <Plus size={18} />
                Add Car
              </button>
            </div>

            {showAddForm && (
              <div className="bg-[#161B22] border border-[#222] p-6 mb-6">
                <h3 className="font-display text-xl text-white mb-4">ADD NEW VEHICLE</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'title', label: 'Title (e.g. 2022 Toyota Camry SE)', full: true },
                    { key: 'make', label: 'Make' },
                    { key: 'model', label: 'Model' },
                    { key: 'color', label: 'Color' },
                    { key: 'images', label: 'Image URL' },
                    { key: 'description', label: 'Description', full: true },
                  ].map(field => (
                    <div key={field.key} className={field.full ? 'col-span-2 md:col-span-3' : ''}>
                      <label className="block font-condensed text-xs tracking-widest uppercase text-gray-500 mb-1">{field.label}</label>
                      <input type="text" value={(newCar as Record<string, unknown>)[field.key] as string} onChange={e => setNewCar({...newCar, [field.key]: e.target.value})}
                        className="w-full bg-[#1C2128] border border-[#333] text-white font-condensed text-sm px-3 py-2.5 outline-none" />
                    </div>
                  ))}
                  {[
                    { key: 'year', label: 'Year' },
                    { key: 'price', label: 'Price ($)' },
                    { key: 'mileage', label: 'Mileage' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block font-condensed text-xs tracking-widest uppercase text-gray-500 mb-1">{field.label}</label>
                      <input type="number" value={(newCar as Record<string, unknown>)[field.key] as number} onChange={e => setNewCar({...newCar, [field.key]: parseInt(e.target.value)})}
                        className="w-full bg-[#1C2128] border border-[#333] text-white font-condensed text-sm px-3 py-2.5 outline-none" />
                    </div>
                  ))}
                  <div>
                    <label className="block font-condensed text-xs tracking-widest uppercase text-gray-500 mb-1">Transmission</label>
                    <select value={newCar.transmission} onChange={e => setNewCar({...newCar, transmission: e.target.value})}
                      className="w-full bg-[#1C2128] border border-[#333] text-white font-condensed text-sm px-3 py-2.5 outline-none">
                      <option>Automatic</option>
                      <option>Manual</option>
                      <option>CVT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-condensed text-xs tracking-widest uppercase text-gray-500 mb-1">Fuel Type</label>
                    <select value={newCar.fuelType} onChange={e => setNewCar({...newCar, fuelType: e.target.value})}
                      className="w-full bg-[#1C2128] border border-[#333] text-white font-condensed text-sm px-3 py-2.5 outline-none">
                      <option>Gasoline</option>
                      <option>Hybrid</option>
                      <option>Electric</option>
                      <option>Diesel</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="featured" checked={newCar.featured} onChange={e => setNewCar({...newCar, featured: e.target.checked})} className="accent-[var(--gold)]" />
                    <label htmlFor="featured" className="font-condensed text-sm text-gray-400 tracking-wide">Mark as Featured</label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={addCar} className="bg-gold text-black font-condensed font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#E8C876] transition-colors">
                    Save Vehicle
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="border border-[#333] text-gray-400 font-condensed tracking-widest uppercase px-8 py-3 hover:border-white hover:text-white transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {cars.map(car => {
                const images = JSON.parse(car.images || '[]')
                return (
                  <div key={car.id} className="bg-[#161B22] border border-[#21262D] p-4 flex items-center gap-4">
                    <div className="w-24 h-16 bg-[#1C2128] overflow-hidden shrink-0">
                      {images[0] && <img src={images[0]} alt={car.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-condensed font-semibold text-white">{car.title}</div>
                      <div className="font-condensed text-sm text-gray-500">{car.color} · {car.mileage.toLocaleString()} mi</div>
                    </div>
                    <div className="font-display text-xl gold">${car.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      {car.featured && <Star size={16} className="gold fill-current" />}
                      <span className={`font-condensed text-xs tracking-widest uppercase px-2 py-1 ${car.available ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {car.available ? 'Active' : 'Removed'}
                      </span>
                      {car.available && (
                        <button onClick={() => deleteCar(car.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {tab === 'appointments' && (
          <>
            <h2 className="font-display text-3xl text-white mb-6">APPOINTMENTS</h2>
            <div className="grid gap-4">
              {appointments.map(apt => (
                <div key={apt.id} className="bg-[#161B22] border border-[#21262D] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-condensed font-semibold text-white text-lg">{apt.name}</div>
                      <div className="font-condensed text-sm text-gray-500">{apt.email} · {apt.phone}</div>
                      {apt.message && <p className="text-gray-400 text-sm mt-2">{apt.message}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="gold font-condensed font-semibold">{apt.date} at {apt.time}</div>
                      <span className="font-condensed text-xs tracking-widest uppercase text-yellow-500 bg-yellow-900/20 px-2 py-0.5">{apt.status}</span>
                    </div>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && (
                <div className="text-center py-12 text-gray-700 font-condensed tracking-wide">No appointments yet</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
