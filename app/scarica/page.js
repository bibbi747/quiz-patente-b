import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts, pdfFilename } from "@/lib/parts";
import Icon from "@/components/Icon";

export const metadata = { title: "Scarica le domande — Quiz Patente B" };

export default function ScaricaPage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);

  return (
    <main className="container">
      <section className="hero" style={{ paddingBottom: 8 }}>
        <span className="hero-eyebrow">Scarica le domande</span>
        <h1>Un PDF per ogni capitolo</h1>
        <p>
          Le stesse domande del sito, con risposta e spiegazione, da
          stampare o consultare offline. Scegli il capitolo che ti serve.
        </p>
      </section>

      <div className="parts-list">
        {parts.map((part, pi) => (
          <section key={part.title} className="part-block">
            <p className="part-eyebrow">Parte {pi + 1}</p>
            <h2 className="part-title">{part.title}</h2>
            <div className="chapters-grid">
              {part.chapters.map((c) => (
                <a
                  key={c.chapter}
                  href={`/downloads/${pdfFilename(c.chapter, c.title)}`}
                  className={`chapter-tab ${c.count === 0 ? "disabled" : ""}`}
                  download
                >
                  <span className="chapter-num">
                    <Icon name="check" size={13} color="#fff" />
                  </span>
                  <span className="chapter-name">
                    {c.chapter}. {c.title}
                  </span>
                  <span className="chapter-count">
                    {c.count > 0 ? `${c.count} · PDF` : "in arrivo"}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
