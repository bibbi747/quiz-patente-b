"use client";

import "@/components/common/common.css";
import { useState } from "react";
import Link from "next/link";
import { buildExam } from "@/lib/questions";
import QuizEngine from "@/components/QuizEngine";

export default function EsamePage() {
  const [exam, setExam] = useState(null);

  if (exam) {
    return (
      <main>
        <QuizEngine
          questions={exam}
          mode="esame"
          backHref="/"
          backLabel="Torna alla home"
        />
      </main>
    );
  }

  return (
    <main className="container">
      <section className="hero">
        <span className="hero-eyebrow">Simulazione esame</span>
        <h1>Sei pronto per la prova?</h1>
        <p>
          30 domande estratte da tutti i capitoli del manuale, in proporzione
          alla loro importanza. Hai 20 minuti di tempo e puoi sbagliare al
          massimo 3 domande, esattamente come nel vero esame di teoria.
        </p>
      </section>

      <div className="dashboard" style={{ gridTemplateColumns: "1fr" }}>
        <div className="dash-card mode-esame" style={{ cursor: "default" }}>
          <span className="dash-card-icon">E</span>
          <h3>Regole della simulazione</h3>
          <p>
            30 domande vero/falso · timer di 20 minuti visibile in ogni
            momento · l&apos;esame termina subito se raggiungi 4 errori o se
            il tempo scade · risultato finale con esito superato/non superato.
          </p>
          <button
            className="btn-primary"
            style={{ marginTop: 6 }}
            onClick={() => setExam(buildExam(30))}
          >
            Avvia la simulazione
          </button>
        </div>
      </div>

      <p style={{ textAlign: "center" }}>
        <Link href="/" className="btn-secondary" style={{ display: "inline-block", padding: "10px 18px" }}>
          Torna alla home
        </Link>
      </p>
    </main>
  );
}
