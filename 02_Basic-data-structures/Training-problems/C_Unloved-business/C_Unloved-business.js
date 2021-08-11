// class Node {
//   constructor(value = null, next = null) {
//     this.value = value;
//     this.next = next;
//   }
// }

function getNodeByIndex(node, idx) {
  while (idx) {
    node = node.next;
    idx--;
  }
  return node;
}

function solution(node, idx) {
  if (idx > 0) {
    const previousNode = getNodeByIndex(node, idx - 1);
    const nodeToDelete = previousNode.next;
    previousNode.next = nodeToDelete.next;
  } else {
    node = node.next;
  }
  return node;
}

// function test() {
//   var node3 = new Node("node3");
//   var node2 = new Node("node2", node3);
//   var node1 = new Node("node1", node2);
//   var node0 = new Node("node0", node1);
//   var newHead = solution(node0, 3);
//   // result is node0 -> node2 -> node3
//   print(newHead);
// }
//
// function print(node) {
//   while (node) {
//     process.stdout.write(node.value.toString() + '\n');
//     node = node.next;
//   }
// }