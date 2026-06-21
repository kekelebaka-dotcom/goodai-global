"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEMO_AUDIO_URL } from "@/data/images";

/* ── Blueprint-aligned pipeline (queue names from the MVP Blueprint) ── */
const pipelineSteps = [
  { label: "Source", queue: "Ingress Worker", count: 3, color: "#818CF8", icon: "\u{1F4E1}" },
  { label: "q.media.segment", queue: "FFmpeg Container", count: 312, color: "#34D399", icon: "\u{1F4E5}" },
  { label: "q.asr.request", queue: "ASR Router", count: 147, color: "#F4B63D", icon: "\u{1F4DD}" },
  { label: "q.enrich", queue: "NLP Pipeline", count: 892, color: "#F97316", icon: "\u{1F50D}" },
  { label: "q.report.build", queue: "Workflow", count: 18, color: "#C084FC", icon: "\u{1F4CA}" },
  { label: "q.alerts", queue: "Dispatcher", count: 42, color: "#EF4444", icon: "\u{1F514}" },
];

const sources = [
  { name: "SA Parliamentary Audio", type: "Radio", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", transcripts: 24, cost: "$4.32/day", retention: "Warm (30d)", lastUpdate: "2h ago" },
  { name: "SABC News Radio", type: "Radio", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", transcripts: 68, cost: "$4.32/day", retention: "Warm (30d)", lastUpdate: "45m ago" },
  { name: "EWN Radio", type: "Radio", status: "Monitoring", provider: "AssemblyAI Universal-2", transcripts: 55, cost: "$3.60/day", retention: "Hot (72h)", lastUpdate: "1h ago" },
];

const transcriptSegments = [
  { time: "00:00", text: "Order, members. We now turn to the report on artificial intelligence deployment in government services.", entities: [] },
  { time: "00:08", text: "The committee has received submissions regarding the status of the revised national AI policy.", entities: ["AI policy"] },
  { time: "00:14", text: "I wish to raise the matter of algorithmic decision-making in social grant processing.", entities: ["algorithmic decision"] },
  { time: "00:22", text: "We have received reports that SASSA is using automated systems to flag and reject grant applications without adequate human oversight.", entities: ["SASSA", "grant applications"] },
  { time: "00:31", text: "The revised AI policy framework, targeted for public comment by January 2027, will address these gaps.", entities: ["AI policy", "January 2027"] },
];

const detectedEntities = [
  { entity: "SASSA", type: "Organization", mentions: 3, confidence: 0.96, constitutional: "Section 33", sentiment: -0.42 },
  { entity: "AI Policy Framework", type: "Policy", mentions: 2, confidence: 0.94, constitutional: "Section 195", sentiment: -0.18 },
  { entity: "Algorithmic Decision-Making", type: "Concept", mentions: 2, confidence: 0.91, constitutional: "Section 33, 14", sentiment: -0.55 },
  { entity: "January 2027", type: "Date", mentions: 1, confidence: 0.99, constitutional: "Section 195", sentiment: 0.0 },
  { entity: "Grant Applications", type: "Service", mentions: 1, confidence: 0.88, constitutional: "Section 27", sentiment: -0.38 },
];

const evidenceCards = [
  { entity: "SASSA Algorithmic Processing", source: "SA Parliamentary Audio", provider: "OpenAI gpt-4o-mini-transcribe", confidence: 0.96, constitutionalLink: "Section 33 (Just Administrative Action)", transcript: "...SASSA is using automated systems to flag and reject grant applications without adequate human oversight or appeal mechanisms...", time: "00:22", tier: 5, r2Key: "goodai-raw/2026/06/20/parl-audio/chunk-0022.flac", sha256: "a3f8c1...d92e", retention: "Warm" },
  { entity: "AI Policy Delay", source: "SA Parliamentary Audio", provider: "OpenAI gpt-4o-mini-transcribe", confidence: 0.94, constitutionalLink: "Section 195 (Public Administration)", transcript: "...the revised AI policy framework, targeted for public comment by January 2027, will address these gaps...", time: "00:31", tier: 4, r2Key: "goodai-raw/2026/06/20/parl-audio/chunk-0031.flac", sha256: "b7d2e4...f18a", retention: "Warm" },
];

const techStack = [
  { layer: "Global API Edge", component: "Workers", role: "Source registration, webhooks, operator API", icon: "\u{2601}\u{FE0F}" },
  { layer: "Event Buffering", component: "Queues", role: "Decouple ingest, ASR, enrichment, reporting", icon: "\u{1F4E8}" },
  { layer: "Long Jobs", component: "Workflows", role: "Backfills, report generation, benchmarks", icon: "\u{2699}\u{FE0F}" },
  { layer: "Coordination", component: "Durable Objects", role: "Per-source cursor, dedup, websocket fan-out", icon: "\u{1F517}" },
  { layer: "Raw Storage", component: "R2", role: "Immutable media, transcripts, reports ($0.015/GB)", icon: "\u{1F4BE}" },
  { layer: "Metadata", component: "D1", role: "12-table relational schema, sources to reports", icon: "\u{1F5C3}\u{FE0F}" },
  { layer: "Search", component: "Vectorize", role: "Transcript embeddings, mention retrieval", icon: "\u{1F50E}" },
  { layer: "Video UX", component: "Stream", role: "Short replay, clipping, demo playback", icon: "\u{1F3AC}" },
  { layer: "Media Processing", component: "Containers", role: "FFmpeg probe, mux/demux, OCR helpers", icon: "\u{1F4E6}" },
  { layer: "Provider Routing", component: "AI Gateway", role: "Retry, fallback, rate limiting, analytics", icon: "\u{1F6E1}\u{FE0F}" },
  { layer: "GPU Inference", component: "AMD MI300X", role: "ASR, diarization, vLLM, local agent", icon: "\u{1F9E0}" },
];

export default function IntelligencePage() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const [activeTab, setActiveTab] = useState<"pipeline" | "sources" | "demo" | "evidence" | "stack">("pipeline");

  const tabs = [
    { id: "pipeline" as const, label: "Pipeline" },
    { id: "sources" as const, label: "Sources" },
    { id: "demo" as const, label: "Live Demo" },
    { id: "evidence" as const, label: "Evidence" },
    { id: "stack" as const, label: "Tech Stack" },
  ];

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px" style={{ background: 'var(--accent-gold)' }} />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--accent-gold)' }}>Media Intelligence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Intelligence Dashboard</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Cloudflare-first control plane + AMD GPU inference plane. Real-time media monitoring with transcript-backed constitutional evidence.</p>
          </div>
          <span className="inline-block font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded border border-blue-500/30 text-blue-500 bg-blue-500/5">
            Interactive Demo
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b mb-8 overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`font-mono text-xs tracking-wider uppercase px-4 py-3 transition-colors whitespace-nowrap ${activeTab === t.id ? "border-b-2 font-semibold" : ""}`}
              style={{ color: activeTab === t.id ? 'var(--accent-gold)' : 'var(--text-muted)', borderColor: activeTab === t.id ? 'var(--accent-gold)' : 'transparent' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══ PIPELINE TAB ═══ */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            {/* Pipeline Flow with Queue Names */}
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Pipeline Architecture</h2>
              <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Control-plane / data-plane split. Cloudflare runs orchestration; AMD runs inference.</p>
              <div className="flex items-start justify-between overflow-x-auto gap-1 pb-2">
                {pipelineSteps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-1 shrink-0">
                    <div className="text-center min-w-[90px]">
                      <div className="text-xl mb-1">{s.icon}</div>
                      <div className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.count}</div>
                      <div className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block" style={{ background: `${s.color}15`, color: s.color }}>{s.label}</div>
                      <div className="text-[9px] mt-1" style={{ color: 'var(--text-muted)' }}>{s.queue}</div>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <svg width="20" height="12" className="shrink-0" style={{ color: 'var(--text-muted)' }}><path d="M0 6h16M12 2l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1" /></svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Sources Monitored", val: "3", sub: "Radio / Audio", color: "#818CF8" },
                { label: "Transcripts Today", val: "147", sub: "gpt-4o-mini + U2", color: "#34D399" },
                { label: "Entities Detected", val: "892", sub: "90%+ confidence", color: "#F4B63D" },
                { label: "Evidence Cards", val: "234", sub: "Tier 3-5 rated", color: "#22C55E" },
              ].map((m) => (
                <div key={m.label} className="border rounded-lg p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="font-mono text-2xl font-bold" style={{ color: m.color }}>{m.val}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
                  <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Daily Brief */}
            <div className="border rounded-lg p-6" style={{ borderColor: 'var(--accent-gold)', background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{"\u{1F4CA}"}</span>
                  <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--accent-gold)' }}>Daily Intelligence Brief</h2>
                </div>
                <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--text-muted)' }}>June 20, 2026 &middot; window: 06:00-18:00 SAST</div>
              </div>
              <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <p><strong style={{ color: 'var(--text-primary)' }}>Policy:</strong> Parliamentary committee session raised concerns about AI governance timeline. Opposition members described the AI policy withdrawal as a governance failure requiring urgent remedy.</p>
                <p><strong style={{ color: 'var(--text-primary)' }}>Rights:</strong> SAHRC digital rights report referenced in parliamentary debate. Calls for automated decision-making safeguards gaining institutional traction.</p>
                <p><strong style={{ color: 'var(--text-primary)' }}>Municipal:</strong> SASSA grant processing system flagged for lack of algorithmic transparency. Multiple committee members requested oversight mechanisms.</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>3 sources &middot; 147 transcripts &middot; 12 constitutional signals &middot; signed_at: 2026-06-20T18:00:00Z</p>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: 'var(--accent-gold)', color: 'var(--bg)' }}>Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SOURCES TAB ═══ */}
        {activeTab === "sources" && (
          <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Monitored Sources</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                    {["Source", "Type", "Status", "ASR Provider", "Transcripts", "Est. Cost", "Retention", "Updated"].map((h) => (
                      <th key={h} className="text-left py-2 font-mono text-[9px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sources.map((s) => (
                    <tr key={s.name} className="border-b" style={{ borderColor: 'var(--border)' }}>
                      <td className="py-3 font-medium">{s.name}</td>
                      <td className="py-3"><span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>{s.type}</span></td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs ${s.status === "Active" ? "text-green-500" : ""}`} style={{ color: s.status !== "Active" ? 'var(--accent-gold)' : undefined }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[10px]" style={{ color: '#818CF8' }}>{s.provider}</td>
                      <td className="py-3 font-mono" style={{ color: 'var(--text-secondary)' }}>{s.transcripts}</td>
                      <td className="py-3 font-mono text-[11px]" style={{ color: 'var(--accent-gold)' }}>{s.cost}</td>
                      <td className="py-3"><span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded" style={{ background: s.retention.includes("Hot") ? 'rgba(239,68,68,0.1)' : 'rgba(244,182,61,0.1)', color: s.retention.includes("Hot") ? '#EF4444' : 'var(--accent-gold)' }}>{s.retention}</span></td>
                      <td className="py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{s.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>MVP cost: ~$130/mo per 24/7 channel (OpenAI gpt-4o-mini-transcribe) &middot; AMD self-hosted at 10x RTF: ~$144/mo &middot; AssemblyAI U2: ~$108/mo</p>
            </div>
          </div>
        )}

        {/* ═══ LIVE DEMO TAB ═══ */}
        {activeTab === "demo" && (
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>SA Parliamentary Committee on AI Governance</h2>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-500">Audio</span>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: 'rgba(129,140,248,0.1)', color: '#818CF8' }}>OpenAI gpt-4o-mini-transcribe</span>
                </div>
              </div>
              <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{"\u{1F3A7}"}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1">Portfolio Committee on Communications — AI in Government Services</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Demo Recording &middot; 35 seconds &middot; 16kHz mono PCM &middot; Chunk: 30s storage / 15s inference window</div>
                  </div>
                </div>
                <audio controls className="w-full" style={{ height: '40px' }}>
                  <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
                </audio>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Automated Transcript</h3>
                  <button onClick={() => setShowTranscript(!showTranscript)} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded" style={{ color: 'var(--accent-gold)' }}>
                    {showTranscript ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showTranscript && (
                  <div className="space-y-2">
                    {transcriptSegments.map((seg, i) => (
                      <div key={i} className="flex gap-3 p-2 rounded cursor-pointer transition-colors" onClick={() => setActiveSegment(activeSegment === i ? null : i)}
                        style={{ background: activeSegment === i ? 'var(--accent-gold)' + '08' : 'transparent' }}>
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
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Detected Entities</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                      {["Entity", "Type", "Mentions", "Confidence", "Sentiment", "Constitutional"].map((h) => (
                        <th key={h} className={`${h === "Mentions" || h === "Confidence" || h === "Sentiment" ? "text-center" : "text-left"} py-2 font-mono text-[9px] uppercase tracking-wider font-medium`} style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detectedEntities.map((e) => (
                      <tr key={e.entity} className="border-b" style={{ borderColor: 'var(--border)' }}>
                        <td className="py-3 font-semibold" style={{ color: 'var(--accent-gold)' }}>{e.entity}</td>
                        <td className="py-3"><span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>{e.type}</span></td>
                        <td className="py-3 text-center font-mono">{e.mentions}</td>
                        <td className="py-3 text-center font-mono text-green-500">{(e.confidence * 100).toFixed(0)}%</td>
                        <td className="py-3 text-center font-mono" style={{ color: e.sentiment < -0.3 ? '#EF4444' : e.sentiment < 0 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>{e.sentiment.toFixed(2)}</td>
                        <td className="py-3 font-mono text-[11px]" style={{ color: '#818CF8' }}>{e.constitutional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ EVIDENCE TAB ═══ */}
        {activeTab === "evidence" && (
          <div className="space-y-6">
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Generated Evidence Cards</h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>Every evidence card carries full provenance: source, chunk R2 key, ASR provider, model, confidence, content hash, and retention tier.</p>
              <div className="space-y-4">
                {evidenceCards.map((e, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{e.entity}</span>
                        <div className="flex gap-2">
                          <span className="font-mono text-[10px] text-green-500">{(e.confidence * 100).toFixed(0)}%</span>
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">Tier {e.tier}</span>
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded" style={{ background: 'rgba(244,182,61,0.1)', color: 'var(--accent-gold)' }}>{e.retention}</span>
                        </div>
                      </div>
                      <p className="text-sm italic leading-relaxed mb-3 border-l-2 pl-3" style={{ color: 'var(--text-secondary)', borderColor: 'var(--accent-gold)' }}>{e.transcript}</p>
                      <div className="flex justify-between items-center text-[10px] mb-3">
                        <span style={{ color: 'var(--text-muted)' }}>{e.source} &middot; {e.time}</span>
                        <span className="font-mono" style={{ color: '#818CF8' }}>{e.constitutionalLink}</span>
                      </div>
                    </div>
                    {/* Provenance metadata strip */}
                    <div className="px-4 py-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        <span>provider: <strong style={{ color: 'var(--text-secondary)' }}>{e.provider}</strong></span>
                        <span>r2: <strong style={{ color: 'var(--text-secondary)' }}>{e.r2Key}</strong></span>
                        <span>sha256: <strong style={{ color: 'var(--text-secondary)' }}>{e.sha256}</strong></span>
                        <span>retention: <strong style={{ color: 'var(--text-secondary)' }}>{e.retention} (30d)</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TECH STACK TAB ═══ */}
        {activeTab === "stack" && (
          <div className="space-y-6">
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Technology Stack</h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>Cloudflare-first control plane + AMD GPU inference plane. Every component maps to an official Cloudflare or AMD product.</p>
              <div className="space-y-2">
                {techStack.map((t) => (
                  <div key={t.layer} className="flex items-center gap-4 p-3 rounded-lg border transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                    <span className="text-xl w-8 text-center shrink-0">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold">{t.layer}</span>
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded shrink-0" style={{ background: 'var(--accent-gold)' + '15', color: 'var(--accent-gold)' }}>{t.component}</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>MVP Cost Model (per 24/7 channel)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                      {["Scenario", "ASR Cost/mo", "Storage/mo", "Total/mo"].map((h) => (
                        <th key={h} className="text-left py-2 font-mono text-[9px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { scenario: "24/7 radio, OpenAI mini ASR, 30-day R2 archive", asr: "$129.60", storage: "<$1", total: "$130-132" },
                      { scenario: "24/7 radio, AssemblyAI U2 + diarization", asr: "$122.40", storage: "<$1", total: "$123-125" },
                      { scenario: "24/7 radio, AMD self-host at 10x RTF", asr: "$144.00", storage: "<$1", total: "~$145" },
                      { scenario: "24/7 radio, AMD self-host at 20x RTF", asr: "$72.00", storage: "<$1", total: "~$73" },
                    ].map((r) => (
                      <tr key={r.scenario} className="border-b" style={{ borderColor: 'var(--border)' }}>
                        <td className="py-3" style={{ color: 'var(--text-secondary)' }}>{r.scenario}</td>
                        <td className="py-3 font-mono" style={{ color: 'var(--accent-gold)' }}>{r.asr}</td>
                        <td className="py-3 font-mono" style={{ color: 'var(--text-muted)' }}>{r.storage}</td>
                        <td className="py-3 font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>{r.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] mt-3 font-mono" style={{ color: 'var(--text-muted)' }}>Source: GoodAI Global Media Intelligence MVP Blueprint. AMD becomes default when local ASR + diarization + LLM summarization + embeddings share the GPU budget.</p>
            </div>

            {/* Retention Policy */}
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Retention Policy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { tier: "Hot", window: "24-72 hours", what: "Live replay, latest transcripts, queue artifacts", where: "Stream + R2 + D1", color: "#EF4444" },
                  { tier: "Warm", window: "30-90 days", what: "Raw audio/video, diarization, operator exports", where: "R2 standard", color: "#F4B63D" },
                  { tier: "Cold", window: "1-3 years", what: "Report PDFs, mention facts, benchmark gold sets", where: "R2 infrequent + D1", color: "#3B82F6" },
                  { tier: "Ephemeral", window: "4-14 days", what: "Queue messages, Workflow working state", where: "Queues + Workflows", color: "#6B6862" },
                ].map((t) => (
                  <div key={t.tier} className="border rounded-md p-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                      <span className="font-mono text-xs font-bold" style={{ color: t.color }}>{t.tier}</span>
                    </div>
                    <div className="font-mono text-[10px] mb-1" style={{ color: 'var(--text-secondary)' }}>{t.window}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t.what}</div>
                    <div className="text-[9px] mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>{t.where}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs font-mono uppercase tracking-wider mt-10" style={{ color: 'var(--text-muted)' }}>
          Interactive demo &middot; Architecture from the GoodAI Global Media Intelligence MVP Blueprint &middot; <a href="/contact" className="underline" style={{ color: 'var(--accent-gold)' }}>Contact for pilot access</a>
        </p>
      </section>
      <Footer />
    </>
  );
}
