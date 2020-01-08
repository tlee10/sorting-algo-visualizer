import swap from "./swap";
import _ from "lodash";

const mergeSort = (list) => {
  const newList = _.cloneDeep(list);
  const comparisons = [], swaps = [], sorted = [], divisions = [];
  mergeSort_aux(newList, 0, newList.length - 1, comparisons, swaps, sorted, divisions);
  console.log(divisions)
  return [newList, comparisons, swaps, sorted, divisions];
}

const mergeSort_aux = (list, first, last, comparisons, swaps, sorted, divisions) => {
  if(first < last){
    let mid = Math.floor((first + last)/2);

    mergeSort_aux(list, first, mid,  comparisons, swaps, sorted, divisions);

    mergeSort_aux(list, mid + 1, last, comparisons, swaps, sorted, divisions); 

    merge(list, first, last, comparisons, swaps, sorted, divisions);
  }
}

const merge = (list, first, last, comparisons, swaps, sorted, divisions) => {
  let leftIndex = first;
  let leftLast = Math.floor((first + last)/2);
  let rightIndex = leftLast + 1;
  let rightLast = last;

  //color group
  const group1 = [];
  const group2 = [];
  for(let i = first; i <= last; i++){
    if (i <= leftLast)  group1.push(list[i][1]);
    else  group2.push(list[i][1]);
    
  }
  divisions.push([group1, group2]);
  comparisons.push([]);
  swaps.push([]);
  sorted.push([])

  while (leftIndex <= leftLast && rightIndex <= rightLast){
    comparisons.push([list[leftIndex][1], list[rightIndex][1]]);
    swaps.push([]);
    divisions.push([]);

    if (list[leftIndex][0] <= list[rightIndex][0]) { 
      sorted.push([list[leftIndex][1]]);
      leftIndex += 1;
    }
    else{
      const val = list[rightIndex];
      let index = rightIndex;
       
      while(index !== leftIndex){
        swaps[swaps.length - 1].push([list[index -1][1], list[index][1], index -1, index]);
        list[index] = list[index-1];
        index -= 1;
      }

      swaps[swaps.length - 1].push([val[1], list[leftIndex][1], rightIndex, leftIndex]);
      list[leftIndex] = val;
      sorted.push([list[leftIndex][1]]);
      leftIndex += 1;
      rightIndex += 1;
      leftLast += 1;
    }
    
  }
  //color sorted
  while(leftIndex <= leftLast){
    divisions.push([]);
    comparisons.push([]);
    swaps.push([]);
    sorted.push([list[leftIndex][1]]);
    leftIndex++;
  }
  while (rightIndex <= rightLast) {
    divisions.push([]);
    comparisons.push([]);
    swaps.push([]);
    sorted.push([list[rightIndex][1]]);
    rightIndex++;
  }
}

export {mergeSort};