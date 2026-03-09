const testimonials = [
  {
    name: 'Carlos M.',
    location: 'Miami, FL',
    text: 'Vico made buying my first car incredibly easy. No pressure, honest pricing, and they found me a great financing option. I drove off in my dream car the same day!',
    rating: 5,
    car: '2021 Toyota Camry'
  },
  {
    name: 'Maria G.',
    location: 'Hialeah, FL',
    text: 'Best car buying experience I have ever had. The team was professional, transparent about the vehicle history, and the price was better than any other dealer in Miami.',
    rating: 5,
    car: '2020 Honda CR-V'
  },
  {
    name: 'Roberto V.',
    location: 'Doral, FL',
    text: 'I was nervous about buying used, but Vico Investments gave me full CARFAX and even let me take it to my mechanic. That level of trust sealed the deal for me.',
    rating: 5,
    car: '2019 BMW 3 Series'
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="section-divider w-16" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase gold">Testimonials</span>
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white">WHAT CLIENTS SAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-[#111] border border-[#1E1E1E] relative">
              <div className="text-4xl gold font-display mb-4 opacity-30">&quot;</div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-[var(--gold)] text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">{t.text}</p>
              <div className="border-t border-[#222] pt-4">
                <div className="font-condensed font-semibold text-white">{t.name}</div>
                <div className="font-condensed text-xs text-gray-600 tracking-wide">{t.location} · {t.car}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
