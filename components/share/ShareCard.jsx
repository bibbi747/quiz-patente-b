"use client";

import { forwardRef } from "react";

const TEMPLATE_WIDTH = 1080;
const TEMPLATE_HEIGHT = 1420;

/**
 * Card di condivisione — costruita sopra a un'immagine template fissa
 * (tutte le decorazioni, icone, testi fissi e il QR sono già dentro al
 * PNG). Qui sovrapponiamo solo i 5 numeri che cambiano da utente a
 * utente: la percentuale grande e i 4 valori delle card statistiche.
 *
 * data = { percentage, quizCompleted, chaptersCompleted,
 * totalChapters, streak, accuracy }
 */
const ShareCard = forwardRef(function ShareCard({ data }, ref) {
  const {
    percentage = 0,
    quizCompleted = 0,
    chaptersCompleted = 0,
    totalChapters = 30,
    streak = 0,
    accuracy = 0,
  } = data || {};

  return (
    <div
      ref={ref}
      style={{
        width: TEMPLATE_WIDTH,
        height: TEMPLATE_HEIGHT,
        position: "relative",
        fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/share/traguardo-template.png"
        alt=""
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        style={{ display: "block", width: TEMPLATE_WIDTH, height: TEMPLATE_HEIGHT }}
      />

      {/* Percentuale grande, sotto "raggiunto!" */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: 0,
          width: TEMPLATE_WIDTH,
          textAlign: "center",
          fontSize: 150,
          fontWeight: 800,
          color: "#0E3D24",
          lineHeight: 1,
        }}
      >
        {percentage}%
      </div>

      {/* Numero: Quiz svolti (card 1) */}
      <div
        style={{
          position: "absolute",
          top: 862,
          left: 70,
          width: 215,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {quizCompleted}
      </div>

      {/* Numero: Capitoli completati (card 2) */}
      <div
        style={{
          position: "absolute",
          top: 862,
          left: 305,
          width: 215,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {chaptersCompleted}/{totalChapters}
      </div>

      {/* Numero: Serie di giorni (card 3) */}
      <div
        style={{
          position: "absolute",
          top: 862,
          left: 540,
          width: 215,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {streak}
      </div>

      {/* Numero: Precisione (card 4) — stessa altezza delle altre tre,
          l'etichetta sotto ha solo una riga invece di due ma il numero
          resta allineato allo stesso livello */}
      <div
        style={{
          position: "absolute",
          top: 862,
          left: 775,
          width: 215,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {accuracy}%
      </div>
    </div>
  );
});

export default ShareCard;