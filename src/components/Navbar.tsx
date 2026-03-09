'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="font-display text-3xl tracking-wider gold">VICO</div>
            <div className="font-condensed text-xs tracking-[0.3em] text-gray-400 uppercase leading-tight">
              <div>INVESTMENTS</div>
              <div style={{color: 'var(--gold)', opacity: 0.7}}>AUTO GROUP</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inventory" className="font-condensed text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors">Inventory</a>
            <a href="#why-vico" className="font-condensed text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#testimonials" className="font-condensed text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors">Reviews</a>
            <a href="#appointment" className="font-condensed text-sm tracking-widest uppercase text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+13054444444" className="flex items-center gap-2 text-sm font-condensed tracking-wider text-gray-300 hover:text-white transition-colors">
              <Phone size={15} className="gold" />
              (305) 444-4444
            </a>
            <a href="#appointment" className="bg-gold text-black font-condensed font-semibold tracking-widest uppercase text-sm px-5 py-2.5 hover:bg-[#E8C876] transition-colors">
              Let&apos;s Meet!
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#222] px-4 py-6 space-y-4">
          <a href="#inventory" onClick={() => setOpen(false)} className="block font-condensed tracking-widest uppercase text-gray-300 py-2">Inventory</a>
          <a href="#why-vico" onClick={() => setOpen(false)} className="block font-condensed tracking-widest uppercase text-gray-300 py-2">About</a>
          <a href="#testimonials" onClick={() => setOpen(false)} className="block font-condensed tracking-widest uppercase text-gray-300 py-2">Reviews</a>
          <a href="#appointment" onClick={() => setOpen(false)} className="block font-condensed tracking-widest uppercase text-gray-300 py-2">Contact</a>
          <a href="#appointment" onClick={() => setOpen(false)} className="block bg-gold text-black font-condensed font-semibold tracking-widest uppercase text-center py-3 mt-4">
            Let&apos;s Meet!
          </a>
        </div>
      )}
    </nav>
  )
}
