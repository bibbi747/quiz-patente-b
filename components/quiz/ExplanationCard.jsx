"use client";

export default function ExplanationCard({
  visible,
  isCorrect,
  explanation,
  reference,
  onNext,
  isLast,
}) {
  if (!visible) return null;

  return (
    <div
      className={`explanation-card ${
        isCorrect ? "success" : "error"
      }`}
    >
      <div className="explanation-header">
        <div className="explanation-icon">
          {isCorrect ? "✓" : "✕"}
        </div>

        <div>
          <h3 className="explanation-title">
            {isCorrect ? "Risposta corretta" : "Risposta errata"}
          </h3>

          {reference && (
            <div className="reference">
              {reference}
            </div>
          )}
        </div>
      </div>

      <p className="explanation-text">
        {explanation}
      </p>

      <button
        className="next-question-button"
        onClick={onNext}
      >
        {isLast
          ? "Visualizza risultato"
          : "Domanda successiva →"}
      </button>
    </div>
  );
}