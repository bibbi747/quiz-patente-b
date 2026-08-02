"use client";

const filters = [
  { id: "all", label: "Tutti", emoji: "📚" },
  { id: "new", label: "Da iniziare", emoji: "🟢" },
  { id: "progress", label: "In corso", emoji: "🟡" },
  { id: "done", label: "Completati", emoji: "✅" },
];

export default function FilterBar({ selected, onChange, sortBy, onSortChange }) {
  return (
    <section className="filter-bar">
      <div className="filter-group">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={selected === filter.id ? "filter-chip active" : "filter-chip"}
            onClick={() => onChange(filter.id)}
          >
            <span>{filter.emoji}</span>
            {filter.label}
          </button>
        ))}
      </div>

      <div className="filter-sort">
        <label htmlFor="filter-sort-select">Ordina per</label>
        <select
          id="filter-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="capitolo">Capitolo</option>
          <option value="nome">Nome</option>
          <option value="progresso">Progresso</option>
        </select>
      </div>
    </section>
  );
}
