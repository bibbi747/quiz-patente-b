import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6i2hijVcYWckyCQgu1jMxc9gkYduTl1U",
  authDomain: "quiz-patente-b-b0ba3.firebaseapp.com",
  projectId: "quiz-patente-b-b0ba3",
  storageBucket: "quiz-patente-b-b0ba3.firebasestorage.app",
  messagingSenderId: "58426780367",
  appId: "1:58426780367:web:b8a3e21830b475356825ba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;