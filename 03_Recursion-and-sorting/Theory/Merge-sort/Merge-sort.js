function merge(arr, left, mid, right) {
  let l = 0, r = 0;
  const result = new Array(right - left);

  while (left + l < mid && mid + r < right) {
    if (arr[left + l] < arr[mid + r]) {
      result[l + r] = arr[left + l];
      l++;
    } else {
      result[l + r] = arr[mid + r];
      r++;
    }
  }

  while (left + l < mid) {
    result[l + r] = arr[left + l];
    l++;
  }

  while (mid + r < right) {
    result[l + r] = arr[mid + r];
    r++;
  }

  for (let i = 0; i < l + r; i++) {
    arr[left + i] = result[i];
  }
}

function mergeSort(arr, left, right) {
  if (left + 1 >= right) {
    return;
  }
  let mid = (left + right) >> 1;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid, right);
  merge(arr, left, mid, right);
}

let arr = [3, 2, 4, 1, 8, 0];
mergeSort(arr, 0, 6);
console.log(arr);   // [ 0, 1, 2, 3, 4, 8 ]