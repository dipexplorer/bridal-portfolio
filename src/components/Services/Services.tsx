'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Diamond, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceCard {
  id: string;
  category: 'bridal' | 'editorial' | 'redcarpet';
  tier: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  description: string;
  highlights: string[];
  features: string[];
  isSignature?: boolean;
}

const servicesData: ServiceCard[] = [
  {
    id: '1',
    category: 'editorial',
    tier: 'I',
    name: 'Editorial Couture',
    price: '₹25,000',
    priceNote: 'per session',
    tagline: 'For Photography & Runway',
    description: 'High-fashion runway and editorial styling designed for photography, campaigns, and print media.',
    highlights: ['On-Set Touch-ups (3 hrs)', 'Digital Look Consultation'],
    features: [
      'HD Base & Custom Facial Contouring',
      'Editorial Lash Architecture & Placement',
      'Couture Lip Sculpting & Lining',
      'High-Definition Camera-Ready Prep',
      'Full Digital Moodboard & Consultation',
    ],
  },
  {
    id: '2',
    category: 'bridal',
    tier: 'II',
    name: 'Couture Bride',
    price: '₹45,000',
    priceNote: 'per ceremony',
    tagline: 'The Signature Bridal Experience',
    description: 'The ultimate luxury signature bridal look — bespoke, water-resistant, and crafted for your most important day.',
    highlights: ['Full Pre-wedding Trial Included', 'Venue Assistance (6 hrs)'],
    features: [
      'Luxury Hydrating Skin Prep Treatment',
      'Airbrush HD Water-resistant Base',
      'Bridal Dupatta & Jewellery Draping',
      'Full Pre-wedding Trial & Consultation',
      'On-Venue Touch-up Assistance (6 hrs)',
      'Touch-up Kit for Evening Ceremony',
    ],
    isSignature: true,
  },
  {
    id: '3',
    category: 'redcarpet',
    tier: 'III',
    name: 'Red Carpet Glam',
    price: '₹18,000',
    priceNote: 'per event',
    tagline: 'Evening & Gala Styling',
    description: 'Glamour styling for high-end galas, cocktail soirées, award evenings, and private red-carpet appearances.',
    highlights: ['Premium Silk Faux Lashes', 'Hair Consultation Included'],
    features: [
      'Flawless Radiant Glam Base',
      'Custom Eye Look & Metallic Shimmer',
      'Couture Lip Tint & Plumping Finish',
      'Premium Silk Faux Lashes Included',
      'Complimentary Hair Styling Consultation',
    ],
  },
];

interface ServicesProps {
  onBookClick: (serviceName: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bridal' | 'editorial' | 'redcarpet'>('all');
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  return (
    <section className="relative bg-[#060606] py-24 md:py-32 lg:py-48 border-t border-white/5 overflow-hidden" id="services">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#E52E2D]/2 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/1 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-6 lg:gap-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#E52E2D] mb-3 flex items-center gap-3 font-bold">
              <span className="w-6 h-px bg-[#E52E2D]" />
              Rates &amp; Services // Bespoke Collections
            </span>
            <h2
              className="text-5xl sm:text-7xl lg:text-[5.5vw] text-white uppercase leading-[0.88] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Exclusive<br />
              <span className="italic font-light text-white/40 font-serif lowercase">Packages</span>
            </h2>
          </div>
          <p
            className="text-xs sm:text-sm md:text-base text-white/50 leading-relaxed max-w-md lg:text-right font-light"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Each session is a curated collaboration — bespoke to your facial architecture, uncompromising in craft and longevity.
          </p>
        </div>

        {/* Horizontally Scrollable Category Filter Pills on Mobile */}
        <div className="flex overflow-x-auto no-scrollbar gap-2.5 mb-10 lg:mb-16 pb-2 justify-start lg:justify-center whitespace-nowrap -mx-5 px-5 lg:mx-0 lg:px-0">
          {[
            { id: 'all', label: 'All Experiences' },
            { id: 'bridal', label: 'Bridal Couture' },
            { id: 'editorial', label: 'Editorial & Runway' },
            { id: 'redcarpet', label: 'Red Carpet & VIP' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-2.5 transition-all duration-300 rounded-full border cursor-pointer shrink-0 min-h-[44px] ${
                activeCategory === tab.id
                  ? 'bg-[#E52E2D] text-white border-[#E52E2D] shadow-[0_0_20px_rgba(229,46,45,0.35)]'
                  : 'bg-white/2 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Snap Carousel + Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 mb-10 lg:mb-20 -mx-5 px-5 md:mx-0 md:px-0">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <div key={service.id} className="w-[88vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink flex flex-col">
                <ServiceTile
                  service={service}
                  index={i}
                  onBook={() => onBookClick(service.name)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Carousel Slide Indicators */}
        <div className="flex justify-center gap-2 mb-12 md:hidden">
          {filteredServices.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-6 bg-[#E52E2D]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Concierge Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-10 bg-white/1.5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E52E2D]/10 border border-[#E52E2D]/30 flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck size={20} className="text-[#E52E2D]" />
            </div>
            <div>
              <h4 className="text-white font-serif text-lg md:text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Bespoke Concierge Guarantee
              </h4>
              <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-inter)' }}>
                * Pricing is indicative. Every booking includes a 1-on-1 skin prep consultation, custom lash architecture, and bespoke look design. Final quotes provided after initial consultation.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookClick('')}
            className="w-full sm:w-auto group font-mono text-[9px] uppercase tracking-[0.3em] text-white hover:text-white bg-[#E52E2D] md:bg-transparent border border-[#E52E2D] md:border-white/20 hover:border-[#E52E2D] px-6 py-4 transition-all duration-300 shrink-0 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            Custom Inquiry
            <ArrowRight size={14} className="group-hover:translate-x-1 text-white md:text-[#E52E2D] transition-transform duration-200" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

function ServiceTile({
  service,
  index,
  onBook,
}: {
  service: ServiceCard;
  index: number;
  onBook: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`group relative flex flex-col border transition-all duration-500 rounded-xs overflow-hidden h-full ${
        service.isSignature
          ? 'border-[#E52E2D]/50 bg-[#0d0d0d] shadow-[0_0_30px_rgba(229,46,45,0.15)] hover:border-[#E52E2D]'
          : 'border-white/10 bg-[#060606] hover:border-white/25 hover:bg-[#0e0e0e]'
      }`}
    >
      {/* Signature top accent bar & ribbon */}
      {service.isSignature && (
        <>
          <div className="h-1 w-full bg-linear-to-r from-[#E52E2D] via-[#ff5555] to-[#E52E2D]" />
          <div className="bg-[#E52E2D] text-white font-mono text-[8px] uppercase tracking-[0.25em] py-1.5 px-4 text-center font-bold flex items-center justify-center gap-1.5">
            <Sparkles size={10} />
            Flagship Bridal Experience
          </div>
        </>
      )}

      {/* Card Content Container */}
      <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1 relative">
        
        {/* Ghost Tier Numeral */}
        <div
          className="absolute top-6 right-6 text-5xl md:text-7xl leading-none font-serif select-none pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            color: service.isSignature ? '#E52E2D' : '#ffffff',
          }}
        >
          {service.tier}
        </div>

        {/* Tagline */}
        <span className={`font-mono text-[9px] uppercase tracking-[0.3em] mb-2 block ${
          service.isSignature ? 'text-[#E52E2D] font-bold' : 'text-white/40'
        }`}>
          {service.tagline}
        </span>

        {/* Title */}
        <h3
          className="text-2xl sm:text-3xl text-white uppercase leading-tight mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm text-white/50 leading-relaxed mb-6 font-light"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {service.description}
        </p>

        {/* Pricing Block */}
        <div className="mb-6 p-4 bg-white/2 border border-white/5 flex items-baseline justify-between rounded-xs">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40 block mb-0.5">
              Investment
            </span>
            <span
              className={`text-2xl sm:text-4xl font-serif font-bold tracking-tight ${
                service.isSignature ? 'text-[#E52E2D]' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {service.price}
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
            {service.priceNote}
          </span>
        </div>

        {/* Highlight Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.highlights.map((h, idx) => (
            <span
              key={idx}
              className="font-mono text-[8px] uppercase tracking-wider px-2.5 py-1 bg-white/3 border border-white/10 text-white/70 rounded-full"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Hairline Divider */}
        <div className={`h-px mb-6 ${service.isSignature ? 'bg-[#E52E2D]/20' : 'bg-white/10'}`} />

        {/* Feature List */}
        <ul className="space-y-3 mb-8 flex-1">
          {service.features.map((feat, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-white/70 font-light leading-snug"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <Diamond size={10} className={`mt-1 shrink-0 ${service.isSignature ? 'text-[#E52E2D]' : 'text-white/40'}`} fill={service.isSignature ? '#E52E2D' : 'transparent'} />
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA Button - Minimum 44px height */}
        <button
          onClick={onBook}
          className={`w-full py-4 font-mono text-[9px] uppercase tracking-[0.35em] transition-all duration-400 border cursor-pointer font-bold min-h-[48px] ${
            service.isSignature
              ? 'bg-[#E52E2D] border-[#E52E2D] text-white hover:bg-transparent hover:text-[#E52E2D] shadow-[0_0_20px_rgba(229,46,45,0.3)]'
              : 'bg-transparent border-white/20 text-white/80 hover:border-[#E52E2D] hover:text-white hover:bg-[#E52E2D]/10'
          }`}
        >
          Reserve Session
        </button>

      </div>
    </motion.div>
  );
}
