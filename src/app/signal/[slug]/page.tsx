import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/signal" className="text-xs font-mono uppercase tracking-wider text-[#6B6862] hover:text-[#F4B63D] transition-colors mb-4 inline-block">&larr; Signal Briefings</Link>
          <div className="flex flex-wrap gap-3 items-center mb-4 mt-4">
            <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded font-semibold" style={{ background: `${article.deskColor}20`, color: article.deskColor }}>{article.desk}</span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B6862]">{article.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-[#A8A49E] leading-relaxed mb-6">{article.excerpt}</p>
          <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-[#6B6862] pb-6 border-b border-[rgba(240,237,232,0.08)]">
            <span>By Keke Lebaka</span>
            <span>Good AI Global {article.desk}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <div className="prose-custom">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#A8A49E] text-base sm:text-lg leading-[1.8] mb-6">{p}</p>
          ))}
        </div>

        {/* Related */}
        <div className="mt-16 pt-8 border-t border-[rgba(240,237,232,0.08)]">
          <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F4B63D] mb-6">More from the Signal Desk</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/signal/${r.slug}`} className="bg-[#111520] border border-[rgba(240,237,232,0.08)] rounded-md p-4 card-hover">
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase font-semibold mb-1 block" style={{ color: r.deskColor }}>{r.desk}</span>
                <h4 className="font-serif text-sm font-semibold leading-snug hover:text-[#F4B63D] transition-colors">{r.title}</h4>
                <span className="text-[10px] text-[#6B6862] mt-2 block">{r.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
