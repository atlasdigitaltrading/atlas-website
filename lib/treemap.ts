// Squarified treemap (Bruls, Huizing, van Wijk 2000): lays out rectangles
// whose area is proportional to `value`, while keeping aspect ratios close
// to square. Plain tier-based grid spans can't represent the ~10,000x range
// between e.g. BTC and a long-tail altcoin's market cap — area can.

export type TreemapItem = { id: string; value: number };
export type TreemapRect = { id: string; x: number; y: number; w: number; h: number };

function rowWorstRatio(row: number[], side: number): number {
  const sum = row.reduce((a, b) => a + b, 0);
  const thickness = sum / side;
  let worst = 0;
  for (const v of row) {
    const length = v / thickness;
    const ratio = Math.max(thickness / length, length / thickness);
    if (ratio > worst) worst = ratio;
  }
  return worst;
}

// `items` must be sorted descending by value, with sum(values) === w * h.
export function squarify(
  items: TreemapItem[],
  x: number,
  y: number,
  w: number,
  h: number
): TreemapRect[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ id: items[0].id, x, y, w, h }];

  const side = Math.min(w, h);
  let row = [items[0]];
  let rowValues = [items[0].value];
  let bestWorst = rowWorstRatio(rowValues, side);
  let i = 1;
  while (i < items.length) {
    const candidateValues = [...rowValues, items[i].value];
    const candidateWorst = rowWorstRatio(candidateValues, side);
    if (candidateWorst <= bestWorst) {
      row = [...row, items[i]];
      rowValues = candidateValues;
      bestWorst = candidateWorst;
      i++;
    } else {
      break;
    }
  }

  const rowSum = rowValues.reduce((a, b) => a + b, 0);
  const thickness = rowSum / side;
  const rects: TreemapRect[] = [];
  let offset = 0;
  const isWide = w >= h;
  for (const item of row) {
    const length = item.value / thickness;
    if (isWide) {
      rects.push({ id: item.id, x, y: y + offset, w: thickness, h: length });
    } else {
      rects.push({ id: item.id, x: x + offset, y, w: length, h: thickness });
    }
    offset += length;
  }

  const rest = items.slice(row.length);
  const restRects = isWide
    ? squarify(rest, x + thickness, y, w - thickness, h)
    : squarify(rest, x, y + thickness, w, h - thickness);

  return rects.concat(restRects);
}
