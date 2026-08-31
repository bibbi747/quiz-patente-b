"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { getUserData } from "@/lib/getUserData";
import { computeStreak } from "@/lib/streak";
import { partColorForChapter, partNumberForChapter } from "@/lib/parts";
import { resetChapterProgress } from "@/lib/progressEngine";
import Gauge from "@/components/Gauge";
import Icon from "@/components/Icon";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import ShareSection from "@/components/share/ShareSection";

function SummaryIcon({ children, amber }) {
  return <span className={`stat-summary-icon${amber ? " amber" : ""}`}>{children}</span>;
}

export default function StatisticheClient({ parts }) {
  const [status, setStatus] = useState("loading"); // loading | out | in
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState({
    progress: {},
    statistics: {},
    mistakes: {},
  });

  async function loadUserData(userId) {
    try {
      const data = await getUserData(userId);
      setUserData({
        progress: data.progress || {},
        statistics: data.statistics || {},
        mistakes: data.mistakes || {},
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("out");
        return;
      }

      setUid(user.uid);
      await loadUserData(user.uid);
      setStatus("in");
    });

    return () => unsubscribe();
  }, []);

  async function handleResetChapter(chapter, currentCounts) {
    const confirmed = window.confirm(
      `Azzerare i progressi del capitolo "${chapter.chapter}. ${chapter.title}"? Le ${currentCounts.answered} risposte già date (${currentCounts.wrong} sbagliate) verranno cancellate e non si può annullare.`
    );

    if (!confirmed) return;

    try {
      await resetChapterProgress(uid, chapter.chapter, currentCounts);
      await loadUserData(uid);
    } catch (err) {
      console.error(err);
    }
  }

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
      const entry = userData.progress?.[key] || {};
      return {
        ...c,
        wrong: entry.wrong || 0,
        answered: entry.questions?.length || 0,
        correct: entry.correct || 0,
      };
    })
    .filter((c) => c.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 5);

  return (
    <>
      <div className="stat-summary-row">
        <div className="stat-summary-card">
          <SummaryIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E3D24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="4" width="14" height="17" rx="2" />
              <path d="M9 3 H15 V6 H9 Z" />
              <path d="M8 10 H16 M8 13.5 H16" />
            </svg>
          </SummaryIcon>
          <span>
            <span className="stat-summary-label">Quiz risolti</span>
            <strong className="stat-summary-value">{totalAnswered}</strong>
          </span>
        </div>

        <div className="stat-summary-card">
          <SummaryIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27A630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5 L10.8 15.3 L16 9.5" />
            </svg>
          </SummaryIcon>
          <span>
            <span className="stat-summary-label">Risposte corrette</span>
            <strong className="stat-summary-value">{totalCorrect}</strong>
          </span>
        </div>

        <div className="stat-summary-card">
          <SummaryIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E3D24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="4.4" stroke="#27A630" />
              <circle cx="12" cy="12" r="1" fill="#0E3D24" stroke="none" />
            </svg>
          </SummaryIcon>
          <span>
            <span className="stat-summary-label">Precisione</span>
            <strong className="stat-summary-value">{accuracy}%</strong>
          </span>
        </div>

        <div className="stat-summary-card">
          <SummaryIcon amber>
            <span style={{ fontSize: 18 }}>🔥</span>
          </SummaryIcon>
          <span>
            <span className="stat-summary-label">Serie di giorni</span>
            <strong className="stat-summary-value">{streak}</strong>
          </span>
        </div>
      </div>

      <div className="stat-progress-card">
        <Gauge progress={overallPercent / 100} color="#27A630" size="big" label={`${overallPercent}%`} />

        <div className="stat-progress-text">
          <p className="stat-progress-title">Avanzamento generale</p>
          <p className="stat-progress-sub">
            Hai completato <strong>{chaptersCompleted} capitoli</strong> su{" "}
            {allChapters.length}, per un totale del <strong>{overallPercent}%</strong>{" "}
            delle domande del manuale.
          </p>
          <div className="stat-progress-bar">
            <div className="stat-progress-bar-fill" style={{ width: `${overallPercent}%` }} />
          </div>
          <p className="stat-progress-count">
            {chaptersCompleted} / {allChapters.length} capitoli completati
          </p>
        </div>

        <span className="stat-progress-trophy">
          <img src="/images/statistiche/trofeo.png" alt="" width={120} height={120} />
        </span>
      </div>

      <ShareSection
        stats={{
          percentage: overallPercent,
          quizCompleted: totalAnswered,
          chaptersCompleted,
          totalChapters: allChapters.length,
          streak,
          accuracy,
        }}
      />

      <section className="stat-weak-section">
        <h2>Capitoli da ripassare</h2>

        {weakChapters.length === 0 ? (
          <p className="stat-weak-empty">
            Non hai ancora errori registrati — continua così!
          </p>
        ) : (
          <>
            <div className="stat-weak-list">
              {weakChapters.map((c) => {
                const partNumber = String(partNumberForChapter(c.chapter)).padStart(2, "0");
                return (
                  <div key={c.chapter} className="stat-weak-item">
                    <Link href={`/pratica/${c.chapter}`} className="stat-weak-item-link">
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
                      <span className="stat-weak-chevron">
                        <Icon name="chevron" size={16} />
                      </span>
                    </Link>

                    <button
                      type="button"
                      className="stat-weak-reset"
                      onClick={() => handleResetChapter(c, c)}
                    >
                      Azzera
                    </button>
                  </div>
                );
              })}
            </div>

            <Link href="/pratica" className="stat-weak-more">
              Vedi tutti i capitoli →
            </Link>
          </>
        )}
      </section>
    </>
  );
}