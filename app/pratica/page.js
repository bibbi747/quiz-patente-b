import "@/components/pratica/pratica.css";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts } from "@/lib/parts";

import PraticaClient from "@/components/pratica/PraticaClient";

export const metadata = {
  title: "Tutti i capitoli — Quiz Patente B",
};

export default function PraticaIndexPage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);

  return (
    <main className="container">
      <section className="hero" style={{ paddingBottom: 24 }}>
        <span className="hero-eyebrow">Pratica</span>

        <h1>Esercitati con i quiz</h1>

        <p>
          Completa tutti i capitoli del manuale e monitora i tuoi progressi.
        </p>
      </section>

      <PraticaClient parts={parts} />
    </main>
  );
}