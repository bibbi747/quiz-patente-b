"use client";

import Link from "next/link";

export default function SimulationBanner() {
  return (
    <section className="simulation-banner">
      <div className="simulation-left">
        <span className="simulation-badge">🎯 Sei pronto?</span>

        <h2>Prova una simulazione completa d'esame</h2>

        <p>
          Affronta un quiz identico a quello ministeriale con timer, errori
          e risultato finale.
        </p>
      </div>

      <div className="simulation-right">
        <Link href="/esame" className="simulation-button">
          Inizia la simulazione
        </Link>
      </div>
    </section>
  );
}
