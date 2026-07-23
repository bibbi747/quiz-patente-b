import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Quiz Patente B — Esercitati con il manuale",
  description:
    "Il software di pratica quiz che accompagna il manuale Patente B: esercitati per capitolo o affronta la simulazione d'esame completa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">PB</span>
              Quiz Patente B
            </Link>
            <nav className="header-nav">
              <Link href="/pratica">Pratica</Link>
              <Link href="/esame">Simulazione esame</Link>
            </nav>
          </div>
        </header>
        <div className="road-divider" />
        {children}
        <footer className="site-footer">
          Strumento gratuito abbinato al manuale Patente B — non sostituisce la
          banca dati ufficiale del Ministero.
        </footer>
      </body>
    </html>
  );
}
