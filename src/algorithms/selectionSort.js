import swap from './swap';
import _ from "lodash";

const selectionSort = (list) => {
  const newList = _.cloneDeep(list);
  const comparisons = [], swaps = [], sorted = [];

  for (let i = 0; i < newList.length - 1; i++){
    let min = i;
    for (let j = i+1; j < newList.length; j++){
      comparisons.push([newList[min][1], newList[j][1]]);
      swaps.push([]);
      sorted.push([]);
      if (newList[j][0] < newList[min][0]) min = j;
    }
    if(min !== i){
      swaps[swaps.length - 1] = [newList[min][1], newList[i][1], min, i];
      swap(newList, min, i);
    }
    
    sorted[sorted.length -1] = [newList[i][1]];
  }
  comparisons.push([]);
  swaps.push([]);
  sorted.push([newList[newList.length -1][1]]);
  return [newList, comparisons, swaps, sorted];
}

export {selectionSort}