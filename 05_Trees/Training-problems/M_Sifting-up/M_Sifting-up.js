function swap(arr, firstIdx, secondIdx) {
  const temp = arr[firstIdx];
  arr[firstIdx] = arr[secondIdx];
  arr[secondIdx] = temp;
}

function siftUp(heap, idx) {
  let parentIdx = idx >> 1;
  while (heap[idx] > heap[parentIdx] && parentIdx > 0) {
    swap(heap, idx, parentIdx);
    idx = parentIdx;
    parentIdx = idx >> 1;
  }
  return idx;
}

// function test() {
//   var sample = [-1, 12, 6, 8, 3, 15, 7, 11];
//   // console.log(siftUp(sample, 7));
//   console.assert(siftUp(sample, 5) == 1);
// }
//
// test();