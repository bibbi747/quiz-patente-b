import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/*
  Inizializza i campi necessari nel documento utente.
*/
export async function initializeProgress(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  const update = {};

  if (!data.progress) {
    update.progress = {};
  }

  if (!data.statistics) {
    update.statistics = {
      totalAnswers: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      completedChapters: 0,
    };
  }

  if (!data.mistakes) {
    update.mistakes = {
      questions: [],
    };
  }

  if (Object.keys(update).length > 0) {
    update.updatedAt = serverTimestamp();
    await updateDoc(ref, update);
  }
}

/*
  Aggiorna la data dell'ultimo utilizzo.
*/
export async function touchProgress(uid) {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    updatedAt: serverTimestamp(),
  });
}