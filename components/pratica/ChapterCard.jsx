"use client";

import Link from "next/link";

import Icon from "@/components/Icon";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import ProgressBar from "./ProgressBar";
import { partColorForChapter, partNumberForChapter } from "@/lib/parts";

export default function ChapterCard({
  chapter,
  title,
  description,
  icon,
  total,
  progress = {},
  active = false,
}) {
  const key = `chapter_${String(chapter).padStart(2, "0")}`;

  const completed = progress?.[key]?.questions?.length || 0;

  const percent =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  // Colore dell'icona: fisso per argomento (Parte del libro), non per
  // progresso — dà varietà visiva alla griglia anche a 0%.
  const iconColor = partColorForChapter(chapter);
  const partNumber = String(partNumberForChapter(chapter)).padStart(2, "0");

  // Colore della barra di avanzamento: stesso verde per qualsiasi
  // progresso maggiore di zero, grigio solo se non ancora iniziato.
  let progressColor = "#9ca3af";
  if (percent > 0) progressColor = "#27A630";

  return (
    <Link
      href={`/pratica/${chapter}`}
      className={`chapter-card${active ? " active" : ""}`}
    >
      <div className="chapter-main">
        <div className="chapter-icon">
          <ImageWithFallback
            src={`/images/parti/parte-${partNumber}.png`}
            alt=""
            className="chapter-icon-img"
            fallback={<Icon name={icon} size={26} color={iconColor} />}
          />
        </div>

        <div className="chapter-content">
          <div className="chapter-head">
            <div>
              <span className="chapter-number">Capitolo {chapter}</span>
              <h3 className="chapter-title">{title}</h3>
            </div>

            <span className="chapter-percent">{percent}%</span>
          </div>

          {description && <p className="chapter-description">{description}</p>}
        </div>
      </div>

      <ProgressBar value={percent} color={progressColor} />

      <div className="chapter-footer">
        {active ? (
          <span className="chapter-badge">In corso</span>
        ) : (
          <span className="chapter-quiz">
            {completed} / {total} quiz
          </span>
        )}

        <span className="chapter-right">
          <Icon name="chevron" size={16} />
        </span>
      </div>
    </Link>
  );
}