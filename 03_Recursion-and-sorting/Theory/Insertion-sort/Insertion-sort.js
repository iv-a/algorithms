function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    const itemToInsert = array[i];
    let j = i;
    while (j > 0 && itemToInsert < array[j - 1]) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = itemToInsert;
  }
}

let arr = [3, 2, 4, 1, 8, 0];
insertionSort(arr);
console.log(arr);   // [ 0, 1, 2, 3, 4, 8 ]