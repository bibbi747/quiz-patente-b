const CHAPTER_MAP = [
  { chapter: 1, categoria: "Definizioni stradali" },
  { chapter: 2, categoria: "Classificazione veicoli" },
  { chapter: 3, categoria: "Doveri del conducente e utenti deboli" },
  { chapter: 4, categoria: "Segnali di pericolo" },
  { chapter: 5, categoria: "Segnali di divieto" },
  { chapter: 6, categoria: "Segnali di obbligo" },
  { chapter: 7, categoria: "Segnali di precedenza" },
  { chapter: 8, categoria: "Segnaletica orizzontale" },
  { chapter: 9, categoria: "Segnalazioni semaforiche e agenti" },
  { chapter: 10, categoria: "Segnali di indicazione" },
  { chapter: 11, categoria: "Segnali complementari, temporanei e di cantiere" },
  { chapter: 12, categoria: "Pannelli integrativi" },
  { chapter: 13, categoria: "Norme sulla circolazione dei veicoli" },
  { chapter: 14, categoria: "Limiti di velocità e intralcio alla circolazione" },
  { chapter: 15, categoria: "Distanza di sicurezza" },
  { chapter: 16, categoria: "Fermata, sosta, arresto e partenza" },
  { chapter: 17, categoria: "Norme sul sorpasso" },
  { chapter: 18, categoria: "Precedenza agli incroci ed esempi pratici" },
  { chapter: 19, categoria: "Norme varie: autostrade, traino, trasporto e carico" },
  {
    chapter: 20,
    title: "Circolazione nelle rotatorie",
    categorie: [
      "La logica della rotonda: perché funziona",
      "Rotonda semplice: schema e regole",
      "Rotonda a doppia carreggiata",
      "Gli errori più comuni e come evitarli",
    ],
  },
  { chapter: 21, categoria: "Uso delle luci, dispositivi acustici, spie e simboli" },
  { chapter: 22, categoria: "Dispositivi di equipaggiamento" },
  { chapter: 23, categoria: "Incidenti stradali e comportamento" },
  { chapter: 24, categoria: "Guida e condizioni fisiche e psichiche, alcool, droga" },
  { chapter: 25, categoria: "Primo soccorso" },
  { chapter: 26, categoria: "Limitazione dei consumi e rispetto dell'ambiente" },
  { chapter: 27, categoria: "Elementi costitutivi del veicolo e manutenzione" },
  { chapter: 28, categoria: "Patente, documenti e obblighi verso gli agenti" },
  { chapter: 29, categoria: "Patente a punti e sistema sanzionatorio" },
  { chapter: 30, categoria: "Responsabilità civile, penale e assicurazione RCA" },
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

export const PARTS = [
  { title: "La strada, il veicolo e il conducente", range: [1, 3] },
  { title: "La segnaletica", range: [4, 12] },
  { title: "Le norme di circolazione", range: [13, 19] },
  { title: "Le rotatorie", range: [20, 20] },
  { title: "Il conducente, il veicolo e la sicurezza", range: [21, 27] },
  { title: "Patente, documenti e responsabilità", range: [28, 30] },
];

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
        return { chapter: c.chapter, title: c.title, categorie: c.categorie, count };
      }
      return { chapter: c.chapter, title: c.categoria, categorie: [c.categoria], count: countFor(c.categoria) };
    });
    return { ...part, chapters };
  });
}
