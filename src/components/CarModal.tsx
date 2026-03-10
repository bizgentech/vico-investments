'use client'
import { useEffect } from 'react'
import { X, Gauge, Cog, Fuel, Calendar, Palette, Star, Phone, MessageSquare } from 'lucide-react'

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

interface CarModalProps {
  car: Car | null
  onClose: () => void
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
      <circle cx="7.5" cy="17.5" r="2.5"/>
      <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  )
}

export default function CarModal({ car, onClose }: CarModalProps) {
  useEffect(() => {
    if (car) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [car])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!car) return null

  const images = JSON.parse(car.images || '[]')
  const formatPrice = (p: number) => `$${p.toLocaleString()}`
  const formatMileage = (m: number) => `${m.toLocaleString()} mi`

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year.toString() },
    { icon: Gauge, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: Cog, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Palette, label: 'Color', value: car.color },
    { icon: CarIcon, label: 'Make', value: car.make },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease' }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#30363D] shadow-2xl"
          style={{
            background: '#161B22',
            animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1)'
          }}
        >
          {/* Image header */}
          <div className="relative h-60 rounded-t-2xl overflow-hidden">
            {images[0] ? (
              <img src={images[0]} alt={car.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#21262D] flex items-center justify-center text-gray-600 font-condensed text-sm tracking-widest uppercase">No Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X size={18} />
            </button>

            {car.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-gold text-black font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                <Star size={11} />
                Featured
              </div>
            )}

            {/* Price badge */}
            <div className="absolute bottom-4 left-5">
              <div className="font-display text-4xl" style={{ color: 'var(--gold)' }}>{formatPrice(car.price)}</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h2 className="font-display text-3xl text-white mb-1 tracking-wide">{car.title}</h2>
            <p className="font-condensed text-sm text-gray-500 tracking-widest uppercase mb-6">{car.make} · {car.model} · {car.year}</p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {specs.map((spec, i) => (
                <div key={i} className="bg-[#21262D] rounded-xl p-3 border border-[#30363D]">
                  <div className="flex items-center gap-2 mb-1">
                    <spec.icon size={13} className="text-gray-500" />
                    <span className="font-condensed text-xs tracking-widest uppercase text-gray-600">{spec.label}</span>
                  </div>
                  <div className="font-condensed font-semibold text-white text-sm">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {car.description && (
              <div className="mb-6 p-4 bg-[#21262D] rounded-xl border border-[#30363D]">
                <p className="text-gray-300 text-sm leading-relaxed">{car.description}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#appointment"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 bg-gold text-black font-condensed font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#E8C876] transition-colors text-sm"
              >
                <MessageSquare size={16} />
                I Want This Car
              </a>
              <a
                href="tel:+13054444444"
                className="flex items-center justify-center gap-2 border border-[#30363D] text-gray-300 font-condensed tracking-widest uppercase py-4 px-6 rounded-xl hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors text-sm"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </>
  )
}
