import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * Salva una risposta dell'utente.
 */
export async function saveAnswer(
  uid,
  questionId,
  chapter,
  isCorrect
) {
  const ref = doc(db, "users", uid);

  const chapterKey = `progress.chapter_${String(chapter).padStart(2, "0")}`;

  const update = {
    // Statistiche globali
    "statistics.totalAnswers": increment(1),

    // Statistiche del capitolo
    [`${chapterKey}.answered`]: increment(1),
    [`${chapterKey}.updatedAt`]: new Date(),

    // Domande già affrontate (una sola volta)
    [`${chapterKey}.questions`]: arrayUnion(questionId),

    lastLogin: new Date(),
  };

  if (isCorrect) {
    update["statistics.correctAnswers"] = increment(1);
    update[`${chapterKey}.correct`] = increment(1);
  } else {
    update["statistics.wrongAnswers"] = increment(1);
    update[`${chapterKey}.wrong`] = increment(1);

    update["mistakes.questions"] = arrayUnion(questionId);
  }

  await updateDoc(ref, update);
}