"use client";

import Link from "next/link";

import Icon from "@/components/Icon";
import ProgressBar from "./ProgressBar";

export default function ChapterCard({
  chapter,
  title,
  icon,
  total,
  progress = {},
}) {
  const key = `chapter_${String(chapter).padStart(2, "0")}`;

  const completed = progress?.[key]?.questions?.length || 0;

  const percent =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  let color = "#9ca3af";

  if (percent > 0) color = "#2563eb";
  if (percent === 100) color = "#16a34a";

  return (
    <Link href={`/pratica/${chapter}`} className="chapter-card">
      <div className="chapter-card-top">
        <div
          className="chapter-icon"
          style={{ backgroundColor: color }}
        >
          <Icon
            name={icon}
            size={18}
            color="#fff"
          />
        </div>

        <span className="chapter-percent">
          {percent}%
        </span>
      </div>

      <h3>
        {chapter}. {title}
      </h3>

      <ProgressBar
        value={percent}
        color={color}
      />

      <p className="chapter-info">
        {completed} di {total} quiz completati
      </p>

      <button className="chapter-button">
  {percent === 0
    ? "Inizia →"
    : percent === 100
    ? "Ripassa →"
    : "Continua →"}
</button>
    </Link>
  );
}