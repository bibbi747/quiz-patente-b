"use client";

import Link from "next/link";

export default function ContinueCard({ parts, progress }) {
  let latest = null;

  Object.entries(progress || {}).forEach(([key, value]) => {
    if (!value?.answered) return;

    if (
      !latest ||
      value.updatedAt?.seconds > latest.updatedAt?.seconds
    ) {
      latest = {
        key,
        ...value,
      };
    }
  });

  if (!latest) return null;

  const chapterNumber = Number(latest.key.replace("chapter_", ""));

  let chapterTitle = "";

  for (const part of parts) {
    const chapter = part.chapters.find(
      (c) => c.chapter === chapterNumber
    );

    if (chapter) {
      chapterTitle = chapter.title;
      break;
    }
  }

  const total =
    parts
      .flatMap((p) => p.chapters)
      .find((c) => c.chapter === chapterNumber)?.count || 0;

  const percent =
    total > 0
      ? Math.round((latest.answered / total) * 100)
      : 0;

  return (
    <Link
      href={`/pratica/${chapterNumber}`}
      className="continue-card"
    >
      <div className="continue-header">
        <span className="continue-badge">
          Continua
        </span>

        <span className="continue-percent">
          {percent}%
        </span>
      </div>

      <h2>{chapterTitle}</h2>

      <p>
        {latest.answered} di {total} domande completate
      </p>

      <div className="continue-progress">
        <div
          className="continue-progress-fill"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <span className="continue-link">
        Continua →
      </span>
    </Link>
  );
}