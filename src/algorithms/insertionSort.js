import swap from "./swap";
import _ from "lodash";

const insertionSort = list => {
  const newList = _.cloneDeep(list);
  const comparisons = [[]];
  const swaps = [[]];
  const sorted = [[newList[0][1]]];
  for (let i = 1; i < newList.length; i++) {
    //let j = i - 1;
    // while(j >= 0 && newList[j][0]> newList[j + 1][0]){
    //   comparisons.push([[newList[j][1]], newList[j + 1][1]]);
    //   swaps.push([[newList[j][1]], newList[j + 1][1], j, j+1]);
    //   sorted.push([]);
    //   swap(newList, j, j+1);
    //   j--;
    // }
    for (let j = i - 1; j >= 0; j--) {
      if (newList[j][0] > newList[j + 1][0]) {
        comparisons.push([[newList[j][1]], newList[j + 1][1]]);
        swaps.push([[newList[j][1]], newList[j + 1][1], j, j + 1]);
        if (j === 0) sorted.push([newList[j + 1][1]]);
        else sorted.push([]);
        swap(newList, j, j + 1);
      } else {
        comparisons.push([[newList[j][1]], newList[j + 1][1]]);
        swaps.push([]);
        sorted.push([newList[j + 1][1]]);
        break;
      }
    }
  }
  return [newList, comparisons, swaps, sorted];
};

export { insertionSort };
