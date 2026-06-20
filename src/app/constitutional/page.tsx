import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { constitutionalDesks } from "@/data/constitutional-desks";
import { towns } from "@/data/towns";
import { evidenceRecords } from "@/data/evidence";

export default function ConstitutionalPage() {
  const tier5 = evidenceRecords.filter((e) => e.tier === 5);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#22C55E]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#22C55E]">Constitutional Observatory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Ubuntu AI Constitutional Signal Desk</h1>
        <p className="t-text2 text-base leading-relaxed mb-4 max-w-2xl">
          South Africa&apos;s first citizen-driven AI constitutional observatory — monitoring how artificial intelligence affects equality, dignity, education, employment, privacy, and governance across 57 towns.
        </p>
        <p className="text-sm t-muted mb-12 max-w-2xl">
          Building court-ready evidence for constitutional litigation under Sections 9, 14, 22, 26, 27, 29, 33, 34, 152, and 195 of the Constitution of South Africa.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { label: "Signal Desks", val: "8", color: "#22C55E" },
            { label: "Target Towns", val: "57", color: "#F4B63D" },
            { label: "Evidence Records", val: String(evidenceRecords.length), color: "#818CF8" },
            { label: "Pilot Sites", val: String(towns.length), color: "#34D399" },
          ].map((m) => (
            <div key={m.label} className="t-card border t-border rounded-lg p-4 text-center">
              <div className="font-mono text-2xl font-bold" style={{ color: m.color }}>{m.val}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider t-muted mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* 8 Desks */}
        <h2 className="font-serif text-xl font-bold mb-4">Signal Desks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
          {constitutionalDesks.map((d) => (
            <div key={d.id} className="t-card border t-border rounded-md p-4 flex items-start gap-3 hover:border-[rgba(34,197,94,0.3)] transition-colors">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${d.status === "red" ? "bg-red-500" : d.status === "amber" ? "bg-[#F4B63D]" : "bg-green-500"}`} />
              <div>
                <div className="text-sm font-semibold mb-0.5">{d.name}</div>
                <div className="text-xs t-muted leading-relaxed mb-1">{d.finding}</div>
                <div className="flex gap-3 items-center">
                  <span className="font-mono text-[10px] t-text2 uppercase tracking-wider">Tier {d.tier} &middot; {d.tierLabel}</span>
                  <span className="font-mono text-[10px] text-[#818CF8]">{d.constitutionalSection}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Municipal AI Readiness */}
        <h2 className="font-serif text-xl font-bold mb-4">Municipal AI Readiness Index</h2>
        <div className="t-card border t-border rounded-lg p-6 mb-12 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b t-border">
                <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Town</th>
                <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Municipality</th>
                <th className="text-left py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Province</th>
                <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider t-muted">AI Access</th>
                <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Language</th>
                <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Offline</th>
                <th className="text-center py-2 font-mono text-[10px] uppercase tracking-wider t-muted">Response</th>
              </tr>
            </thead>
            <tbody>
              {towns.map((t) => (
                <tr key={t.id} className="border-b border-[rgba(240,237,232,0.05)] hover:bg-[#161C24] transition-colors">
                  <td className="py-3 font-medium">{t.name}</td>
                  <td className="py-3 t-text2">{t.municipality}</td>
                  <td className="py-3 t-text2">{t.province}</td>
                  <td className="py-3 text-center font-mono t-gold">{t.aiAccessScore}</td>
                  <td className="py-3 text-center font-mono t-text2">{t.languageSupport}%</td>
                  <td className="py-3 text-center font-mono t-text2">{t.offlineAccess}%</td>
                  <td className="py-3 text-center font-mono t-text2">{t.responseTime}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Evidence */}
        <h2 className="font-serif text-xl font-bold mb-4">Tier 5 Evidence — Constitutional Significance</h2>
        <div className="space-y-3 mb-12">
          {tier5.map((e) => (
            <div key={e.id} className="t-card border t-border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[10px] t-gold uppercase tracking-wider font-semibold">{e.desk}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400">Tier 5</span>
              </div>
              <p className="text-sm t-text2 leading-relaxed mb-2">{e.finding}</p>
              <div className="flex justify-between items-center text-[10px] t-muted">
                <span>Source: {e.source}</span>
                <span className="font-mono text-[#818CF8]">{e.constitutionalRight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/constitutional/engage" className="t-card border t-border rounded-lg p-6 text-center card-hover">
            <div className="text-2xl mb-2">📢</div>
            <div className="font-semibold text-sm mb-1">Report AI Inequality</div>
            <div className="text-xs t-muted">Submit evidence from your community</div>
          </Link>
          <Link href="/constitutional/engage" className="t-card border t-border rounded-lg p-6 text-center card-hover">
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-semibold text-sm mb-1">Partner With Us</div>
            <div className="text-xs t-muted">NGOs, municipalities, universities</div>
          </Link>
          <Link href="/constitutional/engage" className="t-card border t-border rounded-lg p-6 text-center card-hover">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="font-semibold text-sm mb-1">Constitutional Dossier</div>
            <div className="text-xs t-muted">View the full evidence database</div>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
