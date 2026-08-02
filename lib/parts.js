const CHAPTER_MAP = [
  { chapter: 1, categoria: "Definizioni stradali", description: "Le parole chiave del Codice della Strada." },
  { chapter: 2, categoria: "Classificazione veicoli", description: "Ciclomotori, motocicli, autoveicoli e rimorchi." },
  { chapter: 3, categoria: "Doveri del conducente e utenti deboli", description: "Comportamento corretto e rispetto per pedoni e ciclisti." },
  { chapter: 4, categoria: "Segnali di pericolo", description: "I triangoli che avvisano di un rischio imminente." },
  { chapter: 5, categoria: "Segnali di divieto", description: "I cerchi rossi che vietano una manovra." },
  { chapter: 6, categoria: "Segnali di obbligo", description: "I cerchi blu che impongono un comportamento." },
  { chapter: 7, categoria: "Segnali di precedenza", description: "Stop, dare precedenza e strada principale." },
  { chapter: 8, categoria: "Segnaletica orizzontale", description: "Strisce, frecce e zebrature sull'asfalto." },
  { chapter: 9, categoria: "Segnalazioni semaforiche e agenti", description: "Semafori e gesti dell'agente del traffico." },
  { chapter: 10, categoria: "Segnali di indicazione", description: "Cartelli informativi su strade e servizi." },
  { chapter: 11, categoria: "Segnali complementari, temporanei e di cantiere", description: "Delineatori, birilli e cantieri stradali." },
  { chapter: 12, categoria: "Pannelli integrativi", description: "I pannelli che completano il significato di un segnale." },
  { chapter: 13, categoria: "Norme sulla circolazione dei veicoli", description: "Tenersi a destra, corsie e sensi di marcia." },
  { chapter: 14, categoria: "Limiti di velocità e intralcio alla circolazione", description: "I limiti per ogni tipo di strada e condizione." },
  { chapter: 15, categoria: "Distanza di sicurezza", description: "Quanto spazio lasciare dal veicolo che precede." },
  { chapter: 16, categoria: "Fermata, sosta, arresto e partenza", description: "Dove è permesso fermarsi e come ripartire." },
  { chapter: 17, categoria: "Norme sul sorpasso", description: "Quando e come superare in sicurezza." },
  { chapter: 18, categoria: "Precedenza agli incroci ed esempi pratici", description: "Casi pratici di precedenza negli incroci." },
  { chapter: 19, categoria: "Norme varie: autostrade, traino, trasporto e carico", description: "Autostrade, traino di veicoli e carico corretto." },
  {
    chapter: 20,
    title: "Circolazione nelle rotatorie",
    description: "Il metodo per affrontare ogni tipo di rotonda.",
    categorie: [
      "La logica della rotonda: perché funziona",
      "Rotonda semplice: schema e regole",
      "Rotonda a doppia carreggiata",
      "Gli errori più comuni e come evitarli",
    ],
  },
  { chapter: 21, categoria: "Uso delle luci, dispositivi acustici, spie e simboli", description: "Quando accendere luci, frecce e clacson." },
  { chapter: 22, categoria: "Dispositivi di equipaggiamento", description: "Cinture, casco, seggiolini e specchietti." },
  { chapter: 23, categoria: "Incidenti stradali e comportamento", description: "Cosa fare subito dopo un incidente." },
  { chapter: 24, categoria: "Guida e condizioni fisiche e psichiche, alcool, droga", description: "Stanchezza, alcol e sostanze alla guida." },
  { chapter: 25, categoria: "Primo soccorso", description: "I gesti giusti in attesa dei soccorsi." },
  { chapter: 26, categoria: "Limitazione dei consumi e rispetto dell'ambiente", description: "Guida ecologica e rispetto dell'ambiente." },
  { chapter: 27, categoria: "Elementi costitutivi del veicolo e manutenzione", description: "Motore, freni, pneumatici e manutenzione." },
  { chapter: 28, categoria: "Patente, documenti e obblighi verso gli agenti", description: "Documenti da avere sempre con sé in auto." },
  { chapter: 29, categoria: "Patente a punti e sistema sanzionatorio", description: "Come funzionano punti e sanzioni." },
  { chapter: 30, categoria: "Responsabilità civile, penale e assicurazione RCA", description: "Assicurazione obbligatoria e responsabilità legale." },
];

export function getChapterByNumber(n) {
  const raw = CHAPTER_MAP.find((c) => c.chapter === Number(n));
  if (!raw) return null;
  if (raw.categorie) return raw;
  return { chapter: raw.chapter, title: raw.categoria, categorie: [raw.categoria] };
}

export function allChapterNumbers() {
  return CHAPTER_MAP.map((c) => c.chapter);
}

// Deve rimanere identica alla slugify() usata in generate_pdfs.py,
// altrimenti il nome del link non corrisponde al nome del file vero.
function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function pdfFilename(chapter, title) {
  const padded = String(chapter).padStart(2, "0");
  return `capitolo-${padded}-${slugify(title)}.pdf`;
}

export const PARTS = [
  { title: "La strada, il veicolo e il conducente", range: [1, 3], color: "#2F6690" },
  { title: "La segnaletica", range: [4, 12], color: "#C98A1E" },
  { title: "Le norme di circolazione", range: [13, 19], color: "#7C5CBF" },
  { title: "Le rotatorie", range: [20, 20], color: "#C9504F" },
  { title: "Il conducente, il veicolo e la sicurezza", range: [21, 27], color: "#2F8F80" },
  { title: "Patente, documenti e responsabilità", range: [28, 30], color: "#46586B" },
];

// Colore fisso per capitolo, legato all'argomento (la Parte del libro a
// cui appartiene) e non al progresso — così la griglia ha varietà visiva
// anche quando non è stato ancora completato nulla. Il progresso reale
// (0%, in corso, completato) resta indicato dal testo e dalla barra.
export function partColorForChapter(chapterNumber) {
  const part = PARTS.find(
    (p) => chapterNumber >= p.range[0] && chapterNumber <= p.range[1]
  );
  return part?.color || "#2F6690";
}

// Numero progressivo della Parte (1-6) a cui appartiene un capitolo,
// usato per trovare l'immagine dell'icona: /images/parti/parte-01.png ecc.
export function partNumberForChapter(chapterNumber) {
  const index = PARTS.findIndex(
    (p) => chapterNumber >= p.range[0] && chapterNumber <= p.range[1]
  );
  return index === -1 ? 1 : index + 1;
}

// Costruisce, per ogni Parte, l'elenco dei capitoli con il conteggio
// reale di domande (sommando le eventuali categorie del database
// accorpate in un solo capitolo, come le rotonde).
export function buildPartsWithCounts(allQuestions) {
  const countFor = (categoria) =>
    allQuestions.filter((q) => q.categoria === categoria).length;

  return PARTS.map((part) => {
    const chapters = CHAPTER_MAP.filter(
      (c) => c.chapter >= part.range[0] && c.chapter <= part.range[1]
    ).map((c) => {
      if (c.categorie) {
        const count = c.categorie.reduce((sum, cat) => sum + countFor(cat), 0);
        return { chapter: c.chapter, title: c.title, description: c.description, categorie: c.categorie, count };
      }
      return { chapter: c.chapter, title: c.categoria, description: c.description, categorie: [c.categoria], count: countFor(c.categoria) };
    });
    return { ...part, chapters };
  });
}
