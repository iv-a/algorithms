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

function mainDFS(graph) {
  function DFS(startVertex, componentCount, ans) {
    const stack = [];
    stack.push(startVertex);
    while (stack.length > 0) {
      const v = stack.pop();
      if (color[v - 1] === -1) {
        color[v - 1] = -2;
        stack.push(v);
        let arr = graph.adj[v - 1];
        arr.forEach((w) => {
          if (color[w - 1] === -1) stack.push(w);
        })
      } else if (color[v - 1] === -2) {
        color[v - 1] = componentCount;
        ans.push(v);
      }
    }
  }
  const result = [];
  graph.sortArr();
  const color = new Array(graph.n).fill(-1);
  let componentCount = 0;
  for (let i = 1; i <= color.length; i++) {
    const ans = [];
    if (color[i - 1] === -1) {
      componentCount += 1;
      DFS(i, componentCount, ans);
      result.push(ans);
    }
  }
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

io_interface.on('close', function () {
  const result = mainDFS(graph);
  console.log(result.length);
  result.forEach((arr) => {
    arr.sort((a, b) => a - b);
    process.stdout.write(arr.join(' ') + '\n');
  })
});