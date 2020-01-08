import swap from './swap';
import _ from "lodash";

const quickSort = (list) => {
  const newList = _.cloneDeep(list);
  const swaps = [], sorted = [], small = [], large = [], normal = [], pivots = []; 
  quickSort_aux(newList, 0, list.length -1, swaps, sorted, small, large, normal, pivots);
  return [newList, swaps, sorted, small, large, normal, pivots];
}

const quickSort_aux = (list, first, last, swaps, sorted, small, large, normal, pivots) => {
  if (last - first >= 1){
    const pivotPos = partition(list, first, last, swaps, sorted, small, large, normal, pivots);
    quickSort_aux(list, first, pivotPos - 1, swaps, sorted, small, large, normal, pivots);
    quickSort_aux(list, pivotPos + 1, last, swaps, sorted, small, large, normal, pivots);
  }
  else if (last - first  === 0) {
    swaps.push([]);
    sorted.push([list[first][1]]);
    small.push([]);
    large.push([]);
    normal.push([]);
    pivots.push([]);
  }
}

const partition = (list, first, last, swaps, sorted, small, large, normal, pivots) => {
  const pivot = list[first][0];
  let lbad = first + 1;
  let rbad = last;

  swaps.push([]);
  sorted.push([]);
  small.push([]);
  large.push([]);
  normal.push([]);
  pivots.push([list[first][1]]);


  while (lbad <= rbad) {
    while (lbad <= rbad && list[lbad][0] < pivot) {
      swaps.push([]);
      sorted.push([]);
      small.push([list[lbad][1]]);
      large.push([]);
      normal.push([]);
      pivots.push([]);
      lbad += 1;
    }
    while (lbad <= rbad && list[rbad][0] >= pivot) {
      swaps.push([]);
      sorted.push([]);
      small.push([]);
      large.push([list[rbad][1]]);
      normal.push([]);
      pivots.push([]);
      rbad -= 1;
    }

    if (lbad <= rbad) {
      swaps.push([list[lbad][1], list[rbad][1], lbad, rbad]);
      sorted.push([]);
      small.push([list[rbad][1]]);
      large.push([list[lbad][1]]);
      normal.push([]);
      pivots.push([]);
      swap(list, lbad, rbad);
      lbad += 1;
      rbad -= 1;
    };
  }

  swaps.push([list[first][1], list[rbad][1], first, rbad]);
  sorted.push([list[first][1]]);
  small.push([]);
  large.push([]);
  pivots.push([]);
  swap(list, first, rbad);
  const tmp = [];
  for(let i = first; i <= last; i++){
    if (i !== rbad) tmp.push(list[i][1]);
  }
  normal.push(tmp);
  return rbad;
}

export {quickSort};