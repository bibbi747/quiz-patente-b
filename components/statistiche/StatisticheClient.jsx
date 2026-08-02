"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { getUserData } from "@/lib/getUserData";
import { computeStreak } from "@/lib/streak";
import { partColorForChapter, partNumberForChapter } from "@/lib/parts";
import Gauge from "@/components/Gauge";
import Icon from "@/components/Icon";
import ImageWithFallback from "@/components/common/ImageWithFallback";

export default function StatisticheClient({ parts }) {
  const [status, setStatus] = useState("loading"); // loading | out | in
  const [userData, setUserData] = useState({
    progress: {},
    statistics: {},
    mistakes: {},
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("out");
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
        setStatus("in");
      }
    });

    return () => unsubscribe();
  }, []);

  if (status === "loading") {
    return <p className="stat-page-loading">Caricamento...</p>;
  }

  if (status === "out") {
    return (
      <div className="stat-login-card">
        <h2>Accedi per vedere le tue statistiche</h2>
        <p>
          I tuoi progressi vengono salvati solo se hai fatto l&apos;accesso.
        </p>
        <Link href="/login" className="btn-navy">
          Accedi
        </Link>
      </div>
    );
  }

  const allChapters = parts.flatMap((p) => p.chapters);

  const totalQuestions = allChapters.reduce((sum, c) => sum + c.count, 0);

  const totalCompletedQuestions = allChapters.reduce((sum, c) => {
    const key = `chapter_${String(c.chapter).padStart(2, "0")}`;
    return sum + (userData.progress?.[key]?.questions?.length || 0);
  }, 0);

  const overallPercent =
    totalQuestions > 0
      ? Math.round((totalCompletedQuestions / totalQuestions) * 100)
      : 0;

  function percentFor(chapter) {
    const key = `chapter_${String(chapter.chapter).padStart(2, "0")}`;
    const completed = userData.progress?.[key]?.questions?.length || 0;
    return chapter.count > 0 ? Math.round((completed / chapter.count) * 100) : 0;
  }

  const chaptersCompleted = allChapters.filter((c) => percentFor(c) === 100).length;

  const totalAnswered = userData.statistics?.totalAnswers || 0;
  const totalCorrect = userData.statistics?.correctAnswers || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const streak = computeStreak(userData.statistics?.activeDays || []);

  // Capitoli con più errori, per capire dove ripassare.
  const weakChapters = allChapters
    .map((c) => {
      const key = `chapter_${String(c.chapter).padStart(2, "0")}`;
      const wrong = userData.progress?.[key]?.wrong || 0;
      return { ...c, wrong };
    })
    .filter((c) => c.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 5);

  return (
    <>
      <div className="stat-summary-row">
        <div className="stat-summary-card">
          <span className="stat-summary-label">Quiz risolti</span>
          <strong className="stat-summary-value">{totalAnswered}</strong>
        </div>
        <div className="stat-summary-card">
          <span className="stat-summary-label">Risposte corrette</span>
          <strong className="stat-summary-value">{totalCorrect}</strong>
        </div>
        <div className="stat-summary-card">
          <span className="stat-summary-label">Precisione</span>
          <strong className="stat-summary-value">{accuracy}%</strong>
        </div>
        <div className="stat-summary-card">
          <span className="stat-summary-label">Serie di giorni</span>
          <strong className="stat-summary-value">
            {streak > 0 ? `🔥 ${streak}` : "—"}
          </strong>
        </div>
      </div>

      <div className="stat-progress-card">
        <Gauge progress={overallPercent / 100} color="var(--pb-green)" size="big" label={`${overallPercent}%`} />
        <div>
          <p className="stat-progress-title">Avanzamento generale</p>
          <p className="stat-progress-sub">
            Hai completato <strong>{chaptersCompleted} capitoli</strong> su{" "}
            {allChapters.length}, per un totale del <strong>{overallPercent}%</strong>{" "}
            delle domande del manuale.
          </p>
        </div>
      </div>

      <section className="stat-weak-section">
        <h2>Capitoli da ripassare</h2>

        {weakChapters.length === 0 ? (
          <p className="stat-weak-empty">
            Non hai ancora errori registrati — continua così!
          </p>
        ) : (
          <div className="stat-weak-list">
            {weakChapters.map((c) => {
              const partNumber = String(partNumberForChapter(c.chapter)).padStart(2, "0");
              return (
                <Link
                  key={c.chapter}
                  href={`/pratica/${c.chapter}`}
                  className="stat-weak-item"
                >
                  <div className="stat-weak-icon">
                    <ImageWithFallback
                      src={`/images/parti/parte-${partNumber}.png`}
                      alt=""
                      className="stat-weak-icon-img"
                      fallback={<Icon name="alert" size={18} color={partColorForChapter(c.chapter)} />}
                    />
                  </div>
                  <div className="stat-weak-text">
                    <p className="stat-weak-title">{c.chapter}. {c.title}</p>
                    <p className="stat-weak-count">{c.wrong} risposte sbagliate</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
