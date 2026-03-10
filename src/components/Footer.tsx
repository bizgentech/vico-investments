import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#080D14] border-t border-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="font-display text-3xl tracking-wider gold">VICO</div>
              <div className="font-condensed text-xs tracking-[0.3em] text-gray-600 uppercase leading-tight">
                <div>INVESTMENTS</div>
                <div style={{color: 'var(--gold)', opacity: 0.5}}>AUTO GROUP</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Miami&apos;s trusted used car dealer. BBB Accredited, honest pricing, quality vehicles.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 border border-[#222] flex items-center justify-center text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-9 h-9 border border-[#222] flex items-center justify-center text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
                <Instagram size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-condensed font-semibold text-white tracking-widest uppercase text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Browse Inventory', 'Schedule Visit', 'About Us', 'Financing', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-600 font-condensed text-sm hover:text-[var(--gold)] transition-colors tracking-wide">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-condensed font-semibold text-white tracking-widest uppercase text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: Phone, text: '(305) 444-4444' },
                { icon: Mail, text: 'info@vicoinvestments.com' },
                { icon: MapPin, text: 'Miami, Florida' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600 font-condensed text-sm">
                  <item.icon size={14} className="gold shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-[#161B22] border border-[#1C2128]">
              <div className="font-condensed text-xs tracking-widest uppercase text-gray-600 mb-1">Hours</div>
              <div className="font-condensed text-sm text-gray-400">Mon – Sat: 9:00 AM – 7:00 PM</div>
              <div className="font-condensed text-sm text-gray-600">Sunday: Closed</div>
            </div>
          </div>
        </div>

        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-gray-700 font-condensed text-xs tracking-wide">
          <span>© 2024 Vico Investments Auto Group · All rights reserved</span>
          <span>BBB Accredited Business · Miami, FL</span>
        </div>
      </div>
    </footer>
  )
}
