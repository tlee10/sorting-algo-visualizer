import swap from './swap';
import _ from "lodash";

const bubbleSort = (list) => {
  const newList = _.cloneDeep(list);
  const comparisons = [];
  const swaps = [];
  let sorted = [];
  for (let i = 0; i < newList.length; i++){
    for (let j = 0; j < newList.length - i -1; j++){
      comparisons.push([newList[j][1], newList[j+1][1]]);
      swaps.push([]);
      sorted.push([]);
      if (newList[j][0] > newList[j+1][0]) {
        swaps[swaps.length -1] = [newList[j][1], newList[j+1][1], j, j+1];
        swap(newList, j, j+1);
      }
    }
    sorted[sorted.length -1] = [newList[newList.length - i -1][1]];
  }
  comparisons.push([]);
  swaps.push([]);
  sorted.push([newList[1][1]]);
  return [newList, comparisons, swaps, sorted];
}

export {bubbleSort}