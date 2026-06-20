"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const pipelineSteps = [
  { label: "Source", count: 3, color: "#818CF8", icon: "📡" },
  { label: "Ingest", count: 312, color: "#34D399", icon: "📥" },
  { label: "Transcribe", count: 147, color: "#F4B63D", icon: "📝" },
  { label: "Detect", count: 892, color: "#F97316", icon: "🔍" },
  { label: "Evidence", count: 234, color: "#22C55E", icon: "📋" },
  { label: "Brief", count: 18, color: "#C084FC", icon: "📊" },
];

const sources = [
  { name: "SA Parliamentary Audio", status: "Active", transcripts: 24, lastUpdate: "2h ago" },
  { name: "SABC News Radio", status: "Active", transcripts: 68, lastUpdate: "45m ago" },
  { name: "EWN Radio", status: "Monitoring", transcripts: 55, lastUpdate: "1h ago" },
];

const recentTranscripts = [
  { source: "SABC News Radio", time: "14:32 UTC", preview: "The Minister of Communications confirmed that the revised AI policy framework will undergo public comment in early 2027, addressing concerns about...", entities: ["Minister of Communications", "AI Policy", "2027"] },
  { source: "SA Parliamentary Audio", time: "11:15 UTC", preview: "During the portfolio committee session, members raised questions about algorithmic bias in SASSA grant processing systems, citing reports from...", entities: ["SASSA", "Algorithmic Bias", "Portfolio Committee"] },
  { source: "EWN Radio", time: "09:48 UTC", preview: "The South African Human Rights Commission has released its latest report on digital rights, calling for urgent protections against automated decision-making in...", entities: ["SAHRC", "Digital Rights", "Automated Decisions"] },
];

const evidenceCards = [
  { entity: "AI Policy Withdrawal", source: "SABC News Radio", confidence: 0.94, constitutionalLink: "Section 195", transcript: "...the withdrawal of the draft national AI policy was described by opposition members as a significant governance failure...", time: "14:32 UTC" },
  { entity: "SASSA Algorithmic Processing", source: "SA Parliamentary Audio", confidence: 0.87, constitutionalLink: "Section 33", transcript: "...concerns were raised about the lack of transparency in AI-assisted grant eligibility determinations...", time: "11:15 UTC" },
];

export default function IntelligencePage() {
  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#F4B63D]" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F4B63D]">Media Intelligence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Intelligence Dashboard</h1>
          </div>
          <span className="inline-block font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded border border-[rgba(59,130,246,0.3)] text-[#3B82F6] bg-[rgba(59,130,246,0.08)]">
            Demo Environment
          </span>
        </div>

        {/* Pipeline Flow */}
        <div className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg p-6 mb-6">
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">Pipeline Status</h2>
          <div className="flex items-center justify-between overflow-x-auto gap-2">
            {pipelineSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.count}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#6B6862]">{s.label}</div>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <svg width="24" height="12" className="text-[#6B6862] shrink-0 mx-1"><path d="M0 6h20M16 2l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1" /></svg>
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
            <div key={m.label} className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg p-4 text-center">
              <div className="font-mono text-2xl font-bold" style={{ color: m.color }}>{m.val}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#6B6862] mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Active Sources */}
        <div className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg p-6 mb-6">
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">Active Sources</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(240,237,232,0.08)]">
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-medium">Source</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-medium">Status</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-medium">Transcripts</th>
                  <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider text-[#6B6862] font-medium">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((s) => (
                  <tr key={s.name} className="border-b border-[rgba(240,237,232,0.05)]">
                    <td className="py-3 text-[#F0EDE8] font-medium">{s.name}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${s.status === "Active" ? "text-green-400" : "text-[#F4B63D]"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-green-400" : "bg-[#F4B63D]"}`} />
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm text-[#A8A49E]">{s.transcripts}</td>
                    <td className="py-3 text-xs text-[#6B6862]">{s.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transcripts */}
        <div className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg p-6 mb-6">
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">Recent Transcripts</h2>
          <div className="space-y-4">
            {recentTranscripts.map((t, i) => (
              <div key={i} className="border border-[rgba(240,237,232,0.05)] rounded-md p-4 hover:border-[rgba(240,237,232,0.12)] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-[#A8A49E]">{t.source}</span>
                  <span className="font-mono text-[10px] text-[#6B6862]">{t.time}</span>
                </div>
                <p className="text-sm text-[#A8A49E] leading-relaxed mb-2">{t.preview}</p>
                <div className="flex gap-2 flex-wrap">
                  {t.entities.map((e) => (
                    <span key={e} className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-[rgba(244,182,61,0.1)] text-[#F4B63D]">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg p-6 mb-6">
          <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">Evidence Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceCards.map((e, i) => (
              <div key={i} className="border border-[rgba(240,237,232,0.08)] rounded-md p-4 bg-[#0F1318]">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs font-semibold text-[#F4B63D]">{e.entity}</span>
                  <span className="font-mono text-[10px] text-green-400">{(e.confidence * 100).toFixed(0)}% confidence</span>
                </div>
                <p className="text-xs text-[#A8A49E] italic leading-relaxed mb-2 border-l-2 border-[#8A6420] pl-3">{e.transcript}</p>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#6B6862]">{e.source} &middot; {e.time}</span>
                  <span className="font-mono text-[#818CF8]">{e.constitutionalLink}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Brief Preview */}
        <div className="bg-[#111520] border border-[rgba(244,182,61,0.25)] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#F4B63D] font-semibold">Daily Intelligence Brief — June 20, 2026</h2>
          </div>
          <div className="space-y-3 text-sm text-[#A8A49E]">
            <p><strong className="text-[#F0EDE8]">Policy:</strong> Parliamentary committee session raised concerns about AI governance timeline. Opposition members described the AI policy withdrawal as a governance failure requiring urgent remedy.</p>
            <p><strong className="text-[#F0EDE8]">Rights:</strong> SAHRC digital rights report referenced in parliamentary debate. Calls for automated decision-making safeguards gaining institutional traction.</p>
            <p><strong className="text-[#F0EDE8]">Municipal:</strong> SASSA grant processing system flagged for lack of algorithmic transparency. Multiple committee members requested oversight mechanisms.</p>
          </div>
          <p className="text-xs text-[#6B6862] mt-4 font-mono">3 sources monitored &middot; 147 transcripts processed &middot; 12 constitutional signals detected</p>
        </div>

        <p className="text-center text-xs text-[#6B6862] mt-8 font-mono uppercase tracking-wider">
          Demo environment — Live monitoring available for pilot partners
        </p>
      </section>
      <Footer />
    </>
  );
}
