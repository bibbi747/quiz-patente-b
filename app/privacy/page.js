export const metadata = {
  title: "Informativa sulla Privacy — Quiz Patente B",
};

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          color: "var(--pb-navy)",
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: "var(--pb-ink)" }}>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  const updated = new Date().toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="container" style={{ padding: "40px 20px 80px", maxWidth: 720 }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          color: "var(--pb-navy)",
          marginBottom: 6,
        }}
      >
        Informativa sulla Privacy
      </h1>

      <p style={{ color: "var(--pb-ink-soft)", fontSize: 13.5, marginBottom: 36 }}>
        Ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679
        (&quot;GDPR&quot;) · Ultimo aggiornamento: {updated}
      </p>

      <Section title="1. Titolare del trattamento">
        <p>
          Il titolare del trattamento dei dati raccolti tramite questo
          sito è{" "}
          <strong>Barbara Natali</strong>,
          contattabile all&apos;indirizzo email{" "}
          <a href="mailto:bibbi.natali@gmail.com" style={{ color: "var(--pb-blue)" }}>
            bibbi.natali@gmail.com
      
          </a>
          . Per qualsiasi richiesta relativa ai dati personali, questo è
          il riferimento a cui scrivere.
        </p>
      </Section>

      <Section title="2. Natura del servizio">
        <p>
          Quiz Patente B è uno strumento gratuito, indipendente e non
          ufficiale, pensato per accompagnare lo studio del manuale
          &quot;Patente B&quot;. Le domande presenti sul sito sono{" "}
          <strong>originali</strong>, elaborate sulla base degli argomenti
          ufficiali del programma ministeriale (MIT) per l&apos;esame di
          teoria patente B, e <strong>non</strong> sono estratte dalla
          banca dati ufficiale del Ministero delle Infrastrutture e dei
          Trasporti. Il sito non è affiliato, sponsorizzato né approvato
          dal Ministero.
        </p>
      </Section>

      <Section title="3. Dati raccolti e navigazione senza account">
        <p>
          Puoi consultare ed esercitarti con tutti i quiz del sito senza
          creare un account e senza fornire alcun dato personale. La
          creazione di un account (tramite email e password, oppure
          tramite accesso con Google) è facoltativa e serve
          esclusivamente a salvare i tuoi progressi di studio,
          rendendoli disponibili anche da dispositivi diversi.
        </p>
        <p>Se scegli di registrarti, raccogliamo:</p>
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li>Indirizzo email (o nome account, se accedi con Google)</li>
          <li>
            Dati di utilizzo del servizio: risposte fornite ai quiz,
            capitolo di riferimento, data dell&apos;ultima attività
          </li>
          <li>
            Statistiche derivate da questi dati (percentuale di
            completamento, precisione, giorni consecutivi di pratica)
          </li>
        </ul>
        <p>
          Non raccogliamo dati relativi a pagamenti, indirizzi fisici,
          numeri di telefono, né alcuna categoria particolare di dati ai
          sensi dell&apos;art. 9 GDPR.
        </p>
      </Section>

      <Section title="4. Finalità e base giuridica del trattamento">
        <p>
          I dati raccolti sono trattati esclusivamente per consentire il
          funzionamento della funzione di salvataggio dei progressi,
          richiesta volontariamente dall&apos;utente al momento della
          registrazione. La base giuridica del trattamento è pertanto
          l&apos;<strong>esecuzione di un servizio richiesto
          dall&apos;interessato</strong> (art. 6.1.b GDPR). I dati non
          vengono utilizzati per finalità di marketing, profilazione o
          pubblicità, e non vengono ceduti a terzi per finalità
          commerciali.
        </p>
      </Section>

      <Section title="5. Dove sono conservati i dati">
        <p>
          I dati sono conservati ed elaborati tramite{" "}
          <strong>Google Firebase</strong> (autenticazione e database) e
          il sito è ospitato su <strong>Vercel</strong>, entrambi
          fornitori di servizi cloud che agiscono in qualità di
          responsabili esterni del trattamento e possono comportare un
          trasferimento di dati verso server situati negli Stati Uniti,
          nell&apos;ambito delle garanzie previste dalle clausole
          contrattuali standard approvate dalla Commissione Europea.
        </p>
      </Section>

      <Section title="6. Periodo di conservazione">
        <p>
          I dati vengono conservati per tutta la durata dell&apos;account
          e finché l&apos;utente non ne richiede la cancellazione. In
          assenza di richieste, i dati restano collegati all&apos;account
          fino a eventuale cancellazione volontaria da parte
          dell&apos;utente o su richiesta scritta al titolare.
        </p>
      </Section>

      <Section title="7. I tuoi diritti">
        <p>
          In qualità di interessato, hai diritto in qualsiasi momento di
          richiedere: accesso ai tuoi dati (art. 15), rettifica di dati
          inesatti (art. 16), cancellazione (art. 17, &quot;diritto
          all&apos;oblio&quot;), limitazione del trattamento (art. 18),
          portabilità dei dati (art. 20) e opposizione al trattamento
          (art. 21). Per esercitare uno di questi diritti è sufficiente
          scrivere all&apos;indirizzo email indicato al punto 1. Hai
          inoltre diritto di proporre reclamo al Garante per la
          Protezione dei Dati Personali (www.garanteprivacy.it) qualora
          ritenga che il trattamento violi la normativa vigente.
        </p>
      </Section>

      <Section title="8. Cookie e tecnologie simili">
        <p>
          Il sito utilizza esclusivamente cookie tecnici, necessari al
          funzionamento dell&apos;autenticazione e del salvataggio della
          sessione di accesso. Non vengono utilizzati cookie di
          profilazione o di tracciamento pubblicitario di terze parti.
        </p>
      </Section>

      <Section title="9. Modifiche a questa informativa">
        <p>
          Questa informativa può essere aggiornata nel tempo, ad esempio
          in seguito a modifiche del servizio o della normativa
          applicabile. La data di ultimo aggiornamento è indicata in
          cima alla pagina.
        </p>
      </Section>

      <Section title="10. Contatti">
        <p>
          Per qualsiasi domanda relativa a questa informativa o al
          trattamento dei tuoi dati personali, scrivi a{" "}
          <a href="mailto:bibbi.natali@gmail.com" style={{ color: "var(--pb-blue)" }}>
            bibbi.natali@gmail.com
          </a>
          .
        </p>
      </Section>
    </main>
  );
}
