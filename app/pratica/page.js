import "@/components/pratica/pratica.css";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts } from "@/lib/parts";

import PraticaClient from "@/components/pratica/PraticaClient";
import Icon from "@/components/Icon";
import SimulationBanner from "@/components/pratica/SimulationBanner";
import BackToTop from "@/components/pratica/BackToTop";

export const metadata = {
  title: "Tutti i capitoli — Quiz Patente B",
};

// I 25 argomenti sono quelli ufficiali del programma MIT: il numero non
// coincide con il totale dei capitoli del manuale (che li ripartisce
// diversamente), quindi resta un valore editoriale fisso, non calcolato.
const ARGOMENTI_MINISTERIALI = 25;

export default function PraticaIndexPage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);

  return (
    <main className="container" style={{ maxWidth: "1280px" }}>
      <section
        className="pratica-hero"
        style={{
          width: "100%",
          height: "520px",
          margin: "40px 0 60px",
          borderRadius: "30px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          backgroundImage: 'url("/images/pratica/hero-pratica.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pratica-hero-text">
          <span className="pratica-hero-badge">
            <Icon name="book" size={15} /> La pratica rende perfetti!
          </span>

          <h1>Scegli un capitolo e mettiti alla prova</h1>

          <p>
            Esercita la tua preparazione con i quiz ufficiali MIT divisi per
            argomento.
          </p>

          <div className="pratica-hero-stats">
            <div className="stat-pill">
              <span className="stat-pill-icon">
                <Icon name="target" size={20} />
              </span>
              <span>
                <strong>{ARGOMENTI_MINISTERIALI}</strong>
                <small>Argomenti ministeriali</small>
              </span>
            </div>

            <div className="stat-pill">
              <span className="stat-pill-icon trophy">
                <Icon name="trophy" size={20} />
              </span>
              <span>
                <strong>{all.length}</strong>
                <small>Quiz disponibili</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <PraticaClient parts={parts} />

      <SimulationBanner />

      <section className="pratica-cta">
        <span className="pratica-cta-icon">
          <Icon name="trophy" size={30} />
        </span>

        <div className="pratica-cta-text">
          <h3>Pronto per la prossima sfida?</h3>
          <p>Affronta i quiz di un capitolo alla volta e verifica subito i tuoi progressi.</p>
        </div>

        <a href={`/pratica/${parts[0]?.chapters[0]?.chapter || 1}`} className="pratica-cta-button">
          Inizia la pratica
        </a>
      </section>

      <BackToTop />
    </main>
  );
}