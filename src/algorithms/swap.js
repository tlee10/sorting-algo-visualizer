const swap = (list, index1, index2) => {
  let tmp = list[index1];
  list[index1] = list[index2];
  list[index2] = tmp;
}

export default swap;