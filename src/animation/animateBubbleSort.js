import {animateComparisons, animateMove, animateNormal, animateSorted, calculateNewPosition} from "./index"


export const animateBubbleSort = (bars, algo, compareMode, comparisons, swaps, sorted, speed, size) => {
  let iteration;
  console.log(sorted);

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
          }, 8 * speed/10);         
        }

      if (swaps[i].length !== 0) {
          const newPositions = calculateNewPosition(swaps[i], size, compareMode);
          setTimeout(() => {
            animateMove(newPositions, bars[swaps[i][0]], bars[swaps[i][1]], speed/1.5);
          }, 2 * speed/10)
      }

      if (sorted[i].length !== 0) {
        setTimeout(() => {
          animateSorted(bars[sorted[i][0]]);
        }, 9 * speed/10);

      }
    }, speed * i);
  }

  return iteration + 1;
}