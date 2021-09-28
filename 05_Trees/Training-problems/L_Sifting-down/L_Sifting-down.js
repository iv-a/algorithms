function swap(arr, firstIdx, secondIdx) {
  const temp = arr[firstIdx];
  arr[firstIdx] = arr[secondIdx];
  arr[secondIdx] = temp;
}

// function siftDown(heap, idx) {
//   while (2 * idx + 1 < heap.length - 1) {
//     let left = 2 * idx;
//     let right = 2 * idx + 1;
//     if (heap[left] > heap[right]) {
//       if (heap[idx] < heap[left]) {
//         swap(heap, idx, left);
//         idx = left;
//       } else {
//         return idx;
//       }
//     } else {
//       if (heap[idx] < heap[right]) {
//         swap(heap, idx, right);
//         idx = right;
//       } else {
//         return idx;
//       }
//     }
//   }
//   return idx;
// }

function siftDown(heap, idx) {
  const heapSize = heap.length;
  while (2 * idx < heapSize) {
    let left = 2 * idx;
    let right = 2 * idx + 1;
    let largest = left;
    if (right < heapSize && heap[right] > heap[left]) {
      largest = right;
    }
    if (heap[idx] >= heap[largest]) break;
    swap(heap, idx, largest);
    idx = largest;
  }
  return idx;
}

// function test() {
//   var sample = [-1, 12, 1, 8, 3, 4, 74];
//   console.log(siftDown(sample, 3))
//   // console.assert(siftDown(sample, 2) == 5);
// }
//
// test();