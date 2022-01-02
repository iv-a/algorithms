function quickSort(array) {
  if (array.length) {
    quickSortImpl(array, 0, array.length - 1);
  }
}

function quickSortImpl(array, left, right) {
  if (left < right) {
    const p = partition(array, left, right);
    quickSortImpl(array, left, p);
    quickSortImpl(array, p + 1, right);
  }
}

function partition(array, left, right) {
  const p = (left + right) >> 1;
  const pivot = array[p];

  let l = left, r = right;

  while (l <= r) {
    while (array[l] < pivot) {
      l++;
    }

    while (pivot < array[r]) {
      r--;
    }

    if (l >= r) {
      break;
    }

    [array[l], array[r]] = [array[r], array[l]];

    l++;
    r--;
  }
  return r;
}

let arr = [14, 7, 9, 14, 14, 3, 1, 2, 14];
quickSort(arr);
console.log(arr);   // [ 1, 2, 3, 7, 9, 14, 14, 14, 14 ]