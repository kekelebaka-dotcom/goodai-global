import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase t-gold">About</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-12">About Good AI Global</h1>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">Why We Exist</h2>
          <p className="t-text2 leading-relaxed mb-4">
            Artificial intelligence is not just a technology trend. It is a power infrastructure question. AI is reshaping how states govern, how markets allocate resources, how institutions make decisions, and how citizens interact with the systems that affect their lives. This transformation is happening faster than most institutions can adapt — and Africa is no exception.
          </p>
          <p className="t-text2 leading-relaxed">
            GoodAI Global exists because Africa needs strategic intelligence about AI, not hype. The continent needs analysis that centres power, infrastructure, and institutions — not just applications and algorithms. It needs an editorial voice that asks the structural questions: who controls the compute, who governs the deployment, who benefits from the outcomes, and who is excluded.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">What We Cover</h2>
          <p className="t-text2 leading-relaxed mb-4">
            GoodAI Global is one platform with three pillars:
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-[#F4B63D] pl-4">
              <h3 className="font-semibold mb-1">Signal Desk — Editorial Intelligence</h3>
              <p className="text-sm t-text2">Strategic briefings on AI and state power, policy and governance, compute and infrastructure, data sovereignty, markets and applications, and Ubuntu philosophy.</p>
            </div>
            <div className="border-l-2 border-[#3B82F6] pl-4">
              <h3 className="font-semibold mb-1">Media Intelligence — Monitoring Pipeline</h3>
              <p className="text-sm t-text2">Real-time audio and video monitoring with transcript-backed evidence. Automated entity detection, mention tracking, and evidence-based daily intelligence briefs.</p>
            </div>
            <div className="border-l-2 border-[#22C55E] pl-4">
              <h3 className="font-semibold mb-1">Ubuntu Constitutional — Observatory</h3>
              <p className="text-sm t-text2">South Africa&apos;s first citizen-driven AI constitutional observatory. Eight signal desks monitoring how AI affects equality, dignity, education, employment, and governance across 57 towns.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">Our Editorial Thesis</h2>
          <blockquote className="border-l-2 border-[#F4B63D] pl-6 py-2 mb-4">
            <p className="font-serif text-xl italic t-text leading-relaxed">
              &ldquo;The question is not who uses the technology. The question is who controls what it becomes.&rdquo;
            </p>
          </blockquote>
          <p className="t-text2 leading-relaxed">
            Most AI coverage focuses on capabilities — what AI can do. We focus on power — who AI serves. Most AI discourse in Africa centres on applications and startups. We centre on infrastructure, institutions, and governance. Most AI analysis is reactive. We aim to be structural and anticipatory. AI is becoming the infrastructure layer beneath economic activity, state capacity, and institutional decision-making. The societies that understand this early will shape their futures more effectively.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Policymakers", desc: "Government officials, regulators, and legislators shaping AI governance" },
              { title: "Journalists", desc: "Media professionals covering technology, policy, and African affairs" },
              { title: "Investors", desc: "Capital allocators seeking structural understanding of African AI markets" },
              { title: "Researchers", desc: "Academics and think tanks studying AI governance, ethics, and impact" },
              { title: "AI Labs", desc: "Global technology companies and research laboratories working in Africa" },
              { title: "Ecosystem Builders", desc: "Entrepreneurs, NGOs, and institutions building AI capacity across the continent" },
            ].map((a) => (
              <div key={a.title} className="t-card border t-border rounded-md p-4">
                <div className="text-sm font-semibold mb-1">{a.title}</div>
                <div className="text-xs t-muted">{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">The Team</h2>
          <div className="t-card border t-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-1">Keke Lebaka</h3>
            <p className="text-sm t-gold mb-3">Founder &amp; Editor-in-Chief</p>
            <div className="space-y-2 text-sm t-text2">
              <p>Former Chief Digital Marketing Officer — Sub-Saharan Africa, <strong className="t-text">L&apos;Or&eacute;al</strong></p>
              <p>Former Group Digital Marketing Director — Africa, <strong className="t-text">Promasidor</strong> (20+ African markets)</p>
              <p>Founder, <strong className="t-text">ChiefOps.ai</strong> — AI strategy consulting</p>
              <p>Founder, <strong className="t-text">Abantu Bo Ubuntu</strong> — integrating AI for Good in governance</p>
              <p className="t-muted">Based in Johannesburg, South Africa</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-4">Why This Matters Now</h2>
          <p className="t-text2 leading-relaxed mb-4">
            AI deployment in Africa is accelerating. National AI policies are being drafted — and withdrawn. Municipalities are adopting AI-assisted systems without safeguards. Youth unemployment stands at 45.8% while AI reshapes the labour market. The digital divide is widening, not closing. Constitutional protections have not caught up.
          </p>
          <p className="t-text2 leading-relaxed">
            The window for shaping Africa&apos;s AI future is open now. It will not stay open indefinitely. GoodAI Global exists to ensure that when the decisions are made, they are informed by intelligence, not hype — and shaped by African strategic interests, not imported frameworks.
          </p>
        </section>
      </article>
      <Footer />
    </>
  );
}
