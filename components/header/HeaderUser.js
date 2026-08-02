"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/lib/auth";

export default function HeaderUser() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="header-user-menu" ref={menuRef}>
      <button
        type="button"
        className="header-user-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        👤 {nome}
        <span className="header-user-chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="header-user-dropdown">
          <Link
            href="/statistiche"
            className="header-user-dropdown-item"
            onClick={() => setOpen(false)}
          >
            📊 Le mie statistiche
          </Link>

          <button
            type="button"
            className="header-user-dropdown-item"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
