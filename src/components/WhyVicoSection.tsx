import { ShieldCheck, Handshake, Star, Car } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Clean Titles Only',
    desc: 'Every vehicle comes with a verified clean title and full CARFAX history report.'
  },
  {
    icon: Handshake,
    title: 'Honest Pricing',
    desc: 'No hidden fees, no surprise charges. The price you see is the price you pay.'
  },
  {
    icon: Star,
    title: 'BBB Accredited',
    desc: 'Proud member of the Better Business Bureau with an outstanding reputation in Miami.'
  },
  {
    icon: Car,
    title: 'Financing Available',
    desc: 'We work with multiple lenders to get you the best rate regardless of credit history.'
  },
]

export default function WhyVicoSection() {
  return (
    <section id="why-vico" className="py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="section-divider w-16" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase gold">Why Choose Us</span>
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white">THE VICO DIFFERENCE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-[#21262D] bg-[#161B22] hover:border-[var(--gold)] hover:bg-[#161B22] transition-all duration-300 group">
              <div className="mb-5">
                <f.icon size={32} className="gold transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-condensed font-bold text-white text-lg mb-3 tracking-wide">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 relative overflow-hidden p-10 flex flex-col md:flex-row items-center justify-between gap-6"
             style={{ background: 'linear-gradient(135deg, #161B22, #1A1A0F)' }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />
          <div className="relative">
            <h3 className="font-display text-2xl md:text-4xl text-white mb-1">READY TO FIND YOUR CAR?</h3>
            <p className="text-gray-400 font-condensed tracking-wide">Visit us at our Miami location or schedule a virtual tour.</p>
          </div>
          <a href="#appointment" className="relative w-full md:w-auto text-center shrink-0 bg-gold text-black font-condensed font-bold tracking-widest uppercase px-10 py-4 text-lg hover:bg-[#E8C876] transition-colors whitespace-nowrap">
            Schedule a Visit →
          </a>
        </div>
      </div>
    </section>
  )
}
