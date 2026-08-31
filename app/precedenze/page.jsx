import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import styles from "./precedenze.module.css";

// ---- Diagrammi SVG (vista dall'alto, incorporati: nessuna immagine esterna necessaria) ----

function Car({ x, y, w = 26, h = 16, rot = 0, color, label }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={5} fill={color} />
      <circle cx={0} cy={0} r={9} fill={color} stroke="#fff" strokeWidth={2} />
      <text x={0} y={4} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={11} fill="#fff">
        {label}
      </text>
    </g>
  );
}

function AerialBase() {
  return (
    <>
      <rect width="220" height="220" fill="#6FAE6A" />
      <circle cx="20" cy="20" r="13" fill="#5E9A59" />
      <circle cx="200" cy="20" r="10" fill="#5E9A59" />
      <circle cx="20" cy="200" r="10" fill="#5E9A59" />
      <circle cx="200" cy="200" r="13" fill="#5E9A59" />
    </>
  );
}

function Diagram1() {
  // Incrocio a T: X ovest, Y est, Z sud (ramo nord assente)
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <rect x="0" y="94" width="220" height="32" fill="#3C4657" />
      <rect x="94" y="94" width="32" height="126" fill="#3C4657" />
      <line x1="0" y1="110" x2="220" y2="110" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <line x1="110" y1="126" x2="110" y2="220" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <Car x={30} y={110} color="#2F5FE0" label="X" />
      <Car x={190} y={110} color="#F2A93B" label="Y" />
      <Car x={110} y={200} w={16} h={26} color="#E0483E" label="Z" />
    </svg>
  );
}

function Diagram2() {
  // Croce con ramo ovest libero: A nord, B est, C sud
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <rect x="0" y="94" width="220" height="32" fill="#3C4657" />
      <rect x="94" y="0" width="32" height="220" fill="#3C4657" />
      <line x1="0" y1="110" x2="220" y2="110" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <line x1="110" y1="0" x2="110" y2="220" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <Car x={110} y={30} w={16} h={26} color="#2F5FE0" label="A" />
      <Car x={190} y={110} color="#F2A93B" label="B" />
      <Car x={110} y={190} w={16} h={26} color="#E0483E" label="C" />
      <circle cx="30" cy="110" r="9" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="2 3" opacity={0.85} />
      <text x="30" y="132" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8.5" fill="#fff">libero</text>
    </svg>
  );
}

function Diagram3() {
  // Tram T su rotaie (orizzontale), auto X da sud
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <rect x="0" y="94" width="220" height="32" fill="#3C4657" />
      <rect x="94" y="0" width="32" height="220" fill="#3C4657" />
      <line x1="110" y1="0" x2="110" y2="220" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <line x1="0" y1="103" x2="220" y2="103" stroke="#D8CFAE" strokeWidth="2" />
      <line x1="0" y1="117" x2="220" y2="117" stroke="#D8CFAE" strokeWidth="2" />
      <line x1="8" y1="99" x2="8" y2="121" stroke="#D8CFAE" strokeWidth="2" />
      <line x1="34" y1="99" x2="34" y2="121" stroke="#D8CFAE" strokeWidth="2" />
      <line x1="60" y1="99" x2="60" y2="121" stroke="#D8CFAE" strokeWidth="2" />
      <g transform="translate(38,110)">
        <rect x="-19" y="-10" width="38" height="20" rx="4" fill="#8C7A4E" />
        <circle cx="16" cy="10" r="8" fill="#8C7A4E" stroke="#fff" strokeWidth="2" />
        <text x="16" y="14" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize="10" fill="#fff">T</text>
      </g>
      <Car x={110} y={190} w={16} h={26} color="#2F5FE0" label="X" />
    </svg>
  );
}

function Diagram4() {
  // Segnale Dare precedenza: X sud (minore, con segnale), Y ovest (principale, sinistra di X)
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <rect x="0" y="94" width="220" height="32" fill="#3C4657" />
      <rect x="94" y="94" width="32" height="126" fill="#3C4657" />
      <line x1="0" y1="110" x2="220" y2="110" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <line x1="110" y1="126" x2="110" y2="220" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <polygon points="110,152 101,167 119,167" fill="#fff" stroke="#E0483E" strokeWidth="3" />
      <Car x={30} y={110} color="#F2A93B" label="Y" />
      <Car x={110} y={200} w={16} h={26} color="#2F5FE0" label="X" />
    </svg>
  );
}

function Diagram5() {
  // Montagna: X sale (con piazzola vicina), Y scende
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <path d="M 40 210 L 180 10" stroke="#3C4657" strokeWidth="34" fill="none" strokeLinecap="round" />
      <path d="M 40 210 L 180 10" stroke="#F3F5FA" strokeWidth="2" strokeDasharray="8 6" fill="none" />
      <path d="M 78 158 Q 110 140 100 172 Q 78 182 65 165 Z" fill="#3C4657" />
      <text x="72" y="148" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8.5" fill="#fff">piazzola</text>
      <Car x={60} y={192} w={16} h={26} rot={-35} color="#2F5FE0" label="X" />
      <Car x={160} y={28} w={16} h={26} rot={-35} color="#E0483E" label="Y" />
    </svg>
  );
}

function Diagram6() {
  // Ambulanza E da ovest, X da sud che si sposta
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" style={{ display: "block" }}>
      <AerialBase />
      <rect x="0" y="94" width="220" height="32" fill="#3C4657" />
      <rect x="94" y="0" width="32" height="220" fill="#3C4657" />
      <line x1="0" y1="110" x2="220" y2="110" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <line x1="110" y1="0" x2="110" y2="220" stroke="#F3F5FA" strokeWidth="2.2" strokeDasharray="9 7" />
      <Car x={30} y={110} w={28} h={18} color="#E0483E" label="E" />
      <line x1="14" y1="94" x2="10" y2="88" stroke="#E0483E" strokeWidth="2" />
      <line x1="30" y1="90" x2="30" y2="82" stroke="#E0483E" strokeWidth="2" />
      <line x1="46" y1="94" x2="50" y2="88" stroke="#E0483E" strokeWidth="2" />
      <Car x={110} y={188} w={16} h={26} color="#2F5FE0" label="X" />
    </svg>
  );
}

const examples = [
  {
    id: 1,
    title: "Incrocio a T senza segnali",
    tag: "3 strade",
    diagram: <Diagram1 />,
    order: [
      { letter: "Y", color: "#F2A93B" },
      { letter: "Z", color: "#E0483E" },
      { letter: "X", color: "#2F5FE0" }
    ],
    explanation:
      "X ha alla sua destra Z: deve dargli la precedenza. Z ha alla sua destra Y: deve attendere anche lui. Y non ha nessuno alla propria destra (il ramo nord non esiste) e passa per primo.",
    tip: "Nell'incrocio a T, il ramo mancante è sempre \u201clibero\u201d per chi arriva da quel lato."
  },
  {
    id: 2,
    title: "Incrocio a croce con un ramo libero",
    tag: "4 strade",
    diagram: <Diagram2 />,
    order: [
      { letter: "A", color: "#2F5FE0" },
      { letter: "B", color: "#F2A93B" },
      { letter: "C", color: "#E0483E" }
    ],
    explanation:
      "A ha il ramo ovest libero alla sua destra e passa per primo. B ha A alla sua destra e attende. C ha B alla sua destra e attende anche lui. Passato A, passa B; poi C.",
    tip: "Con 4 veicoli tutti diretti dritto e nessun ramo libero, la regola della destra non avrebbe un'unica soluzione: per questo negli esami reali c'è sempre un'asimmetria (un ramo vuoto o una svolta)."
  },
  {
    id: 3,
    title: "Incrocio con un tram",
    tag: "Veicoli su rotaie",
    diagram: <Diagram3 />,
    order: [
      { letter: "T", color: "#8C7A4E" },
      { letter: "X", color: "#2F5FE0" }
    ],
    explanation:
      "Il tram T proviene da sinistra rispetto a X. La precedenza a destra qui non vale: i veicoli su rotaia hanno sempre la precedenza, da qualunque lato arrivino.",
    tip: "Vale anche per motocicli e ciclomotori: il tram ha sempre la precedenza sui veicoli su gomma, mai il contrario."
  },
  {
    id: 4,
    title: "Segnale \u201cDare precedenza\u201d",
    tag: "Vale anche per lo Stop",
    diagram: <Diagram4 />,
    order: [
      { letter: "Y", color: "#F2A93B" },
      { letter: "X", color: "#2F5FE0" }
    ],
    explanation:
      "X è sulla strada secondaria, dove si trova il segnale, e deve fermarsi. Y arriva sulla strada principale da sinistra rispetto a X. Con il segnale, la posizione reciproca non conta più: si dà sempre la precedenza a chi percorre la strada principale, anche da sinistra.",
    tip: "Lo stesso vale, in modo ancora più rigido, con il segnale di Stop: ci si ferma comunque, anche se l'incrocio sembra libero."
  },
  {
    id: 5,
    title: "Strettoia in salita e discesa",
    tag: "Strada di montagna",
    diagram: <Diagram5 />,
    order: [
      { letter: "Y", color: "#E0483E" },
      { letter: "X", color: "#2F5FE0" }
    ],
    explanation:
      "X sale, Y scende, la carreggiata non consente l'incrocio. Di norma chi sale ha la precedenza, ma qui la piazzola è più vicina a X: è lui a fermarsi, per evitare che sia Y a dover arretrare in retromarcia sulla pendenza.",
    tip: "La regola cambia in base a dove si trova la piazzola, non solo in base a chi sta salendo."
  },
  {
    id: 6,
    title: "Veicolo di emergenza",
    tag: "Ambulanza con lampeggiante",
    diagram: <Diagram6 />,
    order: [
      { letter: "E", color: "#E0483E" },
      { letter: "X", color: "#2F5FE0" }
    ],
    explanation:
      "L'ambulanza E, con luce blu e sirena attive, si avvicina. X, che in condizioni normali avrebbe la precedenza, deve comunque cederla: rallenta, si sposta verso il margine e lascia passare E.",
    tip: "Il privilegio vale solo quando entrambi i dispositivi, luce e sirena, sono attivi contemporaneamente."
  }
];

export default function PrecedenzePage() {
  return (
    <main className={`container ${styles.wide}`}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>
            <Icon name="book" size={15} /> Guida visuale
          </span>

          <h1>
            Impara le precedenze
            <br />
            senza memorizzare.
          </h1>

          <p>
            Comprendi il ragionamento dietro ogni incrocio grazie a esempi
            pratici spiegati passo dopo passo.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statPill}>
              <span className={styles.statPillIcon}>
                <Icon name="target" size={20} />
              </span>
              <span>
                <strong>6</strong>
                <small>Casi pratici</small>
              </span>
            </div>

            <div className={styles.statPill}>
              <span className={`${styles.statPillIcon} ${styles.statPillIconTrophy}`}>
                <Icon name="trophy" size={20} />
              </span>
              <span>
                <strong>18</strong>
                <small>Capitolo del manuale</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "40px",
          marginBottom: "40px"
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "28px"
          }}
        >
          {examples.map((example) => (
            <article className={styles.exampleCard} key={example.id}>
              <span className={styles.exampleNumber}>{example.id}</span>

              <div className={styles.diagramWrapper}>
                <img
                  src={`/images/precedenze/incrocio-${example.id}.png`}
                  alt={example.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div className={styles.exampleContent}>
                <div className={styles.titleRow}>
                  <h2>{example.title}</h2>
                  <span className={styles.exampleTag}>{example.tag}</span>
                </div>

                <p>{example.explanation}</p>

                <div className={styles.tipBox}>💡 {example.tip}</div>
              </div>

              <div className={styles.orderBox}>
                <span className={styles.orderLabel}>Ordine di passaggio</span>

                <div className={styles.orderRow}>
                  {example.order.map((v, i) => (
                    <React.Fragment key={v.letter}>
                      {i > 0 && <span className={styles.arrow}>→</span>}
                      <span className={styles.vehicleCircle} style={{ background: v.color }}>
                        {v.letter}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#2D5E3D",
          color: "#fff",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "16px"
          }}
        >
          Hai capito le precedenze?
        </h2>

        <p
          style={{
            opacity: 0.9,
            marginBottom: "24px"
          }}
        >
          Metti subito alla prova quello che hai imparato con alcuni quiz
          dedicati alle precedenze.
        </p>

        <Link href="/pratica" className="btn-amber">
          Prova i quiz
        </Link>
      </section>
    </main>
  );
}