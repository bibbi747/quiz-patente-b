import "@/components/home/home.css";
import "@/components/common/common.css";
import "@/components/pratica/pratica.css";
import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts, partColorForChapter, partNumberForChapter } from "@/lib/parts";
import { iconForCategory } from "@/lib/icons";
import Icon from "@/components/Icon";
import ImageWithFallback from "@/components/common/ImageWithFallback";

// TODO — sostituire con il link vero della pagina recensioni Amazon
// non appena il libro è pubblicato.
const AMAZON_REVIEW_URL = "#";

// I 25 argomenti sono quelli ufficiali del programma MIT: il numero non
// coincide con il totale dei capitoli del manuale, resta un valore
// editoriale fisso, non calcolato (coerente con la pagina Pratica).
const ARGOMENTI_MINISTERIALI = 25;

export default function HomePage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);
  const chapters = parts.flatMap((p) => p.chapters);
  const totalChapters = chapters.length;
  const featured = chapters.filter((c) => c.count > 0).slice(0, 4);

  return (
    <main className="container" style={{ maxWidth: "1280px" }}>
      <div className="home-hero">
        <div className="home-hero-text">
          <span className="hero-eyebrow">Compagno del manuale Patente B</span>
          <h1>
            Esercitati.
            <br />
            Impara.
            <br />
            <span className="accent">Supera.</span>
          </h1>
          <p>
            {all.length} domande dal manuale, spiegate
            <br />
            una per una per arrivare pronto all&apos;esame.
          </p>
          <div className="home-hero-actions">
            <Link href="/pratica" className="btn-amber">
              Inizia ad esercitarti
            </Link>
            <Link href="/esame" className="btn-outline">
              Simulazione esame
            </Link>
            <Link href="/precedenze" className="btn-outline">
              Le precedenze
            </Link>
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-card-icon">
            <img src="/images/stats/icon-domande.png" alt="" />
          </span>
          <div>
            <p className="stat-value">{all.length}</p>
            <p className="stat-label">Domande dal manuale</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-card-icon">
            <img src="/images/stats/icon-argomenti.png" alt="" />
          </span>
          <div>
            <p className="stat-value">{ARGOMENTI_MINISTERIALI}</p>
            <p className="stat-label">Argomenti ministeriali</p>
          </div>
        </div>

        <Link href="/esame" className="stat-card stat-card-link">
          <span className="stat-card-icon">
            <img src="/images/stats/icon-simulazione.png" alt="" />
          </span>
          <div>
            <p className="stat-value">Simulazione</p>
            <p className="stat-label">Tempo reale d&apos;esame</p>
          </div>
        </Link>

        <Link href="/statistiche" className="stat-card stat-card-link">
          <span className="stat-card-icon">
            <img src="/images/stats/icon-statistiche.png" alt="" />
          </span>
          <div>
            <p className="stat-value">Statistiche</p>
            <p className="stat-label">Monitora i tuoi progressi</p>
          </div>
        </Link>
      </div>

      <div className="split-row">
        <div className="panel-card">
          <div className="panel-card-heading">
            <h2>Quiz per capitolo</h2>
            <Link href="/pratica">Vedi tutti i {totalChapters} →</Link>
          </div>
          <div className="home-featured-grid">
            {featured.map((c) => {
              const partNumber = String(partNumberForChapter(c.chapter)).padStart(2, "0");
              return (
                <Link
                  key={c.chapter}
                  href={`/pratica/${c.chapter}`}
                  className="home-chapter-tile"
                >
                  <div className="home-chapter-tile-icon">
                    <ImageWithFallback
                      src={`/images/parti/parte-${partNumber}.png`}
                      alt=""
                      className="home-chapter-tile-icon-img"
                      fallback={<Icon name={iconForCategory(c.title)} size={18} color={partColorForChapter(c.chapter)} />}
                    />
                  </div>
                  <div className="home-chapter-tile-text">
                    <p className="home-chapter-tile-title">{c.chapter}. {c.title}</p>
                    <p className="home-chapter-tile-count">{c.count} domande</p>
                    <div className="progress"><div className="progress-fill" style={{ width: "0%", background: "var(--pb-blue)" }} /></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="exam-card">
          <h2>Simulazione esame</h2>
          <p>Le stesse condizioni della vera prova di teoria.</p>
          <ul className="exam-card-rules">
            <li>
              <span className="exam-card-check">
                <Icon name="check" size={11} />
              </span>
              30 domande
            </li>
            <li>
              <span className="exam-card-check">
                <Icon name="check" size={11} />
              </span>
              20 minuti
            </li>
            <li>
              <span className="exam-card-check">
                <Icon name="check" size={11} />
              </span>
              Massimo 3 errori
            </li>
          </ul>
          <Link href="/esame" className="btn-amber">
            Avvia simulazione
          </Link>
        </div>
      </div>

      <div className="promo-row">
        <div className="promo-card">
          <div className="promo-card-stripe" />
          <div className="promo-card-dots" />

          <div className="promo-card-inner">
            <span className="promo-icon-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#195425" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 L14.6 8.6 L20.8 9.4 L16.3 13.6 L17.5 19.7 L12 16.6 L6.5 19.7 L7.7 13.6 L3.2 9.4 L9.4 8.6 Z" />
              </svg>
            </span>

            <h3 className="promo-card-title">Ti è piaciuto<br />questo libro?</h3>
            <p className="promo-card-desc">
              Lascia una recensione su Amazon e aiuta altri studenti come te!
            </p>

            <div className="promo-stars" aria-hidden="true">
              ★★★★★
            </div>

            <a href={AMAZON_REVIEW_URL} className="promo-btn">
              <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "#fff", color: "#195425", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, fontStyle: "italic" }}>a</span>
              Recensisci su Amazon
              <span className="promo-btn-chevron">
                <Icon name="chevron" size={16} />
              </span>
            </a>
          </div>

          <div className="promo-card-image-wrap">
            <img
              src="/images/book-cover.png"
              alt="Copertina del manuale Patente B"
              className="promo-book-cover"
            />
          </div>
        </div>

        <div className="promo-card">
          <div className="promo-card-stripe" />
          <div className="promo-card-blob" style={{ width: 220, height: 220, top: -60, right: -60 }} />

          <div className="promo-card-inner">
            <span className="promo-icon-circle">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#195425" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 3 H14 L18 7 V21 H7 Z" />
                <path d="M14 3 V7 H18" />
              </svg>
            </span>

            <h3 className="promo-card-title">Scarica le domande<br />ufficiali MIT</h3>
            <p className="promo-card-desc">
              Allenati con le domande ufficiali MIT, capitolo per capitolo.
            </p>

            <ul className="promo-checklist">
              <li>
                <span className="promo-check-dot"><Icon name="check" size={12} /></span>
                Domande sempre aggiornate
              </li>
              <li>
                <span className="promo-check-dot"><Icon name="check" size={12} /></span>
                Per ogni capitolo del manuale
              </li>
              <li>
                <span className="promo-check-dot"><Icon name="check" size={12} /></span>
                Ideale per simulare l&apos;esame
              </li>
            </ul>

            <Link href="/scarica" className="promo-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 V15 M7 10 L12 15 L17 10" />
                <path d="M4 19 H20" />
              </svg>
              Scarica PDF
            </Link>
          </div>

          <div className="promo-card-image-wrap">
            <img
              src="/images/pdf-mockup.png"
              alt="Anteprima del PDF scaricabile con le domande"
              className="promo-pdf-mockup"
            />
          </div>
        </div>
      </div>

      <div className="feature-strip">
        <div className="feature-item">
          <span className="feature-item-icon"><Icon name="book" /></span>
          <div>
            <p className="feature-item-title">Fedele al manuale</p>
            <p className="feature-item-sub">Ogni domanda riprende gli argomenti del libro</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-item-icon"><Icon name="check" /></span>
          <div>
            <p className="feature-item-title">Spiegazioni chiare</p>
            <p className="feature-item-sub">Il perché, dopo ogni risposta</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-item-icon"><Icon name="gauge" /></span>
          <div>
            <p className="feature-item-title">Come il vero esame</p>
            <p className="feature-item-sub">Stesso formato e stesse regole</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-item-icon"><Icon name="road" /></span>
          <div>
            <p className="feature-item-title">Accesso libero</p>
            <p className="feature-item-sub">Gratuito, incluso con il libro</p>
          </div>
        </div>
      </div>
    </main>
  );
}