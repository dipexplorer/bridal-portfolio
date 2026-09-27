"use client";

import { MapPin, Navigation, Clock, Phone } from "lucide-react";

export default function Location() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("LUXE Bridal Studio, Nariman Point, Mumbai, Maharashtra, India")}`;

  return (
    <section id="location" className="py-20 md:py-32 px-5 md:px-12 bg-[#060606] border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">

        {/* Left Column: Address & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div>
            <span
              className="text-[9px] uppercase tracking-[0.45em] text-[#E52E2D] mb-3 block font-mono font-bold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Find Us // Studio Hubs
            </span>
            <h2
              className="text-4xl sm:text-5xl uppercase text-white mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              The Studio
            </h2>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs mt-1 bg-white/[0.03] border border-white/10 shrink-0">
                  <MapPin size={18} className="text-[#E52E2D]" />
                </div>
                <div>
                  <h4
                    className="text-[10px] tracking-[0.25em] text-[#E52E2D] uppercase font-mono font-bold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Address
                  </h4>
                  <p
                    className="text-xs sm:text-sm text-white/75 leading-relaxed mt-1.5 font-light"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    14B Maker Chambers, Near Trident Hotel,<br />
                    Nariman Point, Mumbai, Maharashtra 400021
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs mt-1 bg-white/[0.03] border border-white/10 shrink-0">
                  <Clock size={18} className="text-[#E52E2D]" />
                </div>
                <div>
                  <h4
                    className="text-[10px] tracking-[0.25em] text-[#E52E2D] uppercase font-mono font-bold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Studio Hours
                  </h4>
                  <p
                    className="text-xs sm:text-sm text-white/75 mt-1.5 font-light"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    By Appointment Only<br />
                    7 Days / Week · 9:00 AM – 9:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs mt-1 bg-white/[0.03] border border-white/10 shrink-0">
                  <Phone size={18} className="text-[#E52E2D]" />
                </div>
                <div>
                  <h4
                    className="text-[10px] tracking-[0.25em] text-[#E52E2D] uppercase font-mono font-bold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Direct Concierge
                  </h4>
                  <a
                    href="tel:+919833322110"
                    className="text-xs sm:text-sm text-white/80 mt-1.5 block hover:text-[#E52E2D] transition-colors font-mono"
                  >
                    +91 98333 22110
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xs font-mono font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-300 bg-[#E52E2D] text-white hover:bg-transparent border border-[#E52E2D] min-h-[48px] shadow-[0_0_20px_rgba(229,46,45,0.3)]"
            >
              <Navigation size={14} className="rotate-45" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Right Column: Mobile-Adapted Interactive Map */}
        <div
          className="lg:col-span-7 h-[300px] sm:h-[380px] lg:h-auto rounded-xs overflow-hidden relative border border-white/10 bg-[#0f0f0f]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30165.73359676755!2d72.81232811651813!3d19.07008130835158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f8d27b%3A0x437996b49a236a78!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(100%)", minHeight: "300px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="LUXE Bridal Studio Location Map"
          />
        </div>
      </div>
    </section>
  );
}
