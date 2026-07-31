import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserData(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {
      progress: {},
      statistics: {},
      mistakes: {},
    };
  }

  const data = snap.data();

  return {
    ...data,
    progress: data.progress || {},
    statistics: data.statistics || {},
    mistakes: data.mistakes || {},
  };
}