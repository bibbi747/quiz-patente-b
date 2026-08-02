"use client";

export default function ProgressSidebar({
  completed = 0,
  total = 25,
  correct = 0,
  answered = 0,
  streak = 0,
}) {
  const progress =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const accuracy =
    answered > 0 ? Math.round((correct / answered) * 100) : 0;

  return (
    <aside className="practice-sidebar">
      <div className="sidebar-card progress-card">
        <span className="sidebar-label">Progresso generale</span>
        <h2>{progress}%</h2>

        <div className="progress-circle">
          <div className="progress-circle-value">
            {completed}/{total}
          </div>
        </div>

        <p>
          Hai completato
          <strong> {completed} capitoli </strong>
          su {total}.
        </p>
      </div>

      <div className="sidebar-card">
        <h3>Statistiche</h3>

        <div className="sidebar-stat">
          <span>Quiz risolti</span>
          <strong>{answered}</strong>
        </div>

        <div className="sidebar-stat">
          <span>Risposte corrette</span>
          <strong>{correct}</strong>
        </div>

        <div className="sidebar-stat">
          <span>Precisione</span>
          <strong>{accuracy}%</strong>
        </div>
      </div>

      {streak > 0 && (
        <div className="sidebar-card streak-card">
          <span className="streak-icon">🔥</span>
          <h3>{streak} {streak === 1 ? "giorno" : "giorni"}</h3>
          <p>Continua ad esercitarti ogni giorno per mantenere la tua serie.</p>
        </div>
      )}

      <div className="sidebar-card tip-card">
        <h3>💡 Consiglio</h3>
        <p>
          Completa un capitolo prima di passare al successivo. Migliorerai
          la memoria e ridurrai gli errori nei quiz.
        </p>
      </div>
    </aside>
  );
}
