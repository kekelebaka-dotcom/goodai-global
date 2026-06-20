import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { articles } from "@/data/articles";
import { signals } from "@/data/signals";
import { editorialDesks } from "@/data/desks";
import { constitutionalDesks } from "@/data/constitutional-desks";
import { countries } from "@/data/countries";
import { HERO_URL, articleImages } from "@/data/images";

const lead = articles[0];

const tickerItems = [
  "SA AI Policy withdrawn after AI-generated citations — revised target Jan 2027",
  "Youth unemployment at 45.8% — AI skills gap widening",
  "SA broadband ranking drops to 115th of 152 — AI access inequality deepens",
  "Only 16% of SA municipalities received clean audits — municipal AI readiness critical",
  "POPIA Section 71 does not cover generative AI or AI-assisted decisions",
  "Ubuntu Town constitutional pilot targeting 57 towns across 9 provinces",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO IMAGE */}
      <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <img src={HERO_URL} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/40 via-[#05070B]/60 to-[#05070B]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase t-gold font-semibold">Strategic Intelligence for Africa&apos;s AI Future</span>
          </div>
        </div>
      </div>

      {/* LEAD STORY + SIGNALS SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold font-medium">
            Signal Desk Brief
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight mb-4">
              {lead.title}
            </h1>
            <p className="t-text2 text-lg leading-relaxed mb-6 max-w-2xl">
              {lead.excerpt}
            </p>
            <div className="flex flex-wrap gap-4 items-center mb-6 text-xs font-mono uppercase tracking-wider">
              <span className="t-gold font-semibold">{lead.category}</span>
              <span className="t-muted">{lead.desk}</span>
              <span className="t-muted">{lead.date}</span>
              <span className="t-muted">{lead.readTime}</span>
            </div>
            <Link href={`/signal/${lead.slug}`} className="inline-flex items-center gap-2 t-gold font-semibold text-sm border-b border-[#8A6420] pb-0.5 hover:border-[#F4B63D] transition-colors">
              Read the Brief
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </div>
          <div className="border-l t-border pl-6 max-lg:border-l-0 max-lg:pl-0 max-lg:border-t max-lg:pt-6">
            <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase t-text2 mb-4 font-medium">
              Latest Signals
            </h3>
            {signals.slice(0, 4).map((s, i) => (
              <div key={i} className="py-3 border-b t-border last:border-b-0">
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase font-medium mb-1" style={{ color: s.deskColor }}>{s.desk}</div>
                <div className="font-serif text-[15px] font-semibold leading-snug t-text hover:t-gold transition-colors cursor-pointer mb-1">{s.title}</div>
                <div className="text-[11px] t-muted uppercase tracking-wider">{s.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="t-bg2 border-y t-border py-3 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-ticker">
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase t-gold font-semibold px-4 shrink-0">Tracking Now</span>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-xs t-text2 shrink-0 flex items-center gap-3">
              <span className="w-1 h-1 bg-[#8A6420] rounded-full shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* FOUNDER QUOTE */}
      <div className="t-surface border-y t-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center gap-8">
          <p className="font-serif text-xl sm:text-2xl italic t-text leading-relaxed flex-1 border-l-2 border-[#F4B63D] pl-6 max-lg:border-l-0 max-lg:pl-0 max-lg:border-t-2 max-lg:pt-4 max-lg:text-center">
            &ldquo;Across Africa, artificial intelligence is no longer just a technology story. It is a power story.&rdquo;
          </p>
          <div className="shrink-0 text-right max-lg:text-center">
            <div className="text-sm font-semibold t-text">Keke Lebaka</div>
            <div className="text-[11px] t-muted leading-relaxed mt-1 max-w-[260px]">
              Founder &amp; Editor-in-Chief<br />
              Former CDMO Sub-Saharan Africa, L&apos;Or&eacute;al<br />
              Former Group Digital Director Africa, Promasidor
            </div>
          </div>
        </div>
      </div>

      {/* THREE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">The Platform</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">One Platform. Three Pillars.</h2>
        <p className="t-text2 text-sm mb-10 max-w-xl">
          GoodAI Global combines editorial intelligence, real-time media monitoring, and constitutional evidence into Africa&apos;s first integrated AI intelligence institution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "Signal Desk", color: "#F4B63D", desc: "Strategic briefings and editorial analysis on how AI reshapes power, infrastructure, and institutions across Africa.", items: ["Signal Desk Briefs", "Strategic Intelligence Coverage", "Africa AI Index", "Editorial Desks: Policy, Compute, Sovereignty, Markets"], link: "/signal", linkText: "Read Briefings" },
            { name: "Media Intelligence", color: "#3B82F6", desc: "Real-time audio and video monitoring with transcript-backed evidence. Not opinion — verifiable intelligence from actual media sources.", items: ["Audio & Video Ingestion", "Automated Transcription (ASR)", "Entity & Mention Detection", "Evidence-Backed Daily Briefs"], link: "/intelligence", linkText: "Explore Pipeline" },
            { name: "Ubuntu Constitutional", color: "#22C55E", desc: "South Africa's first citizen-driven AI constitutional observatory. Monitoring AI inequality across 57 towns to build court-ready evidence.", items: ["8 Signal Desks Tracking AI Rights", "Municipal AI Readiness Index", "Court-Grade Evidence Database", "Constitutional Litigation Pathway"], link: "/constitutional", linkText: "View Observatory" },
          ].map((p, i) => (
            <div key={i} className="t-card border t-border rounded-lg p-6 card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: p.color }} />
              <div className="text-2xl mb-3">{["◎", "◉", "◆"][i]}</div>
              <h3 className="font-serif text-lg font-bold mb-2">{p.name}</h3>
              <p className="text-sm t-text2 leading-relaxed mb-4">{p.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {p.items.map((item, j) => (
                  <li key={j} className="text-xs t-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: p.color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={p.link} className="text-xs font-semibold uppercase tracking-wider t-gold hover:underline">
                {p.linkText} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="h-px bg-[rgba(240,237,232,0.08)]" /></div>

      {/* EDITORIAL DESKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">Coverage</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Editorial Desks</h2>
        <p className="t-text2 text-sm mb-10 max-w-xl">We track the structural forces shaping Africa&apos;s AI future through six dedicated desks.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(240,237,232,0.08)] rounded-lg overflow-hidden">
          {editorialDesks.map((d) => (
            <div key={d.id} className="t-card p-5 hover:bg-[#161C24] transition-colors">
              <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded mb-2 font-semibold" style={{ background: `${d.color}20`, color: d.color }}>{d.label}</span>
              <h3 className="text-sm font-semibold t-text mb-1">{d.name}</h3>
              <p className="text-xs t-muted leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AFRICA AI INDEX PREVIEW */}
      <div className="t-surface border-y t-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-px bg-[#F4B63D]" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">Flagship Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">The Africa AI Index</h2>
          <p className="t-text2 text-sm mb-10 max-w-xl">Tracking AI readiness, governance capacity, compute access, talent density, and institutional development across African nations.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-sm t-text2 leading-relaxed mb-4">
                The Africa AI Index measures what matters: not just who has AI, but who controls the infrastructure, who governs the deployment, and who benefits from the outcomes. Five pillars. Structured methodology. Updated quarterly.
              </p>
              <p className="text-sm t-muted mb-6">
                <strong className="t-text">Methodology:</strong> Composite scoring across Policy Readiness, Compute Capacity, Talent Pipeline, Institutional Strength, and Application Ecosystem.
              </p>
              <Link href="/ai-index" className="text-sm font-semibold t-gold uppercase tracking-wider hover:underline">
                Explore the Index &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {countries.map((c) => (
                <div key={c.name} className="t-card border t-border rounded-md p-4 hover:border-[rgba(244,182,61,0.25)] transition-colors">
                  <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span> {c.name}
                  </div>
                  <div className="flex gap-3">
                    {[
                      { label: "Policy", val: c.policy },
                      { label: "Compute", val: c.compute },
                      { label: "Talent", val: c.talent },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="font-mono text-base font-bold t-gold">{m.val}</div>
                        <div className="text-[9px] t-muted uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONSTITUTIONAL OBSERVATORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">Constitutional Observatory</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Ubuntu AI Constitutional Signal Desk</h2>
        <p className="t-text2 text-sm mb-10 max-w-xl">
          Monitoring how AI affects equality, dignity, education, employment, privacy, and governance across 57 South African towns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {constitutionalDesks.map((d) => (
            <div key={d.id} className="t-card border t-border rounded-md p-4 flex items-start gap-3 hover:border-[rgba(34,197,94,0.3)] transition-colors">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${d.status === "red" ? "bg-red-500" : d.status === "amber" ? "bg-[#F4B63D]" : "bg-green-500"}`} />
              <div>
                <div className="text-sm font-semibold mb-0.5">{d.name}</div>
                <div className="text-xs t-muted leading-relaxed mb-1">{d.finding}</div>
                <div className="font-mono text-[10px] t-text2 uppercase tracking-wider">
                  Tier {d.tier} &middot; {d.tierLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/constitutional" className="text-sm font-semibold t-gold uppercase tracking-wider hover:underline">
            Explore the Observatory &rarr;
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="h-px bg-[rgba(240,237,232,0.08)]" /></div>

      {/* NEWSLETTER */}
      <div className="t-bg2 border-y t-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">The Good AI Signal</h2>
          <p className="t-text2 text-sm mb-8 max-w-md mx-auto">
            A strategic briefing on the institutions, infrastructure, and power dynamics shaping AI in Africa. Weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 t-surface border t-border rounded px-4 py-3 text-sm t-text placeholder:t-muted outline-none focus:border-[#F4B63D] transition-colors" />
            <button className="bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-6 py-3 rounded font-semibold hover:bg-[#d9a235] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 max-lg:text-center">
          <div className="flex items-center gap-2 mb-2 max-lg:justify-center">
            <span className="w-4 h-px bg-[#F4B63D]" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">About</span>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-3">Africa&apos;s Intelligence Layer</h2>
          <p className="text-sm t-text2 leading-relaxed">
            GoodAI Global is the editorial intelligence platform tracking AI&apos;s power dynamics across Africa. We produce the Signal Desk Brief, maintain the Africa AI Index, monitor media intelligence at scale, and operate the Ubuntu AI Constitutional Observatory — because the question is not who uses AI, but who controls what it becomes.
          </p>
        </div>
        <div className="shrink-0">
          <Link href="/about" className="t-gold text-sm font-semibold uppercase tracking-wider border-b border-[#8A6420] pb-0.5 hover:border-[#F4B63D] transition-colors">
            About GoodAI Global &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
