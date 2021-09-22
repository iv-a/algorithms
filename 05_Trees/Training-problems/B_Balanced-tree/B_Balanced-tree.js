//
// class CNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }


function solution(root) {
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  function counter(root, i, arr) {
    i++;
    if (root.left !== null) counter(root.left, i, arr);
    if (root.right !== null) counter(root.right, i, arr);
    if (root.right === null || root.left === null) arr.push(i);
  }

  const arr = [];
  counter(root, 0, arr);

  const min = getMinOfArray(arr);
  const max = getMaxOfArray(arr);

  return max - min <= 1;
}

// function test() {
//   var node1 = new CNode(1);
//   var node2 = new CNode(-5);
//   var node3 = new CNode(3);
//   node3.left = node1;
//   node3.right = node2;
//   var node4 = new CNode(10);
//   var node5 = new CNode(2);
//   // var node6 = new CNode(7);
//   // node2.right = node6;
//   node5.left = node3;
//   node5.right = node4;
//   // solution(node5);
//   console.assert(solution(node5));
// }
//
// test();