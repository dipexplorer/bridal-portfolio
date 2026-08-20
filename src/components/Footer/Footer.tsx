"use client";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 relative mt-12 border-t bg-charcoal border-[#ffffff]/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 text-left">

        {/* Brand Column */}
        <div className="max-w-sm">
          <h3
            className="text-2xl tracking-[0.35em] uppercase"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 60%, #800000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            VALERIE
          </h3>
          <p
            className="text-[9px] tracking-[0.45em] uppercase mt-1"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(166,75,42,0.7)" }}
          >
            Bridal &amp; Editorial Artistry
          </p>
          <p
            className="mt-6 text-xs text-[#ffffff]/55 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            14B Maker Chambers,<br />
            Near Trident Hotel,<br />
            Mumbai, Maharashtra
          </p>
          <p className="mt-4 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            <a href="tel:+919833322110" className="text-[#E52E2D] hover:underline">
              +91 98333 22110
            </a>
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24">
          {/* Explore */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[10px] font-bold tracking-widest uppercase text-[#E52E2D]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Artist", href: "#about" },
                { label: "Portfolio", href: "#gallery" },
                { label: "Services", href: "#services" },
                { label: "Reviews", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-[#ffffff]/55 hover:text-[#E52E2D] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social / Connect */}
          <div className="flex flex-col gap-4 max-w-[200px]">
            <h4
              className="text-[10px] font-bold tracking-widest uppercase text-[#E52E2D]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Pinterest", href: "https://pinterest.com" },
                { label: "WhatsApp", href: "https://wa.me/919833322110" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-[#ffffff]/55 hover:text-[#E52E2D] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p
              className="mt-2 text-xs text-[#ffffff]/45 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Available by appointment, 7 days a week.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="max-w-6xl mx-auto mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderColor: "rgba(166,75,42,0.1)" }}
      >
        <p
          className="text-[10px] tracking-widest uppercase text-[#ffffff]/40"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          &copy; {new Date().getFullYear()} VALERIE LAURENT. All Rights Reserved.
        </p>
        <p
          className="text-[10px] tracking-widest uppercase text-[#ffffff]/30"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Handcrafted with love in Mumbai
        </p>
      </div>
    </footer>
  );
}
