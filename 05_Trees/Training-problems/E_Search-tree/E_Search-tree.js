// class CNode {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function solution(root) {
  function isBST(curNode, min, max){
    if (curNode == null) {
      return true;
    }
    return (
      (min == null || min < curNode.value) &&
      (max == null || max > curNode.value) &&
      isBST(curNode.left, min, curNode.value) &&
      isBST(curNode.right, curNode.value, max)
    );
  }
  return isBST(root, null, null);
}

// function test() {
//   var node1 = new CNode(1, null, null);
//   var node2 = new CNode(4, null, null);
//   var node3 = new CNode(3, node1, node2);
//   var node4 = new CNode(8, null, null);
//   var node5 = new CNode(5, node3, node4);
//   console.assert(solution(node5));
//   node4.value = 5;
//   console.assert(!solution(node5));
// }
//
// test();

// function test1() {
//   var node1 = new CNode(1);
//   var node2 = new CNode(4);
//   var node3 = new CNode(3);
//   var node4 = new CNode(8);
//   var node5 = new CNode(5);
//
//   node5.left = node3;
//   node5.right = node4;
//   node3.left = node1;
//   node3.right = node2;
//   // console.assert(solution(node5));
//   console.log(solution(node5));
//   node2.value = 5;
//   console.log(solution(node5));
//   // console.assert(!solution(node5));
// }
//
// test1();

// function test2() {
//   var node3 = new CNode(0);
//   var node4 = new CNode(3);
//   var node5 = new CNode(2);
//
//   node5.left = node3;
//   node5.right = node4;
//   // console.assert(solution(node5));
//   console.log(solution(node5));
//   // console.assert(!solution(node5));
// }
//
// test2();

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

// test1();