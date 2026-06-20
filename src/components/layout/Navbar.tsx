"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { LOGO_LIGHT, LOGO_DARK } from "@/data/images";

const navLinks = [
  { href: "/signal", label: "Signal Desk" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/constitutional", label: "Constitutional" },
  { href: "/ai-index", label: "Africa AI Index" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const logo = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'var(--nav-bg)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <img src={logo} alt="Good AI Global" className="h-9 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="font-mono text-xs tracking-wider uppercase transition-colors" style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              {l.label}
            </Link>
          ))}
          <button onClick={toggle} className="p-2 rounded-md transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link href="/subscribe" className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded font-semibold transition-colors" style={{ background: 'var(--accent-gold)', color: theme === 'dark' ? '#05070B' : '#FFFFFF' }}>
            Subscribe
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} className="p-2" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button style={{ color: 'var(--text-primary)' }} onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t backdrop-blur-xl px-4 py-4 space-y-3" style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-mono text-sm tracking-wider uppercase py-2" style={{ color: 'var(--text-secondary)' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/subscribe" onClick={() => setOpen(false)} className="block font-mono text-xs tracking-wider uppercase px-4 py-2 rounded text-center font-semibold mt-2" style={{ background: 'var(--accent-gold)', color: '#FFFFFF' }}>
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
