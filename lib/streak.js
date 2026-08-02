// Calcola la serie di giorni consecutivi di pratica a partire dall'elenco
// di date (formato "YYYY-MM-DD") salvate in statistics.activeDays.
// La serie è valida solo se include oggi o ieri (altrimenti è "rotta").
export function computeStreak(activeDays = []) {
  if (!activeDays.length) return 0;

  const days = new Set(activeDays);

  const today = new Date();
  const cursor = new Date(today);

  const todayKey = cursor.toISOString().slice(0, 10);

  if (!days.has(todayKey)) {
    // Se oggi non ha ancora pratica, la serie conta comunque se
    // ieri era attivo (l'utente potrebbe ancora esercitarsi oggi).
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0;
  }

  let streak = 0;

  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
