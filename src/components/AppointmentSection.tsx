'use client'
import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'

export default function AppointmentSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.date) return
    setLoading(true)
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSubmitted(true)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']

  return (
    <section id="appointment" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="section-divider w-16" />
              <span className="font-condensed text-xs tracking-[0.4em] uppercase gold">Schedule</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6">LET&apos;S MEET!</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Ready to find your next vehicle? Schedule a no-pressure visit to our Miami showroom. We&apos;ll have the cars you&apos;re interested in ready for a test drive.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Calendar, text: 'Monday – Saturday: 9:00 AM – 7:00 PM' },
                { icon: Clock, text: 'Appointments available same-day' },
                { icon: Phone, text: '(305) 444-4444' },
                { icon: Mail, text: 'info@vicoinvestments.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400 font-condensed text-sm tracking-wide">
                  <item.icon size={16} className="gold shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="h-48 bg-[#141414] border border-[#222] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="font-condensed text-sm tracking-widest uppercase mb-1">Vico Investments Auto Group</div>
                <div className="font-condensed text-xs text-gray-700">Miami, Florida</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#111] border border-[#222] p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="gold mb-4" />
                <h3 className="font-display text-3xl text-white mb-2">APPOINTMENT REQUESTED!</h3>
                <p className="text-gray-400 font-condensed">We&apos;ll call you within 1 hour to confirm. See you soon!</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-white mb-6 tracking-wide">BOOK A VISIT</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-3">
                    <User size={16} className="text-gray-600" />
                    <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="bg-transparent text-white font-condensed text-sm tracking-wide flex-1 outline-none placeholder-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-3">
                      <Mail size={16} className="text-gray-600" />
                      <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="bg-transparent text-white font-condensed text-sm flex-1 outline-none placeholder-gray-600" />
                    </div>
                    <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-3">
                      <Phone size={16} className="text-gray-600" />
                      <input type="tel" placeholder="Phone *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="bg-transparent text-white font-condensed text-sm flex-1 outline-none placeholder-gray-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-3">
                      <Calendar size={16} className="text-gray-600" />
                      <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                        className="bg-transparent text-white font-condensed text-sm flex-1 outline-none" />
                    </div>
                    <select value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] text-white font-condensed text-sm px-3 py-3 outline-none">
                      <option value="">Select Time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex items-start gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-3">
                    <MessageSquare size={16} className="text-gray-600 mt-0.5" />
                    <textarea placeholder="What cars are you interested in? (optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={3}
                      className="bg-transparent text-white font-condensed text-sm flex-1 outline-none resize-none placeholder-gray-600" />
                  </div>
                  <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.phone || !form.date}
                    className="w-full bg-gold text-black font-condensed font-bold tracking-widest uppercase py-4 text-lg hover:bg-[#E8C876] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Sending...' : 'Schedule My Visit →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
