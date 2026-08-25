import "./globals.css";
import "./design.css";
import "@/components/header/header.css";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider";
import HeaderUser from "@/components/header/HeaderUser";

export const metadata = {
  title: "Quiz Patente B — Esercitati con il manuale",
  description:
    "Il software di pratica quiz che accompagna il manuale Patente B: esercitati per capitolo o affronta la simulazione d'esame completa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <AuthProvider>
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="brand">
                <span className="brand-mark">PB</span>
                Quiz Patente B
              </Link>

              <nav
                className="header-nav"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                }}
              >
                <Link href="/pratica">Pratica</Link>
                <Link href="/esame">Simulazione esame</Link>

                <HeaderUser />
              </nav>
            </div>
          </header>

          <div className="road-divider" />

          {children}

          <footer
            className="site-footer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>
              Strumento gratuito abbinato al manuale Patente B — domande
              originali elaborate sugli argomenti ufficiali del programma
              ministeriale (MIT), non estratte dalla banca dati ufficiale
              del Ministero.
            </span>

            <nav style={{ display: "flex", gap: "16px" }}>
              <Link href="/privacy" style={{ color: "inherit" }}>
                Privacy Policy
              </Link>
            </nav>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
