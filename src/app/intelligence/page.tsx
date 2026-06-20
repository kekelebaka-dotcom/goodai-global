"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEMO_AUDIO_URL } from "@/data/images";

const pipelineSteps = [
  { label: "Source", count: 3, color: "#818CF8", icon: "\u{1F4E1}" },
  { label: "Ingest", count: 312, color: "#34D399", icon: "\u{1F4E5}" },
  { label: "Transcribe", count: 147, color: "#F4B63D", icon: "\u{1F4DD}" },
  { label: "Detect", count: 892, color: "#F97316", icon: "\u{1F50D}" },
  { label: "Evidence", count: 234, color: "#22C55E", icon: "\u{1F4CB}" },
  { label: "Brief", count: 18, color: "#C084FC", icon: "\u{1F4CA}" },
];

const sources = [
  { name: "SA Parliamentary Audio", status: "Active", transcripts: 24, lastUpdate: "2h ago", type: "Audio" },
  { name: "SABC News Radio", status: "Active", transcripts: 68, lastUpdate: "45m ago", type: "Audio" },
  { name: "EWN Radio", status: "Monitoring", transcripts: 55, lastUpdate: "1h ago", type: "Audio" },
];

const transcriptSegments = [
  { time: "00:00", text: "Order, members. We now turn to the report on artificial intelligence deployment in government services." },
  { time: "00:08", text: "The committee has received submissions regarding the status of the revised national AI policy." },
  { time: "00:14", text: "I wish to raise the matter of algorithmic decision-making in social grant processing." },
  { time: "00:22", text: "We have received reports that SASSA is using automated systems to flag and reject grant applications without adequate human oversight." },
  { time: "00:31", text: "The revised AI policy framework, targeted for public comment by January 2027, will address these gaps." },
];

const detectedEntities = [
  { entity: "SASSA", type: "Organization", mentions: 3, confidence: 0.96, constitutional: "Section 33" },
  { entity: "AI Policy Framework", type: "Policy", mentions: 2, confidence: 0.94, constitutional: "Section 195" },
  { entity: "Algorithmic Decision-Making", type: "Concept", mentions: 2, confidence: 0.91, constitutional: "Section 33, 14" },
  { entity: "January 2027", type: "Date", mentions: 1, confidence: 0.99, constitutional: "Section 195" },
  { entity: "Grant Applications", type: "Service", mentions: 1, confidence: 0.88, constitutional: "Section 27" },
];

const evidenceCards = [
  { entity: "SASSA Algorithmic Processing", source: "SA Parliamentary Audio", confidence: 0.96, constitutionalLink: "Section 33 (Just Administrative Action)", transcript: "...SASSA is using automated systems to flag and reject grant applications without adequate human oversight or appeal mechanisms...", time: "00:22", tier: 5 },
  { entity: "AI Policy Delay", source: "SA Parliamentary Audio", confidence: 0.94, constitutionalLink: "Section 195 (Public Administration)", transcript: "...the revised AI policy framework, targeted for public comment by January 2027, will address these gaps...", time: "00:31", tier: 4 },
];

export default function IntelligencePage() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px" style={{ background: 'var(--accent-gold)' }} />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--accent-gold)' }}>Media Intelligence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Intelligence Dashboard</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Real-time media monitoring with transcript-backed evidence for constitutional analysis.</p>
          </div>
          <span className="inline-block font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded border border-blue-500/30 text-blue-500 bg-blue-500/5">
            Interactive Demo
          </span>
        </div>

        {/* Pipeline Flow */}
        <div className="border rounded-lg p-6 mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Pipeline Status</h2>
          <div className="flex items-center justify-between overflow-x-auto gap-2">
            {pipelineSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.count}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <svg width="24" height="12" className="shrink-0 mx-1" style={{ color: 'var(--text-muted)' }}><path d="M0 6h20M16 2l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1" /></svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Sources Monitored", val: "3", color: "#818CF8" },
            { label: "Transcripts Processed", val: "147", color: "#34D399" },
            { label: "Entities Detected", val: "892", color: "#F4B63D" },
            { label: "Evidence Cards", val: "234", color: "#22C55E" },
          ].map((m) => (
            <div key={m.label} className="border rounded-lg p-4 text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="font-mono text-2xl font-bold" style={{ color: m.color }}>{m.val}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* LIVE DEMO: Audio Source + Transcript */}
        <div className="border rounded-lg overflow-hidden mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Live Demo: SA Parliamentary Committee on AI Governance</h2>
            </div>
            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-500">Source: Audio</span>
          </div>
          
          {/* Audio Player */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">\u{1F3A7}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">SA Parliamentary Committee — AI in Government Services</div>
                <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Portfolio Committee on Communications &middot; Demo Recording &middot; 35 seconds</div>
              </div>
            </div>
            <audio controls className="w-full" style={{ height: '40px' }}>
              <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          </div>

          {/* Transcript with entity highlights */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Automated Transcript</h3>
              <button onClick={() => setShowTranscript(!showTranscript)} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded" style={{ color: 'var(--accent-gold)', background: 'var(--accent-gold)' + '10' }}>
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </button>
            </div>
            {showTranscript && (
              <div className="space-y-3">
                {transcriptSegments.map((seg, i) => (
                  <div key={i} 
                    className="flex gap-3 p-2 rounded cursor-pointer transition-colors"
                    style={{ background: activeSegment === i ? 'var(--accent-gold)' + '08' : 'transparent' }}
                    onClick={() => setActiveSegment(activeSegment === i ? null : i)}>
                    <span className="font-mono text-[10px] shrink-0 pt-0.5" style={{ color: 'var(--accent-gold)' }}>{seg.time}</span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {seg.text.split(/(SASSA|AI policy|algorithmic decision|grant applications|January 2027)/gi).map((part, j) => 
                        /SASSA|AI policy|algorithmic decision|grant applications|January 2027/i.test(part) 
                          ? <mark key={j} className="font-semibold px-0.5 rounded" style={{ background: 'var(--accent-gold)' + '20', color: 'var(--accent-gold)' }}>{part}</mark>
                          : part
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detected Entities */}
        <div className="border rounded-lg p-6 mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Detected Entities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Entity</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Type</th>
                  <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Mentions</th>
                  <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Confidence</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Constitutional Link</th>
                </tr>
              </thead>
              <tbody>
                {detectedEntities.map((e) => (
                  <tr key={e.entity} className="border-b transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-3 font-semibold" style={{ color: 'var(--accent-gold)' }}>{e.entity}</td>
                    <td className="py-3"><span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>{e.type}</span></td>
                    <td className="py-3 text-center font-mono">{e.mentions}</td>
                    <td className="py-3 text-center font-mono text-green-500">{(e.confidence * 100).toFixed(0)}%</td>
                    <td className="py-3 font-mono text-[11px]" style={{ color: '#818CF8' }}>{e.constitutional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="border rounded-lg p-6 mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Generated Evidence Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceCards.map((e, i) => (
              <div key={i} className="border rounded-md p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent-gold)' }}>{e.entity}</span>
                  <div className="flex gap-2">
                    <span className="font-mono text-[10px] text-green-500">{(e.confidence * 100).toFixed(0)}%</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">Tier {e.tier}</span>
                  </div>
                </div>
                <p className="text-xs italic leading-relaxed mb-2 border-l-2 pl-3" style={{ color: 'var(--text-secondary)', borderColor: 'var(--accent-gold)' }}>{e.transcript}</p>
                <div className="flex justify-between items-center text-[10px]">
                  <span style={{ color: 'var(--text-muted)' }}>{e.source} &middot; {e.time}</span>
                  <span className="font-mono" style={{ color: '#818CF8' }}>{e.constitutionalLink}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Brief */}
        <div className="border rounded-lg p-6 mb-8" style={{ borderColor: 'var(--accent-gold)', background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">\u{1F4CA}</span>
            <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--accent-gold)' }}>Daily Intelligence Brief — June 20, 2026</h2>
          </div>
          <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p><strong style={{ color: 'var(--text-primary)' }}>Policy:</strong> Parliamentary committee session raised concerns about AI governance timeline. Opposition members described the AI policy withdrawal as a governance failure requiring urgent remedy.</p>
            <p><strong style={{ color: 'var(--text-primary)' }}>Rights:</strong> SAHRC digital rights report referenced in parliamentary debate. Calls for automated decision-making safeguards gaining institutional traction.</p>
            <p><strong style={{ color: 'var(--text-primary)' }}>Municipal:</strong> SASSA grant processing system flagged for lack of algorithmic transparency. Multiple committee members requested oversight mechanisms.</p>
          </div>
          <p className="text-xs mt-4 font-mono" style={{ color: 'var(--text-muted)' }}>3 sources monitored &middot; 147 transcripts processed &middot; 12 constitutional signals detected</p>
        </div>

        {/* Active Sources */}
        <div className="border rounded-lg p-6 mb-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Monitored Sources</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Source</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Type</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Status</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Transcripts</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((s) => (
                  <tr key={s.name} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-3 font-medium">{s.name}</td>
                    <td className="py-3"><span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>{s.type}</span></td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${s.status === "Active" ? "text-green-500" : ""}`} style={{ color: s.status !== "Active" ? 'var(--accent-gold)' : undefined }}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-green-500" : "bg-amber-500"}`} />
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono" style={{ color: 'var(--text-secondary)' }}>{s.transcripts}</td>
                    <td className="py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{s.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Interactive demo &middot; Live monitoring available for pilot partners &middot; <a href="/contact" className="underline" style={{ color: 'var(--accent-gold)' }}>Contact us</a>
        </p>
      </section>
      <Footer />
    </>
  );
}
