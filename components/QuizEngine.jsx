"use client";
import QuizHeader from "./quiz/QuizHeader";
import "./quiz/quiz.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Gauge from "./Gauge";

const EXAM_DURATION_SECONDS = 20 * 60;
const EXAM_MAX_ERRORS = 3;

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizEngine({
  questions,
  mode,
  title,
  backHref,
  backLabel,
  onAnswer,
  onFinish,
}) {
  const isExam = mode === "esame";

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECONDS);
  const [finished, setFinished] = useState(false);
  const [finishReason, setFinishReason] = useState(null);

  const timerRef = useRef(null);

  const current = questions[index];

  useEffect(() => {
    if (!isExam || finished) return undefined;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setFinishReason("tempo");
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isExam, finished]);

  function answer(choice) {
    if (answered || finished) return;

    const isCorrect = choice === current.risposta;

    if (onAnswer) {
      onAnswer({
        question: current,
        isCorrect,
        chosen: choice,
      });
    }

    setSelected(choice);
    setAnswered(true);

    setHistory((prev) => [
      ...prev,
      {
        question: current,
        chosen: choice,
        correct: isCorrect,
      },
    ]);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);

      if (isExam && nextWrong > EXAM_MAX_ERRORS) {
        clearInterval(timerRef.current);
        setFinishReason("errori");
        setFinished(true);
      }
    }
  }

  function next() {
    if (finished) return;

    if (index + 1 >= questions.length) {
      clearInterval(timerRef.current);

      if (onFinish) {
        onFinish({
          correct: correctCount,
          wrong: wrongCount,
          total: questions.length,
        });
      }

      setFinishReason("completato");
      setFinished(true);
      return;
    }

    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  const progress = questions.length ? index / questions.length : 0;
  const timeProgress = secondsLeft / EXAM_DURATION_SECONDS;

  const categoryBreakdown = useMemo(() => {
    const map = new Map();

    for (const h of history) {
      const cat = h.question.categoria;

      if (!map.has(cat)) {
        map.set(cat, { correct: 0, total: 0 });
      }

      const entry = map.get(cat);
      entry.total += 1;

      if (h.correct) {
        entry.correct += 1;
      }
    }

    return Array.from(map.entries()).map(([categoria, v]) => ({
      categoria,
      ...v,
    }));
  }, [history]);
    if (!current && !finished) {
    return (
      <div className="quiz-shell">
        <p>Nessuna domanda disponibile per questa selezione.</p>
      </div>
    );
  }

  if (finished) {
    const passed = isExam
      ? finishReason !== "errori" &&
        finishReason !== "tempo" &&
        wrongCount <= EXAM_MAX_ERRORS
      : null;

    let verdictLabel = "";

    if (isExam) {
      if (finishReason === "errori") {
        verdictLabel = "Non superato — troppi errori";
      } else if (finishReason === "tempo") {
        verdictLabel = "Non superato — tempo scaduto";
      } else {
        verdictLabel = passed ? "Superato" : "Non superato";
      }
    }

    return (
      <div className="results-shell">
        <div className="results-card">
          <Gauge
            size="big"
            progress={history.length ? correctCount / history.length : 0}
            color={
              isExam
                ? passed
                  ? "var(--pb-green)"
                  : "var(--pb-red)"
                : "var(--pb-blue)"
            }
            label={`${correctCount}/${history.length}`}
          />

          {isExam && (
            <span className={`results-verdict ${passed ? "pass" : "fail"}`}>
              {verdictLabel}
            </span>
          )}

          <h1 className="results-title">
            {isExam ? "Esito simulazione" : "Sessione completata"}
          </h1>

          <p className="results-sub">
            {correctCount} risposte corrette su {history.length}
            {isExam
              ? ` · ${wrongCount} errori (massimo ammesso: ${EXAM_MAX_ERRORS})`
              : ""}
          </p>

          {categoryBreakdown.length > 1 && (
            <div className="results-breakdown">
              {categoryBreakdown.map((b) => (
                <div className="breakdown-row" key={b.categoria}>
                  <span className="breakdown-name">{b.categoria}</span>

                  <span className="breakdown-bar">
                    <span
                      className="breakdown-bar-fill"
                      style={{
                        width: `${(b.correct / b.total) * 100}%`,
                      }}
                    />
                  </span>

                  <span className="breakdown-score">
                    {b.correct}/{b.total}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="results-actions">
            <Link href={backHref} className="btn-secondary">
              {backLabel}
            </Link>

            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Rifai
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-shell">
    <QuizHeader
  current={index}
  total={questions.length}
  title={title}
  backHref={backHref}
  backLabel={backLabel}
/>

      <div className="quiz-card">
        <span className="quiz-badge">{current.categoria}</span>

        {current.segnale_correlato && (
          <img
            key={current.id}
            src={`/images/segnali/${current.segnale_correlato}`}
            alt=""
            className="quiz-sign-image"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="quiz-question-card">

  <div className="quiz-question-number">
    Domanda {index + 1}
  </div>

  <h2 className="quiz-question">
    {current.domanda}
  </h2>

</div>

        <div className="quiz-answers">

  <button
    type="button"
    className={`answer-card vero
      ${
        answered && selected === true
          ? current.risposta
            ? "correct"
            : "wrong"
          : ""
      }
      ${
        answered &&
        current.risposta === true &&
        selected !== true
          ? "reveal"
          : ""
      }`}
    onClick={() => answer(true)}
    disabled={answered}
  >

    <div className="answer-icon">✓</div>

    <div className="answer-title">
      VERO
    </div>

  </button>

  <button
    type="button"
    className={`answer-card falso
      ${
        answered && selected === false
          ? current.risposta === false
            ? "correct"
            : "wrong"
          : ""
      }
      ${
        answered &&
        current.risposta === false &&
        selected !== false
          ? "reveal"
          : ""
      }`}
    onClick={() => answer(false)}
    disabled={answered}
  >

    <div className="answer-icon">✕</div>

    <div className="answer-title">
      FALSO
    </div>

  </button>

</div>

        {answered && (
          <div
            className={`quiz-feedback ${
              selected === current.risposta ? "ok" : "no"
            }`}
          >
            <strong>
              {selected === current.risposta
                ? "Corretto."
                : "Sbagliato."}
            </strong>{" "}
            {current.spiegazione}
          </div>
        )}

        {answered && (
          <button className="quiz-next" onClick={next}>
            {index + 1 >= questions.length
              ? "Vedi risultato"
              : "Domanda successiva"}
          </button>
        )}
      </div>
    </div>
  );
}