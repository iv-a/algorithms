// class Node {
//   constructor(value = null, next = null) {
//     this.value = value;
//     this.next = next;
//   }
// }

function solution(node) {
  while (node) {
    process.stdout.write(node.value.toString() + '\n');
    node = node.next;
  }
}

// const node1 = new Node(1);
// const node2 = new Node(2, node1);
// const node3 = new Node(3, node2);
//
// solution(node3);