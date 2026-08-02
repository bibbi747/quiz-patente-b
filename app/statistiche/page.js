import "@/components/statistiche/statistiche.css";
import { getAllQuestions } from "@/lib/questions";
import { buildPartsWithCounts } from "@/lib/parts";

import StatisticheClient from "@/components/statistiche/StatisticheClient";

export const metadata = {
  title: "Le mie statistiche — Quiz Patente B",
};

export default function StatistichePage() {
  const all = getAllQuestions();
  const parts = buildPartsWithCounts(all);

  return (
    <main className="container">
      <div className="stat-page-header">
        <h1>Le mie statistiche</h1>
        <p>Come sta andando la tua preparazione.</p>
      </div>

      <StatisticheClient parts={parts} />
    </main>
  );
}
