"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { initializeProgress } from "@/lib/progress";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (!snap.exists()) {
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              nome: firebaseUser.displayName || "",
              email: firebaseUser.email || "",
              provider: firebaseUser.providerData[0]?.providerId || "",
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            });
          } else {
            await updateDoc(userRef, {
              lastLogin: serverTimestamp(),
            });
          }

          // Crea il documento dei progressi se non esiste
          await initializeProgress(firebaseUser.uid);

        } catch (err) {
          console.error("Errore inizializzazione utente:", err);
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}