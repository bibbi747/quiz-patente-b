# Quiz Patente B — software di pratica

Questo è il sito web che accompagna il manuale "Libro Patente B 2026".
Contiene 1.059 domande vero/falso organizzate nei 30 capitoli del libro,
più una modalità di simulazione d'esame (30 domande, 20 minuti, massimo
3 errori).

Non serve saper programmare per pubblicarlo: segui i passaggi qui sotto
nell'ordine in cui sono scritti.

---

## 1. Cosa c'è dentro questa cartella

```
quiz-patente-b/
├── data/
│   ├── questions.json      ← tutte le domande (generato dal file Excel)
│   └── categories.json     ← elenco dei 30 capitoli, nell'ordine del libro
├── app/                    ← le pagine del sito
├── components/             ← i pezzi riutilizzabili (il quiz, il cruscotto)
├── lib/questions.js        ← le funzioni che leggono e mescolano le domande
└── package.json            ← l'elenco degli "ingredienti" tecnici del sito
```

L'unico file che aggiornerai spesso è **`data/questions.json`**. Ogni volta
che ti preparo nuove domande in Excel, le converto in questo stesso formato
e te lo mando pronto da sostituire.

---

## 2. Provare il sito sul tuo computer (facoltativo, ma consigliato)

1. Installa **Node.js** (una sola volta): vai su [nodejs.org](https://nodejs.org),
   scarica la versione "LTS" e installala come un qualsiasi programma.
2. Apri il **Terminale** (su Mac: cerca "Terminale" con Spotlight; su Windows:
   cerca "Prompt dei comandi" o meglio "PowerShell").
3. Trascina la cartella `quiz-patente-b` nel terminale per incollarne il
   percorso, poi premi Invio per entrarci. In alternativa scrivi:
   ```
   cd percorso/della/cartella/quiz-patente-b
   ```
4. Scrivi questo comando e premi Invio (va fatto una sola volta, scarica i
   pezzi necessari al sito):
   ```
   npm install
   ```
5. Scrivi questo comando per avviare il sito in locale:
   ```
   npm run dev
   ```
6. Apri il browser su **http://localhost:3000** — il sito è lì, identico a
   come sarà online.

Per fermarlo, torna al terminale e premi `Ctrl+C`.

---

## 3. Pubblicare il sito online (gratis, con Vercel)

Vercel è il servizio più semplice per pubblicare siti Next.js come questo,
ed è gratuito per un progetto di queste dimensioni.

### Passo A — Metti il codice su GitHub

1. Crea un account gratuito su [github.com](https://github.com), se non
   ne hai già uno.
2. Crea un nuovo repository (pulsante verde "New"), chiamalo ad esempio
   `quiz-patente-b`, e lascialo **privato** se preferisci.
3. Segui le istruzioni che GitHub mostra per caricare questa cartella nel
   repository appena creato (di solito bastano pochi clic se usi
   "GitHub Desktop", l'app gratuita con interfaccia grafica, invece della
   riga di comando — la trovi su [desktop.github.com](https://desktop.github.com)).

### Passo B — Collega Vercel

1. Vai su [vercel.com](https://vercel.com) e registrati usando lo stesso
   account GitHub (pulsante "Continue with GitHub").
2. Clicca "Add New… → Project".
3. Seleziona il repository `quiz-patente-b` che hai appena creato.
4. Lascia tutte le impostazioni come sono proposte di default (Vercel
   riconosce automaticamente che è un progetto Next.js) e clicca "Deploy".
5. Dopo circa un minuto, Vercel ti darà un indirizzo del tipo
   `https://quiz-patente-b.vercel.app` — il sito è online, pubblico e
   gratuito.

Da questo momento, ogni volta che aggiorni il codice su GitHub (ad esempio
sostituendo `data/questions.json` con nuove domande), Vercel ripubblica
automaticamente il sito nel giro di un minuto, senza bisogno di rifare
questi passaggi.

### Passo C (facoltativo) — Un indirizzo con il tuo dominio

Se possiedi già un dominio (ad esempio quello del libro o del brand),
in Vercel puoi aggiungerlo da "Project → Settings → Domains" e seguire le
istruzioni per puntarlo al sito. In alternativa l'indirizzo gratuito
`.vercel.app` funziona benissimo per il QR code del libro.

---

## 4. Collegare il sito al libro con un QR code

Una volta ottenuto l'indirizzo definitivo (es. `https://quiz-patente-b.vercel.app`),
puoi generare gratuitamente un QR code su siti come
[qr-code-generator.com](https://www.qr-code-generator.com) e inserirlo
nell'Appendice D del libro ("Accesso al software di preparazione online"),
insieme all'indirizzo scritto per chi preferisce digitarlo a mano.

---

## 5. Come funzionano le due modalità

- **Pratica per capitolo** (`/pratica`): il lettore sceglie uno dei 30
  capitoli e risponde a tutte le domande di quell'argomento, senza limiti
  di tempo, con la spiegazione mostrata subito dopo ogni risposta.
- **Simulazione esame** (`/esame`): 30 domande estratte proporzionalmente
  da tutti i capitoli, timer di 20 minuti sempre visibile, e interruzione
  automatica se si superano i 3 errori — le stesse condizioni del vero
  esame di teoria del Ministero.

Il "cruscotto" circolare che vedi in entrambe le modalità (al posto della
solita barra di avanzamento) è lo stesso elemento grafico che useremo come
firma visiva del prodotto, coerente con il tema della guida.

---

## 6. Aggiornare le domande in futuro

Ogni volta che completiamo un nuovo blocco di domande nel foglio Excel, ti
invierò un file `questions.json` già pronto. Per aggiornare il sito:

1. Sostituisci `data/questions.json` con il nuovo file.
2. Se lavori in locale, controlla che tutto funzioni con `npm run dev`.
3. Carica la modifica su GitHub (con GitHub Desktop basta scrivere una
   breve descrizione della modifica e cliccare "Commit" poi "Push").
4. Vercel aggiorna il sito online automaticamente.

Non serve mai toccare gli altri file per aggiungere domande.
