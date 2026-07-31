"use client";

import { useAuth } from "@/components/AuthProvider";
import QuizEngine from "@/components/QuizEngine";
import { saveAnswer } from "@/lib/progressEngine";

export default function QuizSession({
  chapter,
  ...props
}) {
  console.log("QUIZSESSION chapter =", chapter);

  const { user } = useAuth();

  async function handleAnswer(data) {
    console.log("HANDLEANSWER chapter =", chapter);
    console.log("QUESTION =", data.question);

    if (!user) return;

    try {
      await saveAnswer(
        user.uid,
        data.question.id,
        chapter,
        data.isCorrect
      );
    } catch (err) {
      console.error("Errore salvataggio risposta:", err);
    }
  }

  return (
    <QuizEngine
      {...props}
      onAnswer={handleAnswer}
    />
  );
}