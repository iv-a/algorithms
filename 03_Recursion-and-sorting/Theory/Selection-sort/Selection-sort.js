function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    [array[i], array[min]] = [array[min], array[i]];
  }
}

let arr = [3, 2, 4, 1, 8, 0];
selectionSort(arr);
console.log(arr);   // [ 0, 1, 2, 3, 4, 8 ]