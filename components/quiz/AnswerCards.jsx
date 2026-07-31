"use client";

export default function AnswerCards({
  answered,
  selected,
  correctAnswer,
  onSelect,
}) {
  return (
    <div className="answers-grid">

      <button
        type="button"
        disabled={answered}
        onClick={() => onSelect(true)}
        className={`
          answer-card
          true-card

          ${
            answered && selected === true
              ? correctAnswer
                ? "correct"
                : "wrong"
              : ""
          }

          ${
            answered &&
            correctAnswer === true &&
            selected !== true
              ? "reveal"
              : ""
          }
        `}
      >

        <div className="answer-icon">
          ✓
        </div>

        <div className="answer-title">
          VERO
        </div>

      </button>

      <button
        type="button"
        disabled={answered}
        onClick={() => onSelect(false)}
        className={`
          answer-card
          false-card

          ${
            answered && selected === false
              ? correctAnswer === false
                ? "correct"
                : "wrong"
              : ""
          }

          ${
            answered &&
            correctAnswer === false &&
            selected !== false
              ? "reveal"
              : ""
          }
        `}
      >

        <div className="answer-icon">
          ✕

        </div>

        <div className="answer-title">
          FALSO
        </div>

      </button>

    </div>
  );
}