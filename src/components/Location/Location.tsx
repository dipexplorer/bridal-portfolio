"use client";

import { MapPin, Navigation, Clock, Phone } from "lucide-react";

export default function Location() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("LUXE Bridal Studio, Nariman Point, Mumbai, Maharashtra, India")}`;

  return (
    <section id="location" className="py-24 px-6 bg-charcoal">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.45em] text-[#E52E2D] mb-2 block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Find Us
            </span>
            <h2
              className="text-4xl md:text-5xl uppercase text-[#ffffff] mb-8"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              The Studio
            </h2>

            <div className="flex flex-col gap-8 mt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl mt-1 bg-[#111111]" style={{ border: "1px solid rgba(166,75,42,0.15)" }}>
                  <MapPin size={18} color="#E52E2D" />
                </div>
                <div>
                  <h4
                    className="text-xs tracking-widest text-[#E52E2D] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Address
                  </h4>
                  <p
                    className="text-sm text-[#ffffff]/75 leading-relaxed mt-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    14B Maker Chambers,<br />
                    Near Trident Hotel,<br />
                    Mumbai, Maharashtra 400021
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl mt-1 bg-[#111111]" style={{ border: "1px solid rgba(166,75,42,0.15)" }}>
                  <Clock size={18} color="#E52E2D" />
                </div>
                <div>
                  <h4
                    className="text-xs tracking-widest text-[#E52E2D] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Studio Hours
                  </h4>
                  <p
                    className="text-sm text-[#ffffff]/75 mt-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    By Appointment Only<br />
                    7 Days / Week · 9am – 9pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl mt-1 bg-[#111111]" style={{ border: "1px solid rgba(166,75,42,0.15)" }}>
                  <Phone size={18} color="#E52E2D" />
                </div>
                <div>
                  <h4
                    className="text-xs tracking-widest text-[#E52E2D] uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Contact
                  </h4>
                  <a
                    href="tel:+919833322110"
                    className="text-sm text-[#ffffff]/75 mt-2 block hover:text-[#E52E2D] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    +91 98333 22110
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all duration-300 hover:scale-105 interactive-hover"
              style={{
                background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 100%)",
                color: "#111111",
                fontFamily: "var(--font-inter)",
              }}
              data-cursor-text="Navigate"
            >
              <Navigation size={12} className="rotate-45" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Right Column: Premium Light Map */}
        <div
          className="lg:col-span-7 h-[350px] lg:h-auto rounded-3xl overflow-hidden relative shadow-md bg-[#111111]"
          style={{ border: "1px solid rgba(166,75,42,0.15)" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30165.73359676755!2d72.81232811651813!3d19.07008130835158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f8d27b%3A0x437996b49a236a78!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(10%) contrast(100%)", minHeight: "350px" }}
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
