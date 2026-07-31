"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/lib/auth";

export default function HeaderUser() {
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) {
    return (
      <Link href="/login" className="btn-outline">
        Accedi
      </Link>
    );
  }

  const nome =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Utente";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontWeight: 600 }}>
        👤 {nome}
      </span>

      <button
        onClick={handleLogout}
        className="btn-outline"
      >
        Logout
      </button>
    </div>
  );
}