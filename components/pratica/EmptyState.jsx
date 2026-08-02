"use client";

import Icon from "@/components/Icon";
import ImageWithFallback from "@/components/common/ImageWithFallback";

export default function EmptyState({ query }) {
  return (
    <section className="empty-state">
      <ImageWithFallback
        src="/images/empty-search.png"
        alt="Nessun capitolo trovato"
        fallback={
          <div className="empty-state-icon">
            <Icon name="search" size={48} />
          </div>
        }
      />

      <h2>Nessun capitolo trovato</h2>

      <p>
        {query
          ? `Nessun risultato per "${query}". `
          : ""}
        Prova a modificare la ricerca oppure seleziona un filtro diverso.
      </p>
    </section>
  );
}
