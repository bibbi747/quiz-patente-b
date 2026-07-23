import questionsData from "@/data/questions.json";
import categoriesData from "@/data/categories.json";

export function getAllQuestions() {
  return questionsData;
}

export function getCategories() {
  return categoriesData;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryBySlug(slug) {
  return categoriesData.find((c) => slugify(c) === slug) || null;
}

export function getQuestionsByCategory(categoria) {
  return questionsData.filter((q) => q.categoria === categoria);
}

export function getQuestionsByCategories(categorie) {
  const set = new Set(categorie);
  return questionsData.filter((q) => set.has(q.categoria));
}

// Fisher-Yates shuffle, does not mutate the original array
export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Builds a 30-question exam draw spread proportionally across all chapters,
// mirroring how the real MIT exam draws from multiple argomenti.
export function buildExam(totalQuestions = 30) {
  const categories = getCategories();
  const byCategory = categories.map((c) => shuffle(getQuestionsByCategory(c)));

  const picked = [];
  let round = 0;
  while (picked.length < totalQuestions) {
    let addedThisRound = false;
    for (const pool of byCategory) {
      if (picked.length >= totalQuestions) break;
      if (pool[round]) {
        picked.push(pool[round]);
        addedThisRound = true;
      }
    }
    round++;
    if (!addedThisRound) break;
  }

  return shuffle(picked).slice(0, totalQuestions);
}
