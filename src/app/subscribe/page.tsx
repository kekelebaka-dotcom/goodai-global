"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SubscribePage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="flex items-center gap-2 justify-center mb-2">
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F4B63D]">Newsletter</span>
          <span className="w-6 h-px bg-[#F4B63D]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">The Good AI Signal</h1>
        <p className="text-[#A8A49E] text-base leading-relaxed mb-10 max-w-lg mx-auto">
          A strategic intelligence briefing on the institutions, infrastructure, and power dynamics shaping AI in Africa. Delivered weekly.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-8">
            <div className="text-2xl mb-2">&#10003;</div>
            <div className="font-semibold mb-1">Subscribed</div>
            <div className="text-sm">Welcome to The Good AI Signal. Your first briefing arrives next week.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
            <input type="email" required placeholder="Enter your email" className="flex-1 bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] placeholder:text-[#6B6862] outline-none focus:border-[#F4B63D] transition-colors" />
            <button type="submit" className="bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-6 py-3 rounded font-semibold hover:bg-[#d9a235] transition-colors">
              Subscribe
            </button>
          </form>
        )}

        <div className="text-left max-w-md mx-auto">
          <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#A8A49E] mb-4 font-semibold">What Subscribers Receive</h3>
          <ul className="space-y-3">
            {[
              "Signal Desk Briefs — deep editorial analysis on AI power dynamics in Africa",
              "Africa AI Index Updates — quarterly country readiness assessments",
              "Constitutional Observatory Reports — evidence tracking from 57 South African towns",
              "Media Intelligence Summaries — transcript-backed intelligence from monitored sources",
              "Early access to research, reports, and institutional publications",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#A8A49E]">
                <span className="w-1.5 h-1.5 bg-[#F4B63D] rounded-full mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
