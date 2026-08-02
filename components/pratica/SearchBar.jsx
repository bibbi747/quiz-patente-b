"use client";

import Gauge from "@/components/Gauge";

export default function SearchBar({
  value,
  onChange,
  total = 25,
  progressPercent = null,
}) {
  return (
    <section className="practice-search">
      <div className="practice-search-left">
        <h2>I capitoli di pratica</h2>

        <p>
          Cerca un argomento oppure seleziona un capitolo dall'elenco.
        </p>
      </div>

      <div className="practice-search-right">
        <div className="search-input">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <line
              x1="20"
              y1="20"
              x2="16.5"
              y2="16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="text"
            placeholder="Cerca un capitolo..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="chapter-counter">
          <span>{total}</span>
          <small>Capitoli</small>
        </div>

        {progressPercent !== null && progressPercent > 0 && (
          <div className="chapter-counter progress-counter">
            <Gauge progress={progressPercent / 100} color="var(--pb-green)" />
            <small>{progressPercent}%</small>
          </div>
        )}
      </div>
    </section>
  );
}
