import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

// Login con Google
export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Login Email
export async function loginEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Registrazione
export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Reset password
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

// Logout
export async function logout() {
  return signOut(auth);
}