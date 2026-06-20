import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { articles } from "@/data/articles";
import { articleImages } from "@/data/article-images";

export default function SignalPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#F4B63D]" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F4B63D]">Signal Desk</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Signal Briefings</h1>
        <p className="text-[#A8A49E] text-sm mb-12 max-w-xl">Strategic editorial intelligence on how AI reshapes power, infrastructure, and institutions across Africa.</p>

        {/* Featured */}
        <Link href={`/signal/${featured.slug}`} className="block bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg overflow-hidden mb-12 card-hover">
          {articleImages[featured.slug] && (
            <div className="h-[240px] overflow-hidden">
              <img src={articleImages[featured.slug]} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded mb-3 font-semibold" style={{ background: `${featured.deskColor}20`, color: featured.deskColor }}>{featured.desk}</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3 hover:text-[#F4B63D] transition-colors">{featured.title}</h2>
            <p className="text-[#A8A49E] text-base leading-relaxed mb-4 max-w-2xl">{featured.excerpt}</p>
            <div className="flex gap-4 text-xs font-mono uppercase tracking-wider text-[#6B6862]">
              <span>{featured.category}</span>
              <span>{featured.date}</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((a) => (
            <Link key={a.slug} href={`/signal/${a.slug}`} className="block bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-lg overflow-hidden card-hover">
              {articleImages[a.slug] && (
                <div className="h-[160px] overflow-hidden">
                  <img src={articleImages[a.slug]} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded mb-2 font-semibold" style={{ background: `${a.deskColor}20`, color: a.deskColor }}>{a.desk}</span>
                <h3 className="font-serif text-lg font-bold mb-2 hover:text-[#F4B63D] transition-colors">{a.title}</h3>
                <p className="text-sm text-[#A8A49E] leading-relaxed mb-3 line-clamp-2">{a.excerpt}</p>
                <div className="flex gap-3 text-[10px] font-mono uppercase tracking-wider text-[#6B6862]">
                  <span>{a.date}</span>
                  <span>{a.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
