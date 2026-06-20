import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0D12] border-t border-[rgba(240,237,232,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-mono text-sm tracking-[0.2em] uppercase mb-3">
              <span className="text-[#A8A49E]">Good</span>
              <span className="text-[#F4B63D]">AI</span>
              <span className="text-[#A8A49E]"> Global</span>
            </div>
            <p className="text-sm text-[#6B6862] leading-relaxed max-w-xs">
              Strategic intelligence for Africa&apos;s AI future. Covering the
              systems, institutions, and power shifts shaping artificial
              intelligence across the continent.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">
              Platform
            </h4>
            <div className="space-y-2">
              <Link href="/signal" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">Signal Briefings</Link>
              <Link href="/intelligence" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">Media Intelligence</Link>
              <Link href="/constitutional" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">Constitutional Observatory</Link>
              <Link href="/ai-index" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">Africa AI Index</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">
              Desks
            </h4>
            <div className="space-y-2">
              <span className="block text-sm text-[#6B6862]">AI &amp; State Power</span>
              <span className="block text-sm text-[#6B6862]">Policy &amp; Governance</span>
              <span className="block text-sm text-[#6B6862]">Compute &amp; Infrastructure</span>
              <span className="block text-sm text-[#6B6862]">Data &amp; Sovereignty</span>
              <span className="block text-sm text-[#6B6862]">Markets &amp; Applications</span>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">
              Institution
            </h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">About</Link>
              <Link href="/contact" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">Contact</Link>
              <a href="https://www.linkedin.com/company/goodai-global/" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#6B6862] hover:text-[#F4B63D] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-[rgba(240,237,232,0.08)]">
          <p className="text-xs text-[#6B6862]">
            &copy; 2026 Good AI Global. Johannesburg. Strategic intelligence for
            Africa&apos;s AI future.
          </p>
          <a
            href="https://www.linkedin.com/company/goodai-global/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6B6862] hover:text-[#F4B63D] transition-colors mt-2 sm:mt-0"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
