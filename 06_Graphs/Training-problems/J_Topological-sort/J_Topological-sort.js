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

// function mainTopSort(graph) {
//   function topSort(startVertex) {
//     const stack = [];
//     stack.push(startVertex);
//     while (stack.length > 0) {
//       const v = stack.pop();
//       if (color[v - 1] === 'white') {
//         color[v - 1] = 'gray';
//         stack.push(v);
//         let arr = graph.adj[v - 1];
//         arr.forEach((w) => {
//           if (color[w - 1] === 'white') stack.push(w);
//         })
//       } else if (color[v - 1] === 'gray') {
//         color[v - 1] = 'black';
//         order.push(v);
//       }
//     }
//   }
//
//   const order = [];
//   // graph.sortArr();
//   const color = new Array(graph.n).fill('white');
//   topSort(graph.n);
//   for (let i = 1; i <= numberOfVertices; i++) {
//     if (color[i - 1] === 'white') topSort(i);
//   }
//   return order;
// }

function mainTopSort(graph) {
  const order = [];
  const color = new Array(graph.n).fill('white');

  function topSort(v) {
    color[v - 1] = 'gray';
    let arr = graph.adj[v - 1];
    arr.forEach((w) => {
      if (color[w - 1] === 'white') topSort(w);
    });
    color[v - 1] = 'black';
    order.push(v);
  }

  for (let i = 1; i <= numberOfVertices; i++) {
    if (color[i - 1] === 'white') topSort(i);
  }
  return order;
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
  // console.log(graph);
  const result = mainTopSort(graph).reverse();
  console.log(result.join(' '));

});