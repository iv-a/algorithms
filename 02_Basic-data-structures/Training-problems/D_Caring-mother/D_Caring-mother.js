// class Node {
//   constructor(value = null, next = null) {
//     this.value = value;
//     this.next = next;
//   }
// }

function solution(node, elem) {
  let idx = 0;
  while (node.value !== elem) {
    node = node.next;
    idx++;
    if (!node) {
      return -1;
    }
  }
  return idx;
}

// function test() {
//   var node3 = new Node("node3");
//   var node2 = new Node("node2", node3);
//   var node1 = new Node("node1", node2);
//   var node0 = new Node("node0", node1);
//   var idx = solution(node0, "node2");
//   // result is idx === 2
//   console.log(idx);
// }
