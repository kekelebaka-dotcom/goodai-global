import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { countries } from "@/data/countries";

const pillars = [
  { name: "Policy Readiness", desc: "National AI strategies, regulatory frameworks, governance institutions, and legislative preparedness." },
  { name: "Compute Capacity", desc: "Data centre infrastructure, cloud access, energy availability, and hardware accessibility." },
  { name: "Talent Pipeline", desc: "AI researchers, engineers, data scientists, and institutional training capacity." },
  { name: "Institutional Strength", desc: "Government coordination, regulatory bodies, standards organisations, and public-sector capability." },
  { name: "Application Ecosystem", desc: "Startups, enterprise adoption, sector-specific deployments, and local value creation." },
];

export default function IndexPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">Flagship Intelligence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">The Africa AI Index</h1>
        <p className="t-text2 text-base leading-relaxed mb-12 max-w-2xl">
          Tracking what matters: not just who has AI, but who controls the infrastructure, who governs the deployment, and who benefits from the outcomes.
        </p>

        {/* Methodology */}
        <div className="t-surface border t-border rounded-lg p-8 mb-12">
          <h2 className="font-serif text-xl font-bold mb-6">Methodology: Five Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <div key={p.name} className="text-center">
                <div className="font-mono text-2xl font-bold t-gold mb-2">{i + 1}</div>
                <div className="text-sm font-semibold mb-1">{p.name}</div>
                <div className="text-xs t-muted leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Cards */}
        <h2 className="font-serif text-xl font-bold mb-6">Country Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {countries.map((c) => (
            <div key={c.name} className="t-card border t-border rounded-lg p-5 card-hover">
              <div className="text-2xl mb-2">{c.flag}</div>
              <div className="text-lg font-semibold mb-4">{c.name}</div>
              <div className="space-y-3">
                {[
                  { label: "Policy Readiness", val: c.policy },
                  { label: "Compute Capacity", val: c.compute },
                  { label: "Talent Pipeline", val: c.talent },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="t-muted">{m.label}</span>
                      <span className="font-mono t-gold">{m.val}</span>
                    </div>
                    <div className="h-1.5 t-bg2 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F4B63D] rounded-full" style={{ width: `${m.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <span className="inline-block font-mono text-[10px] tracking-wider uppercase px-4 py-2 rounded border border-[rgba(244,182,61,0.25)] t-gold bg-[rgba(244,182,61,0.05)]">
            Full Index — Coming Q3 2026
          </span>
          <p className="text-[10px] t-muted max-w-md mx-auto">
            Scores shown are preliminary assessments based on publicly available data. Full methodology and verified country assessments will be published with the complete index.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
