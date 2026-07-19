import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Brides } from '@/components/sections/Brides';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { Team } from '@/components/sections/Team';
import { Booking } from '@/components/sections/Booking';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent/20">
      <Header />
      <Hero />
      <Services />
      <Brides />
      <Gallery />
      <Testimonials />
      <Team />
      <Booking />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
