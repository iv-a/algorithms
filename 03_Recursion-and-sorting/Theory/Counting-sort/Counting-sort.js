function countingSort(arr, k) {
  const countedValues = new Array(k).fill(0);
  for (let value of arr) {
    countedValues[value]++;
  }
  let idx = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < countedValues[i]; j++) {
      arr[idx] = i;
      idx++;
    }
  }
}

const arr = [0, 2, 1, 2, 0, 0, 1];
const k = 3;

countingSort(arr, k);
console.log(arr);   // [0, 0, 0, 1, 1, 2, 2]
