"use client";

import "./common/common.css";

/**
 * Cruscotto circolare usato ovunque nel sito: come indicatore di
 * avanzamento durante la pratica, come timer nella simulazione
 * d'esame e come indicatore del punteggio finale. È l'elemento
 * ricorrente che lega visivamente il software al manuale cartaceo.
 */
export default function Gauge({
  progress = 0, // 0 -> 1
  color = "var(--pb-blue)",
  label,
  size = "default", // "default" | "big"
}) {
  const radius = size === "big" ? 56 : 26;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(progress, 0), 1));
  const viewBoxSize = (radius + stroke) * 2;

  return (
    <div className={`gauge ${size === "big" ? "big" : ""}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        role="img"
        aria-label={typeof label === "string" ? label : "indicatore"}
      >
        <circle
          className="gauge-track"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
        />
        <circle
          className="gauge-value"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="gauge-readout">{label}</div>
    </div>
  );
}
