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

  return result;
}

function merge_sort(arr, left, right) {
  if (left + 1 >= right) {
    return;
  }
  let mid = (left + right) >> 1;
  merge_sort(arr, left, mid);
  merge_sort(arr, mid, right);
  let mergedArr = merge(arr, left, mid, right);
  for (let i = left, j = 0; i < right; i++, j++) {
    arr[i] = mergedArr[j];
  }
}

// function test() {
//   var a = [1, 4, 9, 2, 10, 11];
//   var b = merge(a, 0, 3, 6);
//   console.log(b);
//   var expected = [1, 2, 4, 9, 10, 11];
//
//   var c = [1, 4, 2, 10, 1, 2];
//   merge_sort(c, 0, 6);
//   console.log(c);
//   expected = [1, 1, 2, 2, 4, 10];
// }
//
// test();