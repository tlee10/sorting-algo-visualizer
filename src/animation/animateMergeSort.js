import {animateComparisons, animateMove, animateNormal, animateSorted, calculateNewPosition} from "./index"


export const animateMergeSort = (bars, algo, compareMode, comparisons, swaps, sorted, divisions, speed, size) => {
  let iteration;
  
  for (let i = 0; i < comparisons.length; i++) {
    iteration = i;
    setTimeout(() => {
      if (divisions[i].length !== 0) {
        paintGroup(divisions[i], bars);
      }

      if (comparisons[i].length !== 0) 
        {
          animateComparisons(
            algo,
            bars[comparisons[i][0]],
            bars[comparisons[i][1]]
          );
          setTimeout(() => {
            paintNormal(bars[comparisons[i][0]], bars[comparisons[i][1]]); 
          }, 7 * speed/10);         
        }

      if (swaps[i].length !== 0) {
          swaps[i].forEach((swap) => {
            const newPositions = calculateNewPosition(swap, size, compareMode);
            setTimeout(() => {
              animateMove(newPositions, bars[swap[0]], null, speed);
            }, 2 * speed/10)
          });
          
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

const paintGroup = (division, bars) => {
  const color1 = "yellow";
  const color2 = "black";
  division[0].forEach(index => {
    bars[index].style.backgroundColor = color1;
  })
  division[1].forEach(index => {
    bars[index].style.backgroundColor = color2;
  })
}

const paintNormal = (bar1, bar2) => {
  const color1 = "yellow";
  const color2 = "black"

  bar1.style.backgroundColor = color1;
  bar2.style.backgroundColor = color2;

}