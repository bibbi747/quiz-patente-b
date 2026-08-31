"use client";

import { useRef, useState } from "react";

import ShareCard from "./ShareCard";
import { generateShareImage } from "@/lib/generateShareImage";

export default function ShareSection({ stats }) {
  const cardRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | working | done | error

  async function handleShare() {
    if (!cardRef.current) return;

    setStatus("working");

    try {
      const { blob } = await generateShareImage(cardRef.current);
      const file = new File([blob], "traguardo-patente-b.png", { type: "image/png" });

      const canUseWebShare =
        typeof navigator !== "undefined" &&
        navigator.canShare &&
        navigator.canShare({ files: [file] });

      if (canUseWebShare) {
        await navigator.share({
          files: [file],
          title: "Il mio traguardo — Quiz Patente B",
          text: "Sto studiando per la Patente B, ecco a che punto sono!",
        });
      } else {
        // Desktop, o telefono senza supporto: scarica il PNG.
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "traguardo-patente-b.png";
        a.click();
        URL.revokeObjectURL(url);
      }

      setStatus("done");
    } catch (err) {
      // L'utente che annulla la condivisione nativa genera un errore
      // "AbortError": non è un vero errore, lo ignoriamo.
      if (err?.name !== "AbortError") {
        console.error(err);
        setStatus("error");
        return;
      }
      setStatus("idle");
    }
  }

  return (
    <section className="share-section">
      <div className="share-band">
        <div className="share-band-decor" />

        <div className="share-band-left">
          <span className="share-band-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E3D24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.6 10.6 L15.4 6.4 M8.6 13.4 L15.4 17.6" />
            </svg>
          </span>

          <div className="share-band-text">
            <strong>Condividi il tuo traguardo</strong>
            <span>Genera un&apos;immagine con i tuoi progressi da condividere dove vuoi.</span>
          </div>
        </div>

        <button
          type="button"
          className="share-button"
          onClick={handleShare}
          disabled={status === "working"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E3A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16 V4 M7 9 L12 4 L17 9" />
            <path d="M4 16 V19 A2 2 0 0 0 6 21 H18 A2 2 0 0 0 20 19 V16" />
          </svg>
          {status === "working" ? "Genero l'immagine..." : "Condividi"}
        </button>
      </div>

      {status === "error" && (
        <p className="share-error">
          Qualcosa è andato storto, riprova.
        </p>
      )}

      {/* Fuori dallo schermo: serve solo come sorgente per generare il
          PNG, l'utente non la vede mai. */}
      <div
        className="share-offscreen"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "-99999px",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <ShareCard ref={cardRef} data={stats} />
      </div>
    </section>
  );
}