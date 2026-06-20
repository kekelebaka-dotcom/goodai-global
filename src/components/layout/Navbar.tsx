"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/signal", label: "Signal Desk" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/constitutional", label: "Constitutional" },
  { href: "/ai-index", label: "Africa AI Index" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-[#05070B]/85 backdrop-blur-xl border-b border-[rgba(240,237,232,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Good AI Global" width={140} height={52} className="h-9 w-auto" priority />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="font-mono text-xs tracking-wider uppercase text-[#A8A49E] hover:text-[#F4B63D] transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/subscribe" className="bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-4 py-2 rounded hover:bg-[#d9a235] transition-colors font-semibold">
            Subscribe
          </Link>
        </div>
        <button className="md:hidden text-[#F0EDE8]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[rgba(240,237,232,0.08)] bg-[#05070B]/95 backdrop-blur-xl px-4 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-mono text-sm tracking-wider uppercase text-[#A8A49E] hover:text-[#F4B63D] py-2">
              {l.label}
            </Link>
          ))}
          <Link href="/subscribe" onClick={() => setOpen(false)} className="block bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-4 py-2 rounded text-center font-semibold mt-2">
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
