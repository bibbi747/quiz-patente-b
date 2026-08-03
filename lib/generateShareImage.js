import { toPng } from "html-to-image";

/**
 * Trasforma il nodo DOM passato (il ref della ShareCard) in un file PNG.
 * Non salva né carica nulla: resta tutto in memoria nel browser.
 */
export async function generateShareImage(node) {
  const dataUrl = await toPng(node, {
    pixelRatio: 2, // qualità più alta, utile per Instagram/Stories
    cacheBust: true,
  });

  const res = await fetch(dataUrl);
  const blob = await res.blob();

  return { dataUrl, blob };
}
