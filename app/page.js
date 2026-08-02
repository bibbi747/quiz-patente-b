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

export default function HomePage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);
  const chapters = parts.flatMap((p) => p.chapters);
  const totalChapters = chapters.length;
  const featured = chapters.filter((c) => c.count > 0).slice(0, 4);

  return (
    <main className="container">
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
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-card-icon"><Icon name="book" size={18} /></span>
          <div>
            <p className="stat-value">{all.length}</p>
            <p className="stat-label">Domande totali</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card-icon"><Icon name="car" size={18} /></span>
          <div>
            <p className="stat-value">{totalChapters}</p>
            <p className="stat-label">Capitoli</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card-icon"><Icon name="gauge" size={18} /></span>
          <div>
            <p className="stat-value">20 min</p>
            <p className="stat-label">Durata esame</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-card-icon"><Icon name="target" size={18} /></span>
          <div>
            <p className="stat-value">3</p>
            <p className="stat-label">Errori max</p>
          </div>
        </div>
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
        <div className="promo-card review">
          <div className="promo-card-text">
            <span className="promo-card-icon">
              <Icon name="check" />
            </span>
            <h3>Se ti è piaciuto questo libro</h3>
            <p>Lascia una recensione su Amazon</p>
            <div className="promo-stars" aria-hidden="true">
              ★★★★★
            </div>
            <a href={AMAZON_REVIEW_URL} className="btn-amazon">
              amazon
            </a>
          </div>
          <img
            src="/images/book-cover.png"
            alt="Copertina del manuale Patente B"
            className="promo-card-image"
          />
        </div>

        <div className="promo-card download">
          <div className="promo-card-text">
            <span className="promo-card-icon">
              <Icon name="book" />
            </span>
            <h3>Scarica le domande</h3>
            <p>Allenati con le domande ufficiali MIT, capitolo per capitolo</p>
            <Link href="/scarica" className="btn-download">
              <Icon name="check" size={16} color="#fff" />
              Scarica PDF
            </Link>
          </div>
          <img
            src="/images/pdf-mockup.png"
            alt="Anteprima del PDF scaricabile con le domande"
            className="promo-card-image"
          />
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
