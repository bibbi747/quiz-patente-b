"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

import ShareCard from "./ShareCard";
import { generateShareImage } from "@/lib/generateShareImage";

// Finché il libro non è pubblicato su Amazon, il QR porta al sito del
// quiz. Quando avrai il link vero della scheda Amazon, basta cambiare
// questa riga: tutte le card generate da quel momento useranno il nuovo
// link, senza dover rigenerare nulla di vecchio.
const SHARE_TARGET_URL = "https://quiz-patente-b.vercel.app";

export default function ShareSection({ stats }) {
  const cardRef = useRef(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | working | done | error

  useEffect(() => {
    QRCode.toDataURL(SHARE_TARGET_URL, {
      width: 200,
      margin: 1,
      color: { dark: "#173a56", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch((err) => console.error(err));
  }, []);

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
        <div className="share-band-text">
          <strong>Condividi il tuo traguardo</strong>
          <span>Genera un&apos;immagine con i tuoi progressi da condividere dove vuoi.</span>
        </div>

        <button
          type="button"
          className="btn-navy share-button"
          onClick={handleShare}
          disabled={status === "working"}
        >
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
      <div className="share-offscreen" aria-hidden="true">
        <ShareCard ref={cardRef} data={{ ...stats, qrDataUrl }} />
      </div>
    </section>
  );
}
