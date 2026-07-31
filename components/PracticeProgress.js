"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getUserProgress } from "@/lib/getUserProgress";

export default function PracticeProgress({
  chapter,
  totalQuestions,
}) {
  const { user } = useAuth();
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const progress = await getUserProgress(user.uid);

      const key = `chapter_${String(chapter).padStart(2, "0")}`;
      const chapterData = progress[key];

      if (!chapterData) {
        setPercent(0);
        return;
      }

      const completed = chapterData.questions?.length || 0;

      const value =
        totalQuestions > 0
          ? Math.round((completed / totalQuestions) * 100)
          : 0;

      setPercent(value);
    }

    load();
  }, [user, chapter, totalQuestions]);

  if (totalQuestions === 0) {
    return <span className="chapter-count">In arrivo</span>;
  }

  if (percent === null) {
    return <span className="chapter-count">...</span>;
  }

  return (
    <span className="chapter-count">
      {percent}% • {totalQuestions} quiz
    </span>
  );
}