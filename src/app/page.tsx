import HeroSection from '@/components/HeroSection'
import InventorySection from '@/components/InventorySection'
import WhyVicoSection from '@/components/WhyVicoSection'
import AppointmentSection from '@/components/AppointmentSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117]">
      <Navbar />
      <HeroSection />
      <InventorySection />
      <WhyVicoSection />
      <TestimonialsSection />
      <AppointmentSection />
      <Footer />
    </main>
  )
}
