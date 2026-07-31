"use client";

import { iconForCategory } from "@/lib/icons";
import ChapterCard from "./ChapterCard";

export default function PartsList({ parts, progress }) {
  return (
    <>
      {parts.map((part, pi) => (
        <section key={part.title} className="part-block">
          <p className="part-eyebrow">
            Parte {pi + 1}
          </p>

          <h2 className="part-title">
            {part.title}
          </h2>

          <div className="chapters-grid">
            {part.chapters.map((c) => (
              <ChapterCard
                key={c.chapter}
                chapter={c.chapter}
                title={c.title}
                icon={iconForCategory(c.title)}
                total={c.count}
                progress={progress}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}