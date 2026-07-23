// Semplice mappa per parola chiave: assegna un'icona sensata a ogni
// capitolo senza dover elencare tutti e 30 i nomi a mano.
const rules = [
  [/veicol/i, "car"],
  [/pericolo/i, "alert"],
  [/divieto/i, "ban"],
  [/rotond|rotator/i, "gauge"],
  [/velocit/i, "gauge"],
  [/precedenza|incroci/i, "road"],
  [/soccorso|salute|alcool|droga|fisiche/i, "book"],
];

export function iconForCategory(categoria) {
  for (const [pattern, icon] of rules) {
    if (pattern.test(categoria)) return icon;
  }
  return "road";
}
