"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getUserData } from "@/lib/getUserData";
import { computeStreak } from "@/lib/streak";
import { iconForCategory } from "@/lib/icons";

import FilterBar from "./FilterBar";
import PartsList from "./PartsList";
import ChapterCard from "./ChapterCard";
import EmptyState from "./EmptyState";
import LoadingSkeleton from "./LoadingSkeleton";
import CapitoliHeader from "./CapitoliHeader";

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function PraticaClient({ parts }) {
  const [userData, setUserData] = useState({
    progress: {},
    statistics: {},
    mistakes: {},
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("capitolo");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData({
          progress: {},
          statistics: {},
          mistakes: {},
        });
        setLoading(false);
        return;
      }

      try {
        const data = await getUserData(user.uid);

        setUserData({
          progress: data.progress || {},
          statistics: data.statistics || {},
          mistakes: data.mistakes || {},
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const allChapters = parts.flatMap((p) => p.chapters);

  function percentFor(chapter) {
    const key = `chapter_${String(chapter.chapter).padStart(2, "0")}`;
    const completed = userData.progress?.[key]?.questions?.length || 0;
    return chapter.count > 0 ? Math.round((completed / chapter.count) * 100) : 0;
  }

  const totalQuestions = allChapters.reduce((sum, c) => sum + c.count, 0);

  const totalCompletedQuestions = allChapters.reduce((sum, c) => {
    const key = `chapter_${String(c.chapter).padStart(2, "0")}`;
    return sum + (userData.progress?.[key]?.questions?.length || 0);
  }, 0);

  const overallPercent =
    totalQuestions > 0
      ? Math.round((totalCompletedQuestions / totalQuestions) * 100)
      : 0;

  const chaptersCompleted = allChapters.filter((c) => percentFor(c) === 100).length;

  const totalAnswered = userData.statistics?.totalAnswers || 0;
  const totalCorrect = userData.statistics?.correctAnswers || 0;
  const streak = computeStreak(userData.statistics?.activeDays || []);

  // Il capitolo "in corso" è quello con l'aggiornamento più recente tra
  // quelli iniziati ma non ancora completati al 100%.
  let activeChapter = null;
  let latestUpdate = 0;

  Object.entries(userData.progress || {}).forEach(([key, value]) => {
    const answered = value?.questions?.length || 0;
    if (!answered) return;

    const chapterNumber = Number(key.replace("chapter_", ""));
    const total =
      allChapters.find((c) => c.chapter === chapterNumber)?.count || 0;

    if (total > 0 && answered >= total) return; // già completato

    const updatedAt = value.updatedAt?.seconds || 0;

    if (updatedAt >= latestUpdate) {
      latestUpdate = updatedAt;
      activeChapter = chapterNumber;
    }
  });

  function matchesStatus(chapter) {
    const percent = percentFor(chapter);
    if (statusFilter === "new") return percent === 0;
    if (statusFilter === "progress") return percent > 0 && percent < 100;
    if (statusFilter === "done") return percent === 100;
    return true; // "all"
  }

  function matchesSearch(chapter) {
    const query = normalize(search.trim());
    if (!query) return true;
    return normalize(`${chapter.chapter} ${chapter.title}`).includes(query);
  }

  // Elenco raggruppato per Parte — usato con l'ordinamento "Capitolo"
  // (l'ordine naturale del libro), applicando ricerca e filtro di stato.
  const filteredParts = useMemo(() => {
    return parts
      .map((part) => ({
        ...part,
        chapters: part.chapters.filter(
          (c) => matchesSearch(c) && matchesStatus(c)
        ),
      }))
      .filter((part) => part.chapters.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts, search, statusFilter, userData.progress]);

  // Elenco piatto (senza raggruppamento per Parte) — usato con gli
  // ordinamenti "Nome" e "Progresso", che mescolano capitoli di parti
  // diverse e quindi non sono più coerenti con la struttura del libro.
  const flatChapters = useMemo(() => {
    const list = allChapters.filter(
      (c) => matchesSearch(c) && matchesStatus(c)
    );

    if (sortBy === "nome") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title, "it"));
    }

    if (sortBy === "progresso") {
      return [...list].sort((a, b) => percentFor(b) - percentFor(a));
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChapters, search, statusFilter, sortBy, userData.progress]);

  const isGrouped = sortBy === "capitolo";
  const resultsCount = isGrouped
    ? filteredParts.reduce((sum, p) => sum + p.chapters.length, 0)
    : flatChapters.length;

  return (
    <div className="practice-main">
      <CapitoliHeader progressPercent={overallPercent} />

      <FilterBar
        selected={statusFilter}
        onChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="chapters-grid">
          <LoadingSkeleton />
        </div>
      ) : resultsCount === 0 ? (
        <EmptyState query={search} />
      ) : isGrouped ? (
        <div className="parts-list">
          <PartsList
            parts={filteredParts}
            progress={userData.progress}
            activeChapter={activeChapter}
          />
        </div>
      ) : (
        <div className="chapters-grid chapters-grid-flat">
          {flatChapters.map((c) => (
            <ChapterCard
              key={c.chapter}
              chapter={c.chapter}
              title={c.title}
              description={c.description}
              icon={iconForCategory(c.title)}
              total={c.count}
              progress={userData.progress}
              active={c.chapter === activeChapter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
