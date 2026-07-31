import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserProgress(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {};
  }

  const data = snap.data();

  return data.progress || {};
}