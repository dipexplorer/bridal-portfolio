'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Calendar, Phone } from 'lucide-react';

// ─── Async / heavy components ──────────────────────────────────────────────────
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import BeforeAfter from '@/components/BeforeAfter/BeforeAfter';
import About from '@/components/About/About';
import Gallery from '@/components/Gallery/Gallery';
import Services from '@/components/Services/Services';
import StorySection from '@/components/Story/StorySection';
import Reviews from '@/components/Reviews/Reviews';
import Location from '@/components/Location/Location';
import BookingModal from '@/components/Booking/BookingModal';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenBooking = (serviceName: string = '') => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* Loading screen overlay */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-[#060606] text-white selection:bg-[#E52E2D]/30 selection:text-white pb-16 md:pb-0">
          {/* Navigation */}
          <Navigation onBookClick={() => handleOpenBooking()} />

          {/* ── Page Sections ── */}
          <main>
            {/* 1. Hero */}
            <Hero onBookClick={() => handleOpenBooking()} />

            {/* 2. Before & After Interactive */}
            <BeforeAfter />

            {/* 3. About / Artist */}
            <About />

            {/* 4. Portfolio Gallery */}
            <Gallery />

            {/* 5. Story */}
            <StorySection />

            {/* 6. Services & Pricing */}
            <Services onBookClick={handleOpenBooking} />

            {/* 7. Client Reviews */}
            <Reviews onBookClick={() => handleOpenBooking()} />

            {/* 8. Studio Location */}
            <Location />
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile Sticky Bottom Conversion Bar (md:hidden) */}
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#060606]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 md:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.9)]">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#E52E2D] font-bold">
                Luxe Studio
              </span>
              <span className="font-mono text-[10px] text-white/90 font-medium">
                Bespoke Session
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+919833322110"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center shrink-0"
                aria-label="Call Studio"
              >
                <Phone size={14} className="text-[#E52E2D]" />
              </a>

              <button
                onClick={() => handleOpenBooking()}
                className="px-5 py-2.5 rounded-full bg-[#E52E2D] text-white font-mono text-[9px] uppercase tracking-[0.25em] font-bold shadow-[0_0_15px_rgba(229,46,45,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar size={12} />
                Reserve
              </button>
            </div>
          </div>

          {/* Floating WhatsApp button (Positioned above sticky bar on mobile: bottom-20) */}
          <a
            href="https://wa.me/919833322110"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #E52E2D 0%, #ff4d4d 100%)',
              boxShadow: '0 0 25px rgba(229,46,45,0.4)',
            }}
            title="WhatsApp Inquiry"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.854L.057 23.998l6.304-1.654A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.886a9.863 9.863 0 01-5.034-1.378l-.361-.214-3.741.981.999-3.648-.235-.374A9.863 9.863 0 012.114 12c0-5.45 4.436-9.886 9.886-9.886 5.45 0 9.886 4.436 9.886 9.886S17.45 21.886 12 21.886z"/>
            </svg>
          </a>

          {/* Booking Modal */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            defaultService={selectedService}
          />
        </div>
      )}
    </>
  );
}
