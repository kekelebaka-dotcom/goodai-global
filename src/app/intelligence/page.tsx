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
  { name: "Newzroom Afrika — AI Policy Under Scrutiny", type: "Video", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", transcripts: 24, cost: "$4.32/day", retention: "Warm (30d)", lastUpdate: "2h ago", youtubeId: "4z6LQLhRokU" },
  { name: "SABC News — AI in Healthcare", type: "Video", status: "Active", provider: "OpenAI gpt-4o-mini-transcribe", transcripts: 68, cost: "$4.32/day", retention: "Warm (30d)", lastUpdate: "45m ago", youtubeId: "s53KW4qKe0I" },
  { name: "CGTN Africa — SA First AI Factory", type: "Video", status: "Active", provider: "AssemblyAI Universal-2", transcripts: 55, cost: "$3.60/day", retention: "Hot (72h)", lastUpdate: "1h ago", youtubeId: "ijrZ4N6n6xo" },
];

/* Transcript segments based on the real Newzroom Afrika report on AI Policy withdrawal */
const transcriptSegments = [
  { time: "00:00", text: "South Africa's draft National AI Policy is under scrutiny following reports that cited sources cannot be verified.", entities: ["AI Policy"] },
  { time: "00:06", text: "According to a News24 exposé, some of the academic journals used to compile the draft report were fictitious.", entities: ["News24"] },
  { time: "00:14", text: "The Department of Communications and Digital Technologies published the policy for public comment before the irregularities were discovered.", entities: ["DCDT"] },
  { time: "00:22", text: "Questions are being raised about the use of AI-generated content in a government policy document meant to govern artificial intelligence itself.", entities: ["AI-generated content"] },
  { time: "00:31", text: "The Portfolio Committee on Communications has summoned the department to account for the withdrawal and the path forward for AI governance in South Africa.", entities: ["Portfolio Committee", "AI governance"] },
];

/* Real data: SASSA algorithmic grant processing — sourced from Context/TRF (June 2025), IOL (May 2026), Business Day (Feb 2026) */
const detectedEntities = [
  { entity: "SASSA Automated Means Test", type: "System", mentions: 5, confidence: 0.97, constitutional: "Section 33, 27", sentiment: -0.62, source: "Context by Thomson Reuters Foundation, June 2025" },
  { entity: "89.7% Erroneous Exclusion Rate", type: "Statistic", mentions: 2, confidence: 0.95, constitutional: "Section 9, 27", sentiment: -0.78, source: "IEJ/Context research survey of 900 respondents" },
  { entity: "68,000 Grants Suspended", type: "Impact", mentions: 3, confidence: 0.96, constitutional: "Section 27", sentiment: -0.55, source: "IOL, May 25, 2026" },
  { entity: "Biometric Verification Rollout", type: "System", mentions: 4, confidence: 0.93, constitutional: "Section 14, 33", sentiment: -0.22, source: "TechFinancials, May 4, 2026" },
  { entity: "98% Appeal Rejection Rate", type: "Statistic", mentions: 2, confidence: 0.94, constitutional: "Section 33, 34", sentiment: -0.81, source: "SASSA data via Context/TRF, 2024 financial year" },
  { entity: "R1 Billion Fiscal Recovery", type: "Financial", mentions: 1, confidence: 0.91, constitutional: "Section 195", sentiment: 0.15, source: "IOL, May 25, 2026" },
];

const evidenceCards = [
  { entity: "SASSA Automated Means Test — 89.7% Exclusion", source: "Context by Thomson Reuters Foundation", provider: "OpenAI gpt-4o-mini-transcribe", confidence: 0.97, constitutionalLink: "Section 33 (Just Administrative Action), Section 27 (Social Security)", transcript: "...an IEJ survey of 900 people found only 10.3% of eligible respondents received grants — an erroneous exclusion rate of 89.7%. 80% of rejections were based on the bank verification test, which should only cover 24% of cases...", time: "June 2025", tier: 5, r2Key: "goodai-derived/2025/06/30/context-trf/sassa-algo-analysis.json", sha256: "c4a91b...e73f", retention: "Cold" },
  { entity: "68,000 Grants Suspended via Biometrics", source: "IOL / Parliament briefing", provider: "OpenAI gpt-4o-mini-transcribe", confidence: 0.96, constitutionalLink: "Section 14 (Privacy), Section 33 (Just Administrative Action)", transcript: "...997,379 beneficiaries biometrically verified since September 2025, with 67,868 grants suspended in Q3 alone. Most non-verification cases driven by unsuccessful facial recognition attempts on online platforms...", time: "May 2026", tier: 5, r2Key: "goodai-derived/2026/05/25/iol/sassa-biometric-suspension.json", sha256: "f2e8a3...b91d", retention: "Warm" },
  { entity: "AI Policy Withdrawal — Fictitious Citations", source: "Parliament.gov.za / Reuters", provider: "OpenAI gpt-4o-mini-transcribe", confidence: 0.98, constitutionalLink: "Section 195 (Public Administration)", transcript: "...the Portfolio Committee on Communications and Digital Technologies will receive a briefing on the withdrawal of the AI National Policy document, following allegations that portions contained AI-generated content with fictitious and unverifiable sources...", time: "May 2026", tier: 5, r2Key: "goodai-derived/2026/05/26/parliament/ai-policy-withdrawal-briefing.json", sha256: "d1c7b5...a42e", retention: "Cold" },
];

/* GoodAI Global production infrastructure — what we build with */
const techStack = [
  { layer: "API & Ingestion Layer", component: "Workers", role: "Our source registration, webhooks, and operator API endpoints", icon: "\u{2601}\u{FE0F}" },
  { layer: "Pipeline Orchestration", component: "Queues", role: "Our event backbone — decoupling ingest, ASR, enrichment, and reporting", icon: "\u{1F4E8}" },
  { layer: "Background Processing", component: "Workflows", role: "Our backfills, report generation, and nightly benchmarks", icon: "\u{2699}\u{FE0F}" },
  { layer: "Source Coordination", component: "Durable Objects", role: "Our per-source session state, dedup windows, and live cursors", icon: "\u{1F517}" },
  { layer: "Evidence Archive", component: "R2", role: "Our immutable media store — raw audio, transcripts, reports ($0.015/GB)", icon: "\u{1F4BE}" },
  { layer: "Intelligence Database", component: "D1", role: "Our 12-table relational schema — sources, chunks, mentions, reports", icon: "\u{1F5C3}\u{FE0F}" },
  { layer: "Semantic Search", component: "Vectorize", role: "Our transcript embeddings and mention retrieval engine", icon: "\u{1F50E}" },
  { layer: "Replay & Review", component: "Stream", role: "Our short-form replay, clip creation, and analyst review interface", icon: "\u{1F3AC}" },
  { layer: "Media Processing", component: "Containers", role: "Our FFmpeg probe, audio extraction, format normalisation pipeline", icon: "\u{1F4E6}" },
  { layer: "ASR Provider Routing", component: "AI Gateway", role: "Our provider router — retry, fallback, rate limiting between AMD and managed ASR", icon: "\u{1F6E1}\u{FE0F}" },
  { layer: "Local AI Inference", component: "AMD MI300X", role: "Our primary ASR, diarization, and LLM summarisation engine", icon: "\u{1F9E0}" },
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
                      <td className="py-3 font-medium">
                      <div className="flex items-center gap-2">
                        {(s as any).youtubeId && <img src={`https://img.youtube.com/vi/${(s as any).youtubeId}/default.jpg`} alt="" className="w-12 h-9 rounded object-cover shrink-0" />}
                        <span>{s.name}</span>
                      </div>
                    </td>
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
                  <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Newzroom Afrika — SA Draft AI Policy Under Scrutiny</h2>
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
                    <div className="text-sm font-semibold mb-1">South Africa&apos;s Draft National AI Policy Under Scrutiny — Newzroom Afrika</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Real broadcast source &middot; Audio extracted for ASR demo &middot; youtube.com/watch?v=4z6LQLhRokU</div>
                  </div>
                </div>
                <audio controls className="w-full" style={{ height: '40px' }}>
                  <source src={DEMO_AUDIO_URL} type="audio/mpeg" />
                </audio>
                <div className="mt-4">
                  <div className="aspect-video rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/4z6LQLhRokU" title="Newzroom Afrika — SA Draft AI Policy Under Scrutiny" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                  </div>
                  <p className="font-mono text-[9px] mt-2 text-center" style={{ color: 'var(--text-muted)' }}>Source: Newzroom Afrika (YouTube) — Our pipeline extracts audio, generates transcript, and detects entities automatically</p>
                </div>
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
                          {seg.text.split(/(AI Policy|News24|DCDT|AI-generated content|Portfolio Committee|AI governance|Department of Communications)/gi).map((part, j) =>
                            /AI Policy|News24|DCDT|AI-generated content|Portfolio Committee|AI governance|Department of Communications/i.test(part)
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
                      {["Entity", "Type", "Mentions", "Confidence", "Sentiment", "Constitutional", "Source"].map((h) => (
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
                        <td className="py-3 text-[10px] max-w-[180px]" style={{ color: 'var(--text-muted)' }}>{(e as any).source || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Monitored Sources */}
            <div className="border rounded-lg p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Additional Monitored Sources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  <div className="aspect-video">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/s53KW4qKe0I" title="SABC News — AI in Healthcare" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold mb-1">SABC News — AI in Healthcare</div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--text-muted)' }}>Desk: Signal Desk &middot; Entities: AI healthcare, patient care, emergency response</div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  <div className="aspect-video">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ijrZ4N6n6xo" title="CGTN Africa — SA First AI Factory" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold mb-1">CGTN Africa — SA Launches First AI Factory</div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--text-muted)' }}>Desk: Compute Desk &middot; Entities: Altron, Nvidia, data sovereignty, compute infrastructure</div>
                  </div>
                </div>
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
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>GoodAI Global Infrastructure</h2>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>Our platform architecture for production media intelligence. Cloudflare-first control plane + AMD GPU inference plane.</p>
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
