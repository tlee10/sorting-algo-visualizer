export const calculateNewPosition =  (indices, size, compareMode) => {
  // const vwWidth = size === 40 ? 1 : size === 80 ? 0.5 : size === 120 ? 0.3 : size === 160 ? 0.25 : 2;
  // const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // const pxWidth = Math.floor((vwWidth/100) * windowWidth + 3);
  // const barsOffset = Math.floor((windowWidth - (size*pxWidth)) / 2 );
  const vwWidth = size === 40 ? 1 : size === 80 ? 0.5 : size === 120 ? 0.3 : size === 160 ? 0.25 : 2;
  const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const barWidth = compareMode ? vwWidth/2 : vwWidth
  const pxWidth = Math.floor((barWidth/100) * windowWidth + 3);
  const barsOffset = compareMode ? Math.floor(((windowWidth/2) - (size*pxWidth)) / 2) : Math.floor((windowWidth - (size*pxWidth)) / 2);

  const pos1 = barsOffset + indices[2]*pxWidth;
  const pos2 = barsOffset + indices[3]*pxWidth;

  return [pos1, pos2];

}