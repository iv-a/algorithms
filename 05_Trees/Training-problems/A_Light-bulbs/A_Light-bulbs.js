// class CNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

function solution(root) {
  let left, right;
  if (root.left === null && root.right === null) {
    return root.value;
  }
  if (root.left) {
    left = solution(root.left);
  }
  if (root.right) {
    right = solution(root.right);
  }
  if (!isNaN(left) && !isNaN(right)) {
    return Math.max(left, right, root.value);
  } else if (isNaN(left)) {
    return Math.max(right, root.value);
  } else if (isNaN(right)) {
    return Math.max(left, root.value);
  }
}

//
// function test() {
//   var node1 = new CNode(1);
//   var node2 = new CNode(-5);
//   var node3 = new CNode(3);
//   node3.left = node1;
//   node3.right = node2;
//   var node4 = new CNode(2);
//   node4.left = node3;
//   console.log(solution(node4));
//   // console.assert(solution(node4) === 3);
// }

// function test() {
//   const n1 = new CNode(17);
//   const n2 = new CNode(3);
//   const n3 = new CNode(8);
//   const n4 = new CNode(14);
//   const n5 = new CNode(15);
//   const n6 = new CNode(10);
//   const n7 = new CNode(3);
//   const n8 = new CNode(5);
//   const n9 = new CNode(2);
//   const n10 = new CNode(6);
//   const n11 = new CNode(0);
//   const n12 = new CNode(1);
//
//   n1.left = n2;
//   n1.right = n8;
//   n2.left = n3;
//   n2.right = n6;
//   n3.left = n4;
//   n3.right = n5;
//   n6.right = n7;
//   n8.left = n9;
//   n8.right = n10;
//   n10.left = n11;
//   n10.right = n12;
//
//   console.log(solution(n1));
// }
//
// test();