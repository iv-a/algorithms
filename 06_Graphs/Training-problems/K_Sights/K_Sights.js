// function relax(u, v) {
//   if
// }

class Graph {
  constructor(numberOfVertices) {
    this.n = numberOfVertices;
    this.adj = new Map();
  }

  addEdge(v, w, cost) {
    const neighbor = new Map();
    neighbor.set(w, cost);
    this.adj.set(v, neighbor);
  }

  // sortArr() {
  //   this.adj.forEach((arr) => arr.sort((a, b) => a - b));
  // }
}

function getMinDistNotVisitedVertex(costs, visited) {
  let lowestCost = Infinity;
  let lowestCostNode = null;
  for (let node of costs.keys()) {
    let cost = costs.get(node);
    if (cost < lowestCost && visited[node] === false) {
      lowestCost = cost;
      lowestCostNode = node;
    }
  }
  return lowestCostNode;
}

function Dijkstra(graph, s) {
  const costs = new Map();
  const parents = new Map();
  for (let vertex of graph.keys()) {
    costs.set(vertex, Infinity);
    parents.set(vertex, null)
  }
  const visited = new Array(graph.n + 1).fill(false);
  let node = getMinDistNotVisitedVertex(costs);
  while (node !== null) {
    let cost = costs.get(node);
    let neighbors = graph.adj.get(node);
    for (let neighbor of neighbors.keys()) {
      let newCost = cost + neighbors.get(neighbor);
      if (costs.get(neighbor) > newCost) {
        costs.set(neighbor, newCost);
        parents.set(neighbor, node);
      }
    }
    node = getMinDistNotVisitedVertex(costs, visited);
  }
  // const dist = new Array(graph.n).fill(Infinity);
  // const parent = new Array(graph.n).fill(null);
  // const visited = new Array(graph.n).fill(false);

  // dist[s] = 0;
  //
  // while(true) {
  //   let u = getMinDistNotVisitedVertex();
  //   if (u === null) break;
  //   visited[u] = true;
  //   let
  // }

}