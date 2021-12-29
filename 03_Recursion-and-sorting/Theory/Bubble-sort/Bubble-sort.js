function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}

let arr = [3, 2, 4, 1, 8, 0];
bubbleSort(arr);
console.log(arr);   // [ 0, 1, 2, 3, 4, 8 ]