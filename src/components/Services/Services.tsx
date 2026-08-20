'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceCard {
  id: string;
  tier: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  description: string;
  features: string[];
  isSignature?: boolean;
}

const servicesData: ServiceCard[] = [
  {
    id: '1',
    tier: 'I',
    name: 'Editorial Couture',
    price: '₹25,000',
    priceNote: 'per session',
    tagline: 'For the Lens',
    description: 'High-fashion runway and editorial styling designed for photography, campaigns, and print.',
    features: [
      'HD Base & Custom Contouring',
      'Editorial Lash Architecture',
      'Lip Sculpting & Lining',
      'On-Set Touch-ups (3 hrs)',
      'Digital Look Consultation',
    ],
  },
  {
    id: '2',
    tier: 'II',
    name: 'Couture Bride',
    price: '₹45,000',
    priceNote: 'per ceremony',
    tagline: 'The Signature',
    description: 'The ultimate luxury signature bridal look — crafted for your most important day.',
    features: [
      'Luxury Hydrating Prep Treatment',
      'Airbrush HD Water-resistant Base',
      'Bridal Veil & Jewellery Draping',
      'Full Pre-wedding Trial',
      'Venue Day Assistance (6 hrs)',
    ],
    isSignature: true,
  },
  {
    id: '3',
    tier: 'III',
    name: 'Red Carpet Glam',
    price: '₹18,000',
    priceNote: 'per event',
    tagline: 'The Evening',
    description: 'Glamour styling for high-end events, cocktail soirées, and award evenings.',
    features: [
      'Flawless Radiant Glam Base',
      'Custom Eye Look',
      'Couture Lip Tint',
      'Premium Silk Faux Lashes',
      'Hair Styling Consultation',
    ],
  },
];

interface ServicesProps {
  onBookClick: (serviceName: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  return (
    <section className="bg-[#060606] py-32 border-t border-white/5" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#E52E2D] mb-6 flex items-center gap-3 font-bold">
              <span className="w-5 h-px bg-[#E52E2D]" />
              Rates &amp; Services
            </span>
            <h2
              className="text-5xl md:text-[5vw] text-white uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Exclusive<br />
              <span className="italic font-extralight text-white/35">Packages</span>
            </h2>
          </div>
          <p
            className="text-[13px] text-white/35 leading-[1.9] max-w-xs md:text-right"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Each session is a curated collaboration — bespoke to your vision, uncompromising in craft.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, i) => (
            <ServiceTile
              key={service.id}
              service={service}
              index={i}
              onBook={() => onBookClick(service.name)}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 font-mono tracking-wide">
            * Pricing is indicative. Final quote provided after consultation.
          </p>
          <button
            onClick={() => onBookClick('')}
            className="group text-[11px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-[#E52E2D] transition-colors duration-300 flex items-center gap-2"
          >
            Custom inquiry
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </button>
        </div>

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
  const [priceRevealed, setPriceRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col border transition-colors duration-500 ${
        service.isSignature
          ? 'border-[#E52E2D]/30 bg-[#0c0c0c] hover:border-[#E52E2D]/60'
          : 'border-white/[0.07] bg-[#080808] hover:border-white/[0.14]'
      }`}
    >
      {/* Signature top accent bar */}
      {service.isSignature && (
        <div className="h-[2px] w-full bg-linear-to-r from-[#E52E2D] via-[#ff6b6b] to-[#E52E2D]" />
      )}

      {/* Inner padding */}
      <div className="p-10 flex flex-col flex-1 gap-0">

        {/* Top meta row */}
        <div className="flex items-center justify-between mb-8">
          <span className={`font-mono text-[9px] uppercase tracking-[0.4em] ${
            service.isSignature ? 'text-[#E52E2D]' : 'text-white/25'
          }`}>
            {service.tagline}
          </span>
          {service.isSignature && (
            <span className="font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 border border-[#E52E2D]/40 text-[#E52E2D]">
              Signature
            </span>
          )}
        </div>

        {/* Ghost tier numeral */}
        <div
          className="absolute top-8 right-8 text-[7rem] leading-none font-serif select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            color: service.isSignature ? 'rgba(229,46,45,0.04)' : 'rgba(255,255,255,0.03)',
          }}
        >
          {service.tier}
        </div>

        {/* Name */}
        <h3
          className="text-3xl text-white uppercase leading-tight mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p
          className="text-[13px] text-white/35 leading-[1.85] mb-9"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {service.description}
        </p>

        {/* Hairline divider */}
        <div className={`h-px mb-9 ${service.isSignature ? 'bg-[#E52E2D]/15' : 'bg-white/6'}`} />

        {/* Features */}
        <ul className="space-y-3.5 mb-10 flex-1">
          {service.features.map((feat, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[13px] text-white/50 font-light leading-snug"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className={`mt-1.5 w-[5px] h-[5px] rounded-full shrink-0 ${
                service.isSignature ? 'bg-[#E52E2D]/70' : 'bg-white/20'
              }`} />
              {feat}
            </li>
          ))}
        </ul>

        {/* Price — blur-reveal interaction */}
        <div className="mb-9">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/20 mb-3">
            Investment
          </p>
          <div
            className="relative inline-flex items-baseline gap-2 cursor-pointer group"
            onClick={() => setPriceRevealed(true)}
            onMouseEnter={() => setPriceRevealed(true)}
            onMouseLeave={() => setPriceRevealed(false)}
          >
            <span
              className={`text-4xl font-serif transition-all duration-500 select-none ${
                service.isSignature ? 'text-[#E52E2D]' : 'text-white'
              } ${!priceRevealed ? 'blur-[10px] opacity-40' : 'blur-0 opacity-100'}`}
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {service.price}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/20">
              {service.priceNote}
            </span>
            {!priceRevealed && (
              <span className="absolute inset-0 flex items-center justify-start font-mono text-[9px] uppercase tracking-[0.3em] text-white/25 pl-0.5 pointer-events-none">
                hover to reveal
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onBook}
          className={`w-full py-4 font-mono text-[9px] uppercase tracking-[0.35em] transition-all duration-400 border ${
            service.isSignature
              ? 'bg-[#E52E2D] border-[#E52E2D] text-white hover:bg-transparent hover:text-[#E52E2D]'
              : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/80'
          }`}
        >
          Reserve Session
        </button>

      </div>
    </motion.div>
  );
}
