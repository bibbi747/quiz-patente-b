import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts } from "@/lib/parts";
import { iconForCategory } from "@/lib/icons";
import Icon from "@/components/Icon";

// TODO — sostituire con il link vero della pagina recensioni Amazon
// non appena il libro è pubblicato.
const AMAZON_REVIEW_URL = "#";

// TODO — sostituire con il link alla cartella Google Drive che contiene
// i PDF delle domande, un file per capitolo, quando saranno pronti.
const PDF_FOLDER_URL = "#";

export default function HomePage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);
  const chapters = parts.flatMap((p) => p.chapters);
  const totalChapters = chapters.length;
  const featured = chapters.filter((c) => c.count > 0).slice(0, 4);

  return (
    <main className="container">
      <div className="hero-card">
        <div className="hero-card-text">
          <span className="hero-eyebrow">Compagno del manuale Patente B</span>
          <h1>
            Esercitati. Impara. <span className="accent">Supera.</span>
          </h1>
          <p>
            {all.length} domande dal manuale, spiegate una per una, per
            arrivare pronto all&apos;esame.
          </p>
          <div className="hero-card-actions">
            <Link href="/pratica" className="btn-navy">
              Inizia a esercitarti
            </Link>
            <Link href="/esame" className="btn-outline">
              Simulazione esame
            </Link>
          </div>
        </div>
        <div className="hero-card-illustration">
          <img
            src="/images/hero-car.png"
            alt="Illustrazione di un'automobile su una strada cittadina"
          />
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <p className="stat-value">{all.length}</p>
          <p className="stat-label">Domande totali</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{totalChapters}</p>
          <p className="stat-label">Capitoli</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">20 min</p>
          <p className="stat-label">Durata esame</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">3</p>
          <p className="stat-label">Errori max</p>
        </div>
      </div>

      <div className="split-row">
        <div className="panel-card">
          <div className="panel-card-heading">
            <h2>Quiz per capitolo</h2>
            <Link href="/pratica">Vedi tutti i {totalChapters} →</Link>
          </div>
          <div className="mini-chapter-grid">
            {featured.map((c) => (
              <Link
                key={c.chapter}
                href={`/pratica/${c.chapter}`}
                className="mini-chapter"
              >
                <span className="mini-chapter-icon">
                  <Icon name={iconForCategory(c.title)} />
                </span>
                <p className="mini-chapter-title">{c.chapter}. {c.title}</p>
                <p className="mini-chapter-count">{c.count} domande</p>
              </Link>
            ))}
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

        <div className="promo-card download">
          <span className="promo-card-icon">
            <Icon name="book" />
          </span>
          <h3>Scarica le domande</h3>
          <p>Allenati con le domande ufficiali MIT, capitolo per capitolo</p>
          <a href={PDF_FOLDER_URL} className="btn-download">
            <Icon name="check" size={16} color="#fff" />
            Scarica PDF
          </a>
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
