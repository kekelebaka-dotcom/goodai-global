"use client";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { LOGO_LIGHT, LOGO_DARK } from "@/data/images";

export default function Footer() {
  const { theme } = useTheme();
  const logo = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }} className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <img src={logo} alt="Good AI Global" className="h-8 w-auto mb-3" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Strategic intelligence for Africa&apos;s AI future. Covering the
              systems, institutions, and power shifts shaping artificial
              intelligence across the continent.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Platform</h4>
            <div className="space-y-2">
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Signal Briefings</Link>
              <Link href="/intelligence" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Media Intelligence</Link>
              <Link href="/constitutional" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Constitutional Observatory</Link>
              <Link href="/ai-index" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Africa AI Index</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Desks</h4>
            <div className="space-y-2">
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>AI &amp; State Power</Link>
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Policy &amp; Governance</Link>
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Compute &amp; Infrastructure</Link>
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Data &amp; Sovereignty</Link>
              <Link href="/signal" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Markets &amp; Applications</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Institution</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>About</Link>
              <Link href="/contact" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>Contact</Link>
              <a href="https://www.linkedin.com/company/goodai-global/" target="_blank" rel="noopener noreferrer" className="block text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>&copy; 2026 Good AI Global. Johannesburg. Strategic intelligence for Africa&apos;s AI future.</p>
          <a href="https://www.linkedin.com/company/goodai-global/" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors mt-2 sm:mt-0" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
