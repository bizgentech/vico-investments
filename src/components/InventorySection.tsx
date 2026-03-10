'use client'
import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal, Gauge, Fuel, Cog } from 'lucide-react'
import CarModal from './CarModal'

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
  description?: string
  images: string
  featured: boolean
}

export default function InventorySection() {
  const [cars, setCars] = useState<Car[]>([])
  const [filtered, setFiltered] = useState<Car[]>([])
  const [search, setSearch] = useState('')
  const [makeFilter, setMakeFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  useEffect(() => {
    fetch('/api/cars')
      .then(r => r.json())
      .then(data => {
        setCars(data)
        setFiltered(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let result = cars
    if (search) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.make.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (makeFilter) result = result.filter(c => c.make === makeFilter)
    if (priceFilter) result = result.filter(c => c.price <= parseInt(priceFilter))
    setFiltered(result)
  }, [search, makeFilter, priceFilter, cars])

  const makes = [...new Set(cars.map(c => c.make))].sort()

  const formatPrice = (p: number) => `$${p.toLocaleString()}`
  const formatMileage = (m: number) => `${m.toLocaleString()} mi`

  return (
    <>
      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />

      <section id="inventory" className="py-24 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="section-divider flex-1 max-w-20" />
              <span className="font-condensed text-xs tracking-[0.4em] uppercase gold">Our Collection</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white">BROWSE INVENTORY</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10 p-4 bg-[#161B22] border border-[#30363D] rounded-xl">
            <div className="flex-1 min-w-48 flex items-center gap-2 bg-[#21262D] px-3 py-2 border border-[#30363D] rounded-lg">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search cars..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-white font-condensed text-sm tracking-wide outline-none flex-1 placeholder-gray-600"
              />
            </div>

            <select
              value={makeFilter}
              onChange={e => setMakeFilter(e.target.value)}
              className="bg-[#21262D] text-white border border-[#30363D] px-3 py-2 font-condensed text-sm tracking-wide outline-none rounded-lg"
            >
              <option value="">All Makes</option>
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <select
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              className="bg-[#21262D] text-white border border-[#30363D] px-3 py-2 font-condensed text-sm tracking-wide outline-none rounded-lg"
            >
              <option value="">Any Price</option>
              <option value="25000">Under $25K</option>
              <option value="35000">Under $35K</option>
              <option value="50000">Under $50K</option>
            </select>

            <div className="flex items-center gap-2 text-gray-500 font-condensed text-sm">
              <SlidersHorizontal size={16} />
              <span>{filtered.length} vehicles</span>
            </div>
          </div>

          {/* Cars grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#161B22] h-80 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(car => {
                const images = JSON.parse(car.images || '[]')
                return (
                  <div
                    key={car.id}
                    className="car-card bg-[#161B22] border border-[#30363D] overflow-hidden rounded-xl group cursor-pointer"
                    onClick={() => setSelectedCar(car)}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-[#21262D] rounded-xl">
                      {images[0] ? (
                        <img src={images[0]} alt={car.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-700 font-condensed text-sm">No Image</div>
                      )}
                      {car.featured && (
                        <div className="absolute top-3 left-3 bg-gold text-black font-condensed font-semibold text-xs tracking-widest uppercase px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161B22] to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-condensed font-semibold text-white text-lg leading-tight">{car.title}</h3>
                          <p className="font-condensed text-sm text-gray-500 tracking-wide">{car.color}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-2xl" style={{ color: 'var(--gold)' }}>{formatPrice(car.price)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 font-condensed tracking-wide mb-4">
                        <span className="flex items-center gap-1"><Gauge size={12} /> {formatMileage(car.mileage)}</span>
                        <span className="flex items-center gap-1"><Cog size={12} /> {car.transmission}</span>
                        <span className="flex items-center gap-1"><Fuel size={12} /> {car.fuelType}</span>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedCar(car); }}
                        className="w-full text-center border border-[var(--gold)] text-[var(--gold)] font-condensed tracking-widest uppercase text-sm py-2.5 hover:bg-gold hover:text-black transition-all duration-300 rounded-lg"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {filtered.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-600">
              <p className="font-display text-3xl mb-2">No vehicles found</p>
              <p className="font-condensed text-sm tracking-wide">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
