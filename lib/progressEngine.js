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

  // Chiave del giorno di oggi (fuso orario del dispositivo), usata per
  // calcolare la serie di giorni consecutivi di pratica.
  const todayKey = new Date().toISOString().slice(0, 10);

  const update = {
    // Statistiche globali
    "statistics.totalAnswers": increment(1),
    "statistics.activeDays": arrayUnion(todayKey),

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

/**
 * Azzera i progressi di un singolo capitolo e scala di conseguenza i
 * totali generali (statistics), così i due restano coerenti.
 * currentCounts sono i valori attuali del capitolo prima dell'azzeramento
 * (answered/correct/wrong), servono per sapere quanto sottrarre ai totali.
 */
export async function resetChapterProgress(uid, chapter, currentCounts = {}) {
  const ref = doc(db, "users", uid);

  const chapterKey = `progress.chapter_${String(chapter).padStart(2, "0")}`;

  const answered = currentCounts.answered || 0;
  const correct = currentCounts.correct || 0;
  const wrong = currentCounts.wrong || 0;

  const update = {
    [`${chapterKey}.answered`]: 0,
    [`${chapterKey}.correct`]: 0,
    [`${chapterKey}.wrong`]: 0,
    [`${chapterKey}.questions`]: [],
    [`${chapterKey}.updatedAt`]: new Date(),
  };

  if (answered > 0) update["statistics.totalAnswers"] = increment(-answered);
  if (correct > 0) update["statistics.correctAnswers"] = increment(-correct);
  if (wrong > 0) update["statistics.wrongAnswers"] = increment(-wrong);

  await updateDoc(ref, update);
}