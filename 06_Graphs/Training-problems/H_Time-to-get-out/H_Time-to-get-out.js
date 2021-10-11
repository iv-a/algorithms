const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
let graph;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
    graph = new Graph(parseInt(numberOfVertices));
  } else if (lineNumber < parseInt(numberOfEdges, 10) + 1) {
    const [ vertexFrom, vertexTo ] = line.split(' ');
    graph.addEdge(parseInt(vertexFrom, 10), parseInt(vertexTo, 10));
  }
  lineNumber++;
});

function mainDFS(graph, start = 1) {
  function DFS(startVertex) {
    const stack = [];
    stack.push(startVertex);
    while (stack.length > 0) {
      const v = stack.pop();
      if (color[v - 1] === 'white') {
        timer[v - 1][0] = time;
        color[v - 1] = 'gray';
        time += 1;
        stack.push(v);
        let arr = graph.adj[v - 1];
        arr.forEach((w) => {
          if (color[w - 1] === 'white') stack.push(w);
        })
      } else if (color[v - 1] === 'gray') {
        timer[v - 1][1] = time;
        color[v - 1] = 'black';
        time += 1;
      }
    }
  }
  // const result = [];
  graph.sortArr();
  const color = new Array(graph.n).fill('white');
  let time = 0;
  const timer = [...Array(graph.n)].map(() => Array(2).fill(null));
  // const entry = new Array(graph.n).fill(null);
  // const leave = new Array(graph.n).fill(null);
  DFS(start);
  // for (let i = 1; i <= numberOfVertices; i++) {
  //   if (color[i] === 'white') DFS(i, result);
  // }
  return timer;
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
    // this.adj[w-1].push(v);
  }

  sortArr() {
    this.adj.forEach((arr) => arr.sort((a, b) => b - a));
  }
}

io_interface.on('close', function () {
  const result = mainDFS(graph);
  result.forEach((arr) => {
    process.stdout.write(arr.join(' ') + '\n');
    // console.log(arr.join(' '));
  })
});