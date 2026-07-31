import { notFound } from "next/navigation";
import {
  getChapterByNumber,
  allChapterNumbers,
} from "@/lib/parts";
import { getQuestionsByCategories, shuffle } from "@/lib/questions";
import QuizSession from "@/components/QuizSession";

export function generateStaticParams() {
  return allChapterNumbers().map((n) => ({ chapter: String(n) }));
}

export function generateMetadata({ params }) {
  const chapter = getChapterByNumber(params.chapter);

  return {
    title: chapter
      ? `Capitolo ${chapter.chapter} — ${chapter.title} — Quiz Patente B`
      : "Quiz Patente B",
  };
}

export default function CapitoloPage({ params }) {
  const chapter = getChapterByNumber(params.chapter);

  if (!chapter) notFound();

  console.log("PAGE:", chapter);

  const questions = shuffle(
    getQuestionsByCategories(chapter.categorie)
  );

  return (
    <main>
      <QuizSession
        chapter={chapter.chapter}
        questions={questions}
        mode="pratica"
        title={`Capitolo ${chapter.chapter} — ${chapter.title}`}
        backHref="/pratica"
        backLabel="Altri capitoli"
      />
    </main>
  );
}