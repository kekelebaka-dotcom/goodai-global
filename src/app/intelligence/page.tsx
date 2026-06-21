"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEMO_AUDIO_URL } from "@/data/images";

/* ── Real sources from YouTube ── */
const monitoredSources = [
  { id: "4z6LQLhRokU", name: "SA Draft AI Policy Under Scrutiny", channel: "Newzroom Afrika", desk: "Policy Desk", deskColor: "#818CF8", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", cost: "$4.32/day", entities: 8, tier5: 2 },
  { id: "s53KW4qKe0I", name: "AI In Healthcare — Transforming SA Hospitals", channel: "SABC News", desk: "Signal Desk", deskColor: "#F4B63D", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", cost: "$4.32/day", entities: 5, tier5: 0 },
  { id: "ijrZ4N6n6xo", name: "South Africa Launches First AI Factory", channel: "CGTN Africa", desk: "Compute Desk", deskColor: "#34D399", status: "Active", provider: "AssemblyAI Universal-2", cost: "$3.60/day", entities: 6, tier5: 1 },
];

/* ── Real evidence from verified sources ── */
const insights = [
  { entity: "SASSA Automated Means Test", finding: "IEJ survey of 900 respondents: only 10.3% of eligible applicants received grants — an 89.7% erroneous exclusion rate. 80% of rejections based on bank verification test.", confidence: 0.97, constitutional: "Section 33, 27", tier: 5, sentiment: -0.78, source: "Context by Thomson Reuters Foundation, June 2025" },
  { entity: "68,000 Grants Suspended", finding: "997,379 beneficiaries biometrically verified since September 2025. 67,868 grants suspended in Q3 alone. Most non-verification cases driven by unsuccessful facial recognition.", confidence: 0.96, constitutional: "Section 14, 33", tier: 5, sentiment: -0.55, source: "IOL / Parliament briefing, May 2026" },
  { entity: "AI Policy Withdrawal", finding: "Portfolio Committee on Communications & Digital Technologies summoned DCDT to account for AI-generated content with fictitious citations in national AI policy. Revised policy not until January 2027.", confidence: 0.98, constitutional: "Section 195", tier: 5, sentiment: -0.62, source: "Parliament.gov.za / Reuters, May 2026" },
  { entity: "98% Appeal Rejection Rate", finding: "Of approximately 10 million appeal applications submitted to SASSA, 98% were unsuccessful in the 2024 financial year.", confidence: 0.94, constitutional: "Section 33, 34", tier: 5, sentiment: -0.81, source: "SASSA data via Context/TRF" },
  { entity: "SA First AI Factory", finding: "South Africa launched its first AI factory in collaboration with Altron and Nvidia. The facility processes data within national borders, addressing data sovereignty concerns.", confidence: 0.91, constitutional: "Compute Sovereignty", tier: 3, sentiment: 0.35, source: "CGTN Africa, November 2025" },
  { entity: "R1 Billion Fiscal Recovery", finding: "Stricter verification controls have resulted in fiscal recoveries exceeding R1 billion through intensified fraud prevention and biometric measures.", confidence: 0.91, constitutional: "Section 195", tier: 4, sentiment: 0.15, source: "IOL, May 2026" },
];

/* ── Transcript segments from the real Newzroom Afrika broadcast ── */
const transcript = [
  { time: "00:00", text: "South Africa's draft National AI Policy is under scrutiny following reports that cited sources cannot be verified.", entities: ["AI Policy"] },
  { time: "00:06", text: "According to a News24 exposé, some of the academic journals used to compile the draft report were fictitious.", entities: ["News24"] },
  { time: "00:14", text: "The Department of Communications and Digital Technologies published the policy for public comment before the irregularities were discovered.", entities: ["DCDT"] },
  { time: "00:22", text: "Questions are being raised about the use of AI-generated content in a government policy document meant to govern artificial intelligence itself.", entities: ["AI-generated content"] },
  { time: "00:31", text: "The Portfolio Committee on Communications has summoned the department to account for the withdrawal and the path forward for AI governance in South Africa.", entities: ["Portfolio Committee", "AI governance"] },
];

/* ── Pipeline queues ── */
const queues = [
  { name: "q.media.segment", count: 312, max: 400, color: "#34D399" },
  { name: "q.asr.request", count: 147, max: 400, color: "#F4B63D" },
  { name: "q.enrich", count: 892, max: 1000, color: "#F97316" },
  { name: "q.report.build", count: 18, max: 100, color: "#C084FC" },
  { name: "q.alerts", count: 42, max: 100, color: "#EF4444" },
];

/* ── Infrastructure ── */
const infra = [
  { layer: "API & Ingestion", component: "Workers", icon: "\u{2601}\u{FE0F}" },
  { layer: "Pipeline", component: "Queues", icon: "\u{1F4E8}" },
  { layer: "Processing", component: "Workflows", icon: "\u{2699}\u{FE0F}" },
  { layer: "Coordination", component: "Durable Objects", icon: "\u{1F517}" },
  { layer: "Archive", component: "R2", icon: "\u{1F4BE}" },
  { layer: "Database", component: "D1", icon: "\u{1F5C3}\u{FE0F}" },
  { layer: "Search", component: "Vectorize", icon: "\u{1F50E}" },
  { layer: "Replay", component: "Stream", icon: "\u{1F3AC}" },
  { layer: "Media Ops", component: "Containers", icon: "\u{1F4E6}" },
  { layer: "Routing", component: "AI Gateway", icon: "\u{1F6E1}\u{FE0F}" },
  { layer: "Inference", component: "AMD MI300X", icon: "\u{1F9E0}" },
];

export default function IntelligencePage() {
  const [selectedSource, setSelectedSource] = useState(0);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const src = monitoredSources[selectedSource];
  const entityPattern = /AI Policy|News24|DCDT|AI-generated content|Portfolio Committee|AI governance|Department of Communications/gi;

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-px" style={{ background: 'var(--accent-gold)' }} />
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--accent-gold)' }}>Media Intelligence</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">Intelligence Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded border border-blue-500/30 text-blue-500 bg-blue-500/5">Interactive Demo</span>
            <span className="font-mono text-[9px] uppercase px-2.5 py-1 rounded border border-green-500/30 text-green-500 bg-green-500/5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />3 Sources Live</span>
          </div>
        </div>

        {/* ═══ TOP ROW: Big Numbers ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
          {[
            { val: "3", label: "Sources", color: "#818CF8" },
            { val: "312", label: "Segments", color: "#34D399" },
            { val: "147", label: "Transcripts", color: "#F4B63D" },
            { val: "892", label: "Entities", color: "#F97316" },
            { val: "234", label: "Evidence", color: "#22C55E" },
            { val: "42", label: "Alerts", color: "#EF4444" },
            { val: "$12.24", label: "Cost Today", color: "#F4B63D" },
            { val: "99.8%", label: "Uptime", color: "#22C55E" },
          ].map((m) => (
            <div key={m.label} className="border rounded-md p-3 text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="font-mono text-xl font-bold" style={{ color: m.color }}>{m.val}</div>
              <div className="font-mono text-[8px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* ═══ MAIN LAYOUT: Source + Transcript | Insights ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mb-6">

          {/* LEFT: Featured Source + Transcript */}
          <div className="space-y-4">
            {/* Video Player */}
            <div className="border rounded-lg overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="aspect-video relative bg-black">
                <img src={`https://img.youtube.com/vi/${src.id}/maxresdefault.jpg`} alt={src.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${src.id}/hqdefault.jpg`; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded font-semibold" style={{ background: `${src.deskColor}30`, color: src.deskColor }}>{src.desk}</span>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-green-500/20 text-green-400 flex items-center gap-1"><span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />{src.status}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-0.5">{src.name}</h3>
                  <div className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">{src.channel} &middot; ASR: {src.provider} &middot; {src.cost} &middot; {src.entities} entities detected</div>
                </div>
              </div>

              {/* Source selector thumbnails */}
              <div className="flex gap-1 p-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {monitoredSources.map((s, i) => (
                  <button key={s.id} onClick={() => setSelectedSource(i)} className={`flex-1 rounded overflow-hidden border-2 transition-all ${selectedSource === i ? 'border-[var(--accent-gold)]' : 'border-transparent opacity-60 hover:opacity-100'}`} style={{ borderColor: selectedSource === i ? 'var(--accent-gold)' : 'transparent' }}>
                    <div className="relative">
                      <img src={`https://img.youtube.com/vi/${s.id}/default.jpg`} alt={s.name} className="w-full h-14 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-0.5">
                        <div className="font-mono text-[7px] text-white truncate">{s.channel}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div className="border rounded-lg p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Automated Transcript — Entity Detection</div>
                <span className="font-mono text-[8px] uppercase px-2 py-0.5 rounded" style={{ color: '#818CF8', background: 'rgba(129,140,248,0.1)' }}>gpt-4o-mini-transcribe</span>
              </div>
              {/* Audio player */}
              <audio controls className="w-full mb-3" style={{ height: '32px' }}>
                <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
              </audio>
              <div className="space-y-1">
                {transcript.map((seg, i) => (
                  <div key={i} className="flex gap-2 p-1.5 rounded cursor-pointer transition-colors text-sm" onClick={() => setActiveSegment(activeSegment === i ? null : i)} style={{ background: activeSegment === i ? 'rgba(244,182,61,0.06)' : 'transparent' }}>
                    <span className="font-mono text-[10px] shrink-0 pt-0.5" style={{ color: 'var(--accent-gold)' }}>{seg.time}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {seg.text.split(entityPattern).map((part, j) => entityPattern.test(part) ? <mark key={j} className="font-semibold px-0.5 rounded" style={{ background: 'rgba(244,182,61,0.15)', color: 'var(--accent-gold)' }}>{part}</mark> : part)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[8px] mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                Source: Newzroom Afrika (youtube.com/watch?v=4z6LQLhRokU) &middot; Transcript based on real broadcast content &middot; Entities auto-detected
              </div>
            </div>
          </div>

          {/* RIGHT: Key Insights */}
          <div className="space-y-4">
            <div className="border rounded-lg" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Key Insights — Today</div>
                <span className="font-mono text-[8px] uppercase px-2 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>12 signals</span>
              </div>
              <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                {insights.map((ins, i) => (
                  <div key={i} className="border rounded-md p-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold" style={{ color: 'var(--accent-gold)' }}>{ins.entity}</span>
                      <div className="flex gap-1 shrink-0">
                        <span className="font-mono text-[8px] px-1.5 py-0.5 rounded" style={{ background: ins.tier >= 5 ? 'rgba(239,68,68,0.1)' : 'rgba(244,182,61,0.1)', color: ins.tier >= 5 ? '#EF4444' : 'var(--accent-gold)' }}>T{ins.tier}</span>
                        <span className="font-mono text-[8px] text-green-500">{(ins.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <p className="text-[12px] leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{ins.finding}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: '#818CF8' }}>{ins.constitutional}</span>
                      <span style={{ color: ins.sentiment < -0.3 ? '#EF4444' : ins.sentiment > 0 ? '#22C55E' : 'var(--text-muted)' }}>Sent: {ins.sentiment.toFixed(2)}</span>
                      <span>{ins.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM ROW: Pipeline + Daily Brief + Ops ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Pipeline Throughput */}
          <div className="border rounded-lg p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Pipeline Throughput</div>
            <div className="space-y-2.5">
              {queues.map((q) => (
                <div key={q.name} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] w-28 shrink-0" style={{ color: 'var(--text-secondary)' }}>{q.name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${(q.count / q.max) * 100}%`, background: q.color }} />
                  </div>
                  <span className="font-mono text-[9px] w-8 text-right" style={{ color: 'var(--text-muted)' }}>{q.count}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 pt-2 border-t font-mono text-[8px]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              <span>DLQ: 0</span><span>Retry: 2</span><span>Health: <span style={{ color: '#22C55E' }}>OK</span></span>
            </div>
          </div>

          {/* Daily Brief */}
          <div className="border rounded-lg p-4" style={{ borderColor: 'var(--accent-gold)', background: 'var(--bg-card)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span>{"\u{1F4CA}"}</span>
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold" style={{ color: 'var(--accent-gold)' }}>Daily Intelligence Brief</div>
            </div>
            <div className="space-y-2 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
              <p><strong style={{ color: 'var(--text-primary)' }}>Policy:</strong> AI policy withdrawn after fictitious citations. Portfolio Committee demands accountability from DCDT.</p>
              <p><strong style={{ color: 'var(--text-primary)' }}>Rights:</strong> SASSA automated means test excludes 89.7% of eligible applicants. 68,000 grants suspended via biometrics.</p>
              <p><strong style={{ color: 'var(--text-primary)' }}>Compute:</strong> SA first AI factory launched (Altron + Nvidia). Data sovereignty implications under review.</p>
            </div>
            <div className="font-mono text-[7px] mt-3 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>3 sources &middot; 12 constitutional signals &middot; signed_at: 2026-06-21T18:00:00Z &middot; sha256: d4e8f1...a92b</div>
          </div>

          {/* Operations Panel */}
          <div className="border rounded-lg p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Operations</div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]"><span style={{ color: 'var(--text-secondary)' }}>Transcript latency p95</span><span className="font-mono" style={{ color: '#22C55E' }}>12.4s</span></div>
              <div className="flex justify-between text-[11px]"><span style={{ color: 'var(--text-secondary)' }}>Queue DLQ rate</span><span className="font-mono" style={{ color: '#22C55E' }}>0.0%</span></div>
              <div className="flex justify-between text-[11px]"><span style={{ color: 'var(--text-secondary)' }}>Mention precision</span><span className="font-mono" style={{ color: '#22C55E' }}>94%</span></div>
              <div className="flex justify-between text-[11px]"><span style={{ color: 'var(--text-secondary)' }}>AMD GPU util</span><span className="font-mono" style={{ color: 'var(--accent-gold)' }}>64%</span></div>
              <div className="flex justify-between text-[11px]"><span style={{ color: 'var(--text-secondary)' }}>Provider split</span><span className="font-mono" style={{ color: 'var(--text-muted)' }}>72% AMD / 28% managed</span></div>
            </div>
            <div className="mt-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="font-mono text-[8px] uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Cost — 30-day projection (3 channels)</div>
              <div className="font-mono text-xl font-bold" style={{ color: 'var(--accent-gold)' }}>$367<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></div>
            </div>
          </div>
        </div>

        {/* ═══ INFRASTRUCTURE STRIP ═══ */}
        <div className="border rounded-lg p-4 mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>GoodAI Global Infrastructure</div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {infra.map((i) => (
              <div key={i.layer} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                <span className="text-sm">{i.icon}</span>
                <div>
                  <div className="font-mono text-[8px] font-bold" style={{ color: 'var(--accent-gold)' }}>{i.component}</div>
                  <div className="font-mono text-[7px]" style={{ color: 'var(--text-muted)' }}>{i.layer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-mono text-[9px] uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          Interactive demo &middot; All sources are real South African broadcasts &middot; <a href="/contact" style={{ color: 'var(--accent-gold)' }}>Contact for pilot access</a>
        </p>
      </div>
      <Footer />
    </>
  );
}
