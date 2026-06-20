"use client";

import { useState } from "react";

const navLinks = [
  { label: "Signal Desk", href: "#" },
  { label: "Intelligence", href: "#" },
  { label: "Constitutional", href: "#" },
  { label: "Africa AI Index", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#05070B]/90 backdrop-blur-md border-b border-[rgba(240,237,232,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0 font-mono text-sm uppercase tracking-widest text-[#F0EDE8] shrink-0">
            GOOD{" "}
            <span className="text-[#F4B63D] mx-0">&nbsp;AI&nbsp;</span>
            GLOBAL
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-[#A8A49E] hover:text-[#F0EDE8] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Subscribe CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden md:inline-flex items-center px-4 py-1.5 bg-[#F4B63D] text-[#05070B] font-mono text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#F4B63D]/90 transition-colors duration-150"
            >
              Subscribe
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-5 bg-[#F0EDE8] transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[#F0EDE8] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[#F0EDE8] transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 border-t border-[rgba(240,237,232,0.08)]" : "max-h-0"}`}
      >
        <div className="bg-[#05070B] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-[#A8A49E] hover:text-[#F0EDE8] transition-colors duration-150 py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#F4B63D] text-[#05070B] font-mono text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#F4B63D]/90 transition-colors duration-150 mt-2"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}
