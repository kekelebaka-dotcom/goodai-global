"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function EngagePage() {
  const [tab, setTab] = useState<"report" | "partner" | "volunteer">("report");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#22C55E]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#22C55E]">Engage</span>
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">Engage With Us</h1>
        <p className="t-text2 text-sm mb-8">Join the movement to monitor AI inequality and defend constitutional rights in South Africa.</p>

        <div className="flex gap-1 border-b t-border mb-8">
          {(["report", "partner", "volunteer"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`font-mono text-xs tracking-wider uppercase px-4 py-3 transition-colors ${tab === t ? "t-gold border-b-2 border-[#F4B63D]" : "t-muted hover:text-[#A8A49E]"}`}>
              {t === "report" ? "Report AI Inequality" : t === "partner" ? "Partner With Us" : "Volunteer"}
            </button>
          ))}
        </div>

        {submitted && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-md p-4 mb-6">
            Thank you! Your submission has been received.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === "report" && (
            <>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Your Name (Optional)</label>
                <input type="text" className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Town *</label>
                <input type="text" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Municipality *</label>
                <input type="text" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Signal Type *</label>
                <select required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors">
                  <option value="">Select type</option>
                  <option>Inequality &amp; AI Access</option>
                  <option>Digital Infrastructure</option>
                  <option>Education &amp; Youth</option>
                  <option>Employment &amp; Displacement</option>
                  <option>Municipal AI Gap</option>
                  <option>Privacy &amp; Automated Decisions</option>
                  <option>AI Policy</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Description *</label>
                <textarea required rows={4} placeholder="Describe the AI inequality or issue you've observed..." className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text placeholder:text-[#6B6862] outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
            </>
          )}
          {tab === "partner" && (
            <>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Organization *</label>
                <input type="text" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Your Name *</label>
                <input type="text" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Email *</label>
                <input type="email" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Role *</label>
                <select required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors">
                  <option value="">Select role</option>
                  <option>Municipal Official</option>
                  <option>NGO Representative</option>
                  <option>Academic / Researcher</option>
                  <option>Journalist</option>
                  <option>Business Leader</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">How can we collaborate? *</label>
                <textarea required rows={4} className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
            </>
          )}
          {tab === "volunteer" && (
            <>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Your Name *</label>
                <input type="text" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Email *</label>
                <input type="email" required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Desired Role *</label>
                <select required className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors">
                  <option value="">Select role</option>
                  <option>Researcher (Desktop Evidence)</option>
                  <option>Data Analyst (Primary Evidence)</option>
                  <option>Legal Assistant</option>
                  <option>Technical (AI Tools)</option>
                  <option>Outreach (Stakeholders)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider t-text2 mb-2">Why do you want to volunteer? *</label>
                <textarea required rows={4} className="w-full t-surface border t-border rounded px-4 py-3 text-sm t-text outline-none focus:border-[#F4B63D] transition-colors" />
              </div>
            </>
          )}
          <button type="submit" className="bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-6 py-3 rounded font-semibold hover:bg-[#d9a235] transition-colors">
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
