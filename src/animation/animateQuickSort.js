import {animateComparisons, animateMove, animateNormal, animateSorted, calculateNewPosition} from "./index"


export const animateQuickSort = (bars, algo, compareMode, swaps, sorted, small, large, normal, pivots, speed, size) => {
  let iteration;
  for (let i = 0; i < swaps.length; i++) {
    iteration = i;
    setTimeout(() => {
      setTimeout(() => {
        if (pivots[i].length !== 0) {
          bars[pivots[i][0]].style.backgroundColor = "yellow";
        }

        if (small[i].length !== 0) {
          paintSmall(bars[small[i][0]]);
        }
  
        if (large[i].length !== 0) {
          paintLarge(bars[large[i][0]]);
        }
      }, speed/10)

      if (swaps[i].length !== 0) {
          const newPositions = calculateNewPosition(swaps[i], size, compareMode);
          setTimeout(() => {
            animateMove(newPositions, bars[swaps[i][0]], bars[swaps[i][1]], speed); 
          }, 2 * speed/10);
      }

      if (normal[i].length !== 0) {
        setTimeout(() => {
          normal[i].forEach(index => {
            animateNormal(bars[index], null);
          })
        }, 8 * speed/10);
        
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

const paintSmall = (bar) => {
  const color = "blue";
  bar.style.backgroundColor = color;
}

const paintLarge = (bar) => {
  const color = "red";
  bar.style.backgroundColor = color;
}