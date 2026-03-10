'use client'
import { useEffect, useState } from 'react'
import { ChevronDown, MapPin, Shield } from 'lucide-react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=90"
          alt="Hero car"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080D14] via-[#080D14]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D14] via-transparent to-transparent" />
      </div>

      {/* Blue-to-gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 z-10"
        style={{ background: 'linear-gradient(180deg, transparent, #4A90E2, var(--gold), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          {/* BBB badge */}
          <div className={`inline-flex items-center gap-2 border border-[#333] bg-[#161B22]/80 px-3 py-1.5 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Shield size={14} className="gold" />
            <span className="font-condensed text-xs tracking-widest uppercase text-gray-400">BBB Accredited Business · Miami, FL</span>
          </div>

          {/* Main headline */}
          <h1 className={`font-display leading-none mb-4 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="block text-7xl md:text-9xl text-white">YOUR NEXT</span>
            <span className="block text-7xl md:text-9xl" style={{ color: 'var(--gold)' }}>DRIVE STARTS</span>
            <span className="block text-7xl md:text-9xl text-white">HERE</span>
          </h1>

          <p className={`font-barlow text-lg text-gray-300 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Premium pre-owned vehicles, honest pricing, and a buying experience that respects your time. Welcome to <strong className="text-white">Vico Investments Auto Group</strong>.
          </p>

          {/* Stats row */}
          <div className={`flex flex-wrap gap-6 mb-10 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { num: '200+', label: 'Cars Sold' },
              { num: '4.9★', label: 'Customer Rating' },
              { num: '10+', label: 'Years in Business' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl" style={{ color: 'var(--gold)' }}>{stat.num}</div>
                <div className="font-condensed text-xs tracking-widest uppercase text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#appointment"
               className="group inline-flex items-center justify-center gap-3 bg-gold text-black font-condensed font-bold tracking-widest uppercase px-8 py-4 text-lg hover:bg-[#E8C876] transition-all duration-300">
              <span>Let&apos;s Meet!</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#inventory"
               className="inline-flex items-center justify-center gap-3 border border-[#444] text-white font-condensed tracking-widest uppercase px-8 py-4 text-lg hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300">
              Browse Inventory
            </a>
          </div>

          {/* Location */}
          <div className={`flex items-center gap-2 mt-8 text-gray-500 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <MapPin size={14} className="gold" />
            <span className="font-condensed text-sm tracking-wide">Miami, Florida · Mon–Sat 9am–7pm</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#inventory" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={24} className="text-gray-500" />
      </a>
    </section>
  )
}
