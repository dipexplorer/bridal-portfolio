'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({ isOpen, onClose, defaultService = '' }: BookingModalProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  // Sync service selection when modal opens
  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
    }
  }, [defaultService, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hybrid pre-filled WhatsApp details generation
    const baseText = `Hi Valerie, I'd like to book a makeup session.\n\n`;
    const details = `*Name:* ${name}\n*Date:* ${date}\n*Service:* ${service}\n*Notes:* ${notes || 'None'}`;
    const encodedText = encodeURIComponent(baseText + details);
    
    // Open WhatsApp link in a new window/tab
    window.open(`https://wa.me/919833322110?text=${encodedText}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Slide-in Form Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#111111] border-l border-[#ffffff]/10 p-8 sm:p-12 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#E52E2D] font-bold">
                  [ Book Session ]
                </span>
                <button
                  onClick={onClose}
                  className="font-mono text-[10px] uppercase text-[#ffffff]/60 hover:text-[#E52E2D] transition-colors"
                >
                  Close ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/60">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg py-3 px-4 text-[#ffffff] font-sans text-sm focus:outline-none focus:border-[#E52E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/60">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg py-3 px-4 text-[#ffffff] font-mono text-sm focus:outline-none focus:border-[#E52E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/60">
                    Select Service
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#111111] border border-[#ffffff]/10 rounded-lg py-3 px-4 text-[#ffffff] font-sans text-sm focus:outline-none focus:border-[#E52E2D] appearance-none"
                  >
                    <option value="" disabled>Select package</option>
                    <option value="Editorial Couture">Editorial Couture</option>
                    <option value="Couture Bride">Couture Bride</option>
                    <option value="Red Carpet Glam">Red Carpet Glam</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#ffffff]/60">
                    Custom Notes / Preferences
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify details, theme colors, location..."
                    className="w-full bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg py-3 px-4 text-[#ffffff] font-sans text-sm focus:outline-none focus:border-[#E52E2D] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E52E2D] hover:bg-[#ff4d4d] text-[#111111] font-mono text-[10px] uppercase tracking-widest transition-all rounded-lg font-bold shadow-md"
                >
                  Send Booking Request
                </button>
              </form>
            </div>

            {/* Footer notice */}
            <div className="pt-8 text-center border-t border-[#ffffff]/5 mt-12">
              <p className="font-sans text-[11px] text-[#ffffff]/50 leading-relaxed">
                Clicking submit generates a pre-filled secure message that connects you directly to Valerie via WhatsApp.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
