"use client";

export default function CapitoliHeader({ progressPercent = 0 }) {
  return (
    <section className="chapters-header">
      <div className="chapters-title">
        <span className="chapters-icon">📚</span>

        <div>
          <h2>I capitoli di pratica</h2>
          <p>Seleziona un capitolo per iniziare o continua da dove avevi interrotto.</p>
        </div>
      </div>

      <div className="progress-box">
        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(#20B45A ${progressPercent}%, #E5EDF5 0)`,
          }}
        >
          <span></span>
        </div>

        <div className="progress-info">
          <strong>Il tuo progresso</strong>
          <b>{progressPercent}%</b>
          <div className="progress-bar">
            <div style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
