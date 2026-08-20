'use client';

import React, { useRef } from 'react';

interface ServiceCard {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

const servicesData: ServiceCard[] = [
  {
    id: '1',
    name: 'Editorial Couture',
    price: '₹25,000',
    description: 'High-fashion runway and editorial styling designed for photography.',
    features: [
      'HD Base and Custom Contouring',
      'Editorial Lashes & Lip Sculpting',
      'On-Set Touch-ups (Up to 3 hours)',
      'Digital Look Consultation'
    ]
  },
  {
    id: '2',
    name: 'Couture Bride',
    price: '₹45,000',
    description: 'The ultimate luxury signature bridal look for your special day.',
    features: [
      'Luxury Hydrating Prep Treatment',
      'Airbrush HD Water-resistant Base',
      'Bridal Veil & Jewelry Draping',
      'Pre-wedding Full Trials'
    ]
  },
  {
    id: '3',
    name: 'Red Carpet Glam',
    price: '₹18,000',
    description: 'Glamour styling for high-end events and cocktail soirées.',
    features: [
      'Flawless Radiant Glam Base',
      'Custom Eye Look & Lip Tint',
      'Premium Silk Faux Lashes',
      'Hair Styling Consultation'
    ]
  }
];

interface ServicesProps {
  onBookClick: (serviceName: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  return (
    <section className="bg-[#0a0a0a] py-24 min-h-screen border-b border-[#ffffff]/10" id="services">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Title */}
        <div className="space-y-4 text-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#E52E2D] font-bold">
            [ Rates & Services ]
          </span>
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl text-[#ffffff]">
            Exclusive Packages
          </h2>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <TiltCard 
              key={service.id} 
              service={service} 
              onBook={() => onBookClick(service.name)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// 3D Perspective Tilt Card Component
function TiltCard({ service, onBook }: { service: ServiceCard; onBook: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Rotate strength: max 12 degrees
    const rx = -(y / (box.height / 2)) * 12;
    const ry = (x / (box.width / 2)) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-8 md:p-12 relative overflow-hidden transition-all duration-300 ease-out border border-[#ffffff]/10 bg-gradient-to-b from-[#111111] to-[#0a0a0a]/20 hover:border-[#E52E2D]/40 hover:shadow-lg glass-card rounded-2xl flex flex-col justify-between"
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <div className="space-y-6" style={{ transform: 'translateZ(30px)' }}>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/40">
          [ {service.name} ]
        </span>
        <h3 className="font-serif italic font-light text-2xl text-[#ffffff]">
          {service.name}
        </h3>
        <p className="font-sans font-light text-[#ffffff]/70 text-sm leading-relaxed">
          {service.description}
        </p>
        
        <div className="h-px w-full bg-[#ffffff]/10" />
        
        <ul className="space-y-3">
          {service.features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-3 text-xs text-[#ffffff]/70 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E52E2D]/60" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 space-y-6" style={{ transform: 'translateZ(45px)' }}>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-3xl text-[#E52E2D]">{service.price}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffffff]/40">one-time fee</span>
        </div>
        
        <button
          onClick={onBook}
          className="w-full py-4 border border-[#E52E2D]/25 hover:border-[#E52E2D] text-[#ffffff] hover:text-[#111111] uppercase font-mono text-[10px] tracking-widest transition-all duration-300 bg-[#111111] hover:bg-[#E52E2D] rounded-xl shadow-sm"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
