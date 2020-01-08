import {animateComparisons, animateMove, animateNormal, animateSorted, calculateNewPosition} from "./index"


export const animateSelectionSort = (bars, algo, compareMode, comparisons, swaps, sorted, speed, size) => {
  let iteration;
  for (let i = 0; i < comparisons.length; i++) {
    iteration = i;
    setTimeout(() => {
      if (comparisons[i].length !== 0) 
        {
          animateComparisons(
            algo,
            bars[comparisons[i][0]],
            bars[comparisons[i][1]]
          );
          setTimeout(() => {
            animateNormal(bars[comparisons[i][0]], bars[comparisons[i][1]]); 
          }, 7 * speed/10);         
        }

      if (swaps[i].length !== 0) {
          const newPositions = calculateNewPosition(swaps[i], size, compareMode);
          setTimeout(() => {
            animateMove(newPositions, bars[swaps[i][0]], bars[swaps[i][1]], speed);
          }, 2 * speed/10)
      }

      if (sorted[i].length !== 0) {
        setTimeout(() => {
          animateSorted(bars[sorted[i][0]]);
        }, 8 * speed/10);

      }
    }, speed * i);
  }

  return iteration + 1;
}