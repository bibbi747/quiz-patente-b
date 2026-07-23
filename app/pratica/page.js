import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts } from "@/lib/parts";
import { iconForCategory } from "@/lib/icons";
import Icon from "@/components/Icon";

export const metadata = { title: "Tutti i capitoli — Quiz Patente B" };

export default function PraticaIndexPage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);

  return (
    <main className="container">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <span className="hero-eyebrow">Pratica</span>
        <h1>Tutti i capitoli</h1>
        <p>Organizzati per Parte, come nell&apos;indice del manuale.</p>
      </section>

      <div className="parts-list">
        {parts.map((part, pi) => (
          <section key={part.title} className="part-block">
            <p className="part-eyebrow">Parte {pi + 1}</p>
            <h2 className="part-title">{part.title}</h2>
            <div className="chapters-grid">
              {part.chapters.map((c) => (
                <Link
                  key={c.chapter}
                  href={c.count > 0 ? `/pratica/${c.chapter}` : "#"}
                  className={`chapter-tab ${c.count === 0 ? "disabled" : ""}`}
                  aria-disabled={c.count === 0}
                >
                  <span className="chapter-num">
                    <Icon name={iconForCategory(c.title)} size={14} color="#fff" />
                  </span>
                  <span className="chapter-name">
                    {c.chapter}. {c.title}
                  </span>
                  <span className="chapter-count">
                    {c.count > 0 ? c.count : "in arrivo"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
