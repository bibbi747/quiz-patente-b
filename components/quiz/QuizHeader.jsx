"use client";

import Link from "next/link";

export default function QuizHeader({
  current,
  total,
  title,
  backHref,
  backLabel,
}) {
  const percent =
    total > 0
      ? ((current + 1) / total) * 100
      : 0;

  return (
    <div className="quiz-header">

      <div className="quiz-header-top">

        <Link
          href={backHref}
          className="quiz-back"
        >
          ← {backLabel}
        </Link>

        <span className="quiz-counter">
          {current + 1} / {total}
        </span>

      </div>

      <h1 className="quiz-title">
        {title}
      </h1>

      <div className="quiz-progress">

        <div
          className="quiz-progress-fill"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}