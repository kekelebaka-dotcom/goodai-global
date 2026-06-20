"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
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
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F4B63D]">Contact</span>
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">Get In Touch</h1>
        <p className="text-[#A8A49E] text-sm mb-8">For media inquiries, partnerships, policy collaboration, research engagement, or speaking requests.</p>

        {submitted && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-md p-4 mb-6">Thank you for your inquiry. We will respond within 48 hours.</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A8A49E] mb-2">Name *</label>
              <input type="text" required className="w-full bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#F4B63D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A8A49E] mb-2">Email *</label>
              <input type="email" required className="w-full bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#F4B63D] transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A8A49E] mb-2">Organization</label>
            <input type="text" className="w-full bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#F4B63D] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A8A49E] mb-2">Inquiry Type *</label>
            <select required className="w-full bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#F4B63D] transition-colors">
              <option value="">Select type</option>
              <option>Media Inquiry</option>
              <option>Partnership</option>
              <option>Policy Collaboration</option>
              <option>Research</option>
              <option>Speaking Request</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A8A49E] mb-2">Message *</label>
            <textarea required rows={5} className="w-full bg-[#0F1318] border border-[rgba(240,237,232,0.08)] rounded px-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#F4B63D] transition-colors" />
          </div>
          <button type="submit" className="bg-[#F4B63D] text-[#05070B] font-mono text-xs tracking-wider uppercase px-6 py-3 rounded font-semibold hover:bg-[#d9a235] transition-colors">
            Send Inquiry
          </button>
        </form>

        <div className="border-t border-[rgba(240,237,232,0.08)] pt-8 text-sm text-[#6B6862]">
          <p className="mb-2">Johannesburg, South Africa</p>
          <a href="https://www.linkedin.com/company/goodai-global/" target="_blank" rel="noopener noreferrer" className="text-[#F4B63D] hover:underline">LinkedIn &rarr;</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
