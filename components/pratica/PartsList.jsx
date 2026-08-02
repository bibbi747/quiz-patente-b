"use client";

import { iconForCategory } from "@/lib/icons";
import ChapterCard from "./ChapterCard";

export default function PartsList({ parts, progress, activeChapter }) {
  return (
    <>
      {parts.map((part, pi) => (
        <section key={part.title} className="part-block">
          <div className="part-header">
            <h2>
              Parte {pi + 1} · {part.title}
            </h2>
            <p>{part.chapters.length} capitoli</p>
          </div>

          <div className="chapters-grid">
            {part.chapters.map((c) => (
              <ChapterCard
                key={c.chapter}
                chapter={c.chapter}
                title={c.title}
                description={c.description}
                icon={iconForCategory(c.title)}
                total={c.count}
                progress={progress}
                active={c.chapter === activeChapter}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}