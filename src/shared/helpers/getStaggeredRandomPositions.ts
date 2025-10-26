export const getStaggeredRandomPositions = (
  count: number,
  maxX: number,
  maxY: number
) => {
  const positions: { top: number; left: number }[] = [];
  const cols = 3;
  const spacingX = maxX / cols;
  const spacingY = maxY / (cols + 2);

  const totalWidth = (cols - 1) * spacingX;
  const offsetX = (maxX - totalWidth) / 4;
  const rows = Math.ceil(count / cols);
  const totalHeight = (rows - 1) * spacingY;
  const offsetY = (maxY - totalHeight) / 2;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const left =
      offsetX +
      col * spacingX +
      (row % 2 === 1 ? spacingX / 2 : 0) +
      (Math.random() - 0.5) * 30;

    const top = offsetY + row * spacingY + (Math.random() - 0.5) * 30;
    positions.push({ top, left });
  }

  return positions;
};
