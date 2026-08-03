"use client";

import { forwardRef } from "react";

const NAVY = "#173a56";
const BLUE = "#2f6690";
const AMBER = "#e7ac1f";

function StatMini({ bg, icon, value, label }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 16,
        padding: "16px 8px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <strong style={{ fontSize: 22, color: NAVY, fontFamily: "Georgia, serif" }}>
        {value}
      </strong>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 0.4,
          color: "#6b7785",
          textTransform: "uppercase",
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Card di condivisione — riceve solo dati già pronti (niente accesso a
 * Firebase qui dentro). data = { percentage, quizCompleted,
 * chaptersCompleted, totalChapters, streak, accuracy, qrDataUrl }
 */
const ShareCard = forwardRef(function ShareCard({ data }, ref) {
  const {
    percentage = 0,
    quizCompleted = 0,
    chaptersCompleted = 0,
    totalChapters = 30,
    streak = 0,
    accuracy = 0,
    qrDataUrl = null,
  } = data || {};

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: 600,
        background: "#f7f9fb",
        borderRadius: 32,
        padding: "36px 32px",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #eef1f4",
      }}
    >
      {/* Decorazioni confetti */}
      <svg width="0" height="0">
        <defs />
      </svg>
      <div style={{ position: "absolute", top: 24, left: 40, width: 10, height: 10, background: BLUE, borderRadius: 2, transform: "rotate(20deg)" }} />
      <div style={{ position: "absolute", top: 60, left: 70, width: 8, height: 8, background: AMBER, borderRadius: 2, transform: "rotate(-15deg)" }} />
      <div style={{ position: "absolute", top: 30, right: 60, width: 9, height: 9, background: AMBER, borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: 70, right: 90, width: 7, height: 7, background: BLUE, borderRadius: 2, transform: "rotate(35deg)" }} />
      <div style={{ position: "absolute", top: 10, right: 140, width: 8, height: 8, background: "#3a8a35", borderRadius: 2 }} />

      {/* Blob decorativo in alto a destra */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#fdf6e3",
          opacity: 0.7,
        }}
      />

      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Trofeo */}
        <div
          style={{
            width: 74,
            height: 74,
            margin: "0 auto 12px",
            borderRadius: "50%",
            background: "#fdf1d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4 H17 V9 Q17 14 12 14 Q7 14 7 9 Z" />
            <path d="M7 5 H4 Q4 9 7.5 9.5" />
            <path d="M17 5 H20 Q20 9 16.5 9.5" />
            <path d="M12 14 V18" />
            <path d="M8.5 20 H15.5" />
            <path d="M9.5 18 H14.5 L14.8 20 H9.2 Z" />
          </svg>
        </div>

        {/* Badge */}
        <span
          style={{
            display: "inline-block",
            background: BLUE,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            padding: "6px 16px",
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          OBIETTIVO RAGGIUNTO
        </span>

        {/* Titolo */}
        <h2 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: NAVY, fontFamily: "Georgia, serif" }}>
          Nuovo traguardo
        </h2>
        <h2 style={{ margin: "0 0 20px", fontSize: 26, fontWeight: 800, color: BLUE, fontStyle: "italic", fontFamily: "Georgia, serif" }}>
          raggiunto!
        </h2>

        {/* Percentuale */}
        <div style={{ fontSize: 88, fontWeight: 800, color: NAVY, lineHeight: 1, fontFamily: "Georgia, serif", margin: "0 0 18px" }}>
          {percentage}%
        </div>

        {/* Pillola risposte corrette */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            borderRadius: 999,
            padding: "8px 20px 8px 8px",
            marginBottom: 28,
            boxShadow: "0 4px 10px rgba(20,40,80,0.06)",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12 L9 17 L20 6" />
            </svg>
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: 0.5 }}>
            AVANZAMENTO GENERALE
          </span>
        </div>

        {/* Statistiche */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          <StatMini
            bg={BLUE}
            value={quizCompleted}
            label="Quiz svolti"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path d="M9 3 H15 V6 H9 Z" />
                <path d="M8 12 L11 15 L16 9" />
              </svg>
            }
          />
          <StatMini
            bg="#3a8a35"
            value={`${chaptersCompleted}/${totalChapters}`}
            label="Capitoli completati"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5 Q8 3 12 5 V19 Q8 17 4 19 Z" />
                <path d="M20 5 Q16 3 12 5 V19 Q16 17 20 19 Z" />
              </svg>
            }
          />
          <StatMini
            bg="#d1541f"
            value={streak}
            label="Serie di giorni"
            icon={<span style={{ fontSize: 18 }}>🔥</span>}
          />
          <StatMini
            bg={AMBER}
            value={`${accuracy}%`}
            label="Precisione"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="12" cy="12" r="0.6" fill="#fff" />
              </svg>
            }
          />
        </div>

        {/* Promo libro */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#fdf6e3",
            borderRadius: 20,
            padding: 16,
            textAlign: "left",
          }}
        >
          <img
            src="/images/share/book-cover.png"
            alt=""
            style={{ width: 64, height: 88, objectFit: "cover", borderRadius: 6, flexShrink: 0, background: "#173a56" }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: "0 0 2px", fontSize: 12, fontStyle: "italic", color: AMBER, fontWeight: 700 }}>
              Mi sto preparando con
            </p>
            <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: NAVY, fontFamily: "Georgia, serif" }}>
              Manuale Patente B
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#5a5245" }}>
              Quiz ufficiali MIT e spiegazioni chiare
            </p>
          </div>

          {qrDataUrl && (
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <div style={{ background: "#fff", padding: 6, borderRadius: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="" width={56} height={56} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: AMBER,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: NAVY,
            }}
          >
            PB
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>Quiz Patente B</span>
          <span style={{ fontSize: 11, color: "#8a94a3" }}>· Allenati. Impara. Supera.</span>
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
