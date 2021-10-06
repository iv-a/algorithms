const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
let graph;
let start;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
    graph = new Graph(parseInt(numberOfVertices));
  } else if (lineNumber < parseInt(numberOfEdges, 10) + 1) {
    const [ vertexFrom, vertexTo ] = line.split(' ');
    graph.addEdge(parseInt(vertexFrom, 10), parseInt(vertexTo, 10));
  } else if (lineNumber === parseInt(numberOfEdges, 10) + 1) {
    start = parseInt(line);
    const result = mainDFS(graph, start);
    console.log(result.join(' '));
  }
  lineNumber++;
});

function mainDFS(graph, start) {
  function DFS(startVertex, result) {
    const stack = [];
    stack.push(startVertex);
    while (stack.length > 0) {
      const v = stack.pop();
      if (color[v - 1] === 'white') {
        color[v - 1] = 'gray';
        result.push(v);
        stack.push(v);
        let arr = graph.adj[v - 1];
        arr.forEach((w) => {
          if (color[w - 1] === 'white') stack.push(w);
        })
      } else if (color[v - 1] === 'gray') {
        color[v - 1] = 'black';
      }
    }
  }
  const result = [];
  graph.sortArr();
  const color = new Array(graph.n).fill('white');
  DFS(start, result);
  // for (let i = 1; i <= numberOfVertices; i++) {
  //   if (color[i] === 'white') DFS(i, result);
  // }
  return result;
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
    this.adj.forEach((arr) => arr.sort((a, b) => b - a));
  }
}