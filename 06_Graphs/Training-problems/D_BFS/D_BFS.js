const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
let graph;
let start;

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.queueSize = 0;
  }

  push(value) {
    const newNode = new Node(value);
    this.queueSize += 1;

    if(!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  pop() {
    if (!this.head) {
      return 'error';
    }

    const deletedHead = this.head;
    this.queueSize -= 1;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead.value;
  }

  size() {
    return this.queueSize;
  }
}

class Graph {
  constructor(numberOfVertices) {
    this.n = numberOfVertices;
    this.adj = [];
    for (let i = 0; i < numberOfVertices; i++) {
      this.adj[i] = [];
    }
  }

  addEdge(v, w) {
    this.adj[v-1].push(w);
    this.adj[w-1].push(v);
  }

  sortArr() {
    this.adj.forEach((arr) => arr.sort((a, b) => a - b));
  }
}

function BFS(graph, s) {
  graph.sortArr();
  const color = new Array(graph.n).fill('white');
  const previous = new Array(graph.n).fill(null);
  const distance = new Array(graph.n).fill(null);
  const result = [];
  const planned = new Queue();
  planned.push(s);
  color[s - 1] = 'gray';
  distance[s - 1] = 0;
  while (planned.size() > 0) {
    let u = planned.pop();
    let arr = graph.adj[u - 1];
    arr.forEach((v) => {
      if (color[v - 1] === 'white') {
        distance[v - 1] = distance[u - 1] + 1;
        previous[v - 1] = u;
        color[v - 1] = 'gray';
        planned.push(v);
      }
    });
    color[u - 1] = 'black';
    result.push(u);
  }
  return result;
}

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
    graph = new Graph(parseInt(numberOfVertices));
  } else if (lineNumber < parseInt(numberOfEdges, 10) + 1) {
    const [ vertexFrom, vertexTo ] = line.split(' ');
    graph.addEdge(parseInt(vertexFrom, 10), parseInt(vertexTo, 10));
  } else if (lineNumber === parseInt(numberOfEdges, 10) + 1) {
    start = parseInt(line);
    const result = BFS(graph, start);
    console.log(result.join(' '));
  }
  lineNumber++;
});