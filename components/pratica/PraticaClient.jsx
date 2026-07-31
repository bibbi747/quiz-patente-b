"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getUserData } from "@/lib/getUserData";

import ContinueCard from "./ContinueCard";
import PartsList from "./PartsList";

export default function PraticaClient({ parts }) {
  const [userData, setUserData] = useState({
    progress: {},
    statistics: {},
    mistakes: {},
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData({
          progress: {},
          statistics: {},
          mistakes: {},
        });
        return;
      }

      try {
        const data = await getUserData(user.uid);

        setUserData({
          progress: data.progress || {},
          statistics: data.statistics || {},
          mistakes: data.mistakes || {},
        });
      } catch (err) {
        console.error(err);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ContinueCard
        parts={parts}
        progress={userData.progress}
      />

      <div className="parts-list">
        <PartsList
          parts={parts}
          progress={userData.progress}
        />
      </div>
    </>
  );
}