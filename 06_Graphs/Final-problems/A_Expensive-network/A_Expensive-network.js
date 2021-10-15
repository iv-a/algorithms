/*

-- ПРИНЦИП РАБОТЫ --
Решение основано на алгоритме Прима:
1. Берем любую вершину графа.
2. Рассматриваем все ребра, исходящие из этой вершины, среди которых выбираем ребро с максимальным весом.
3. Добавляем в остов ребро и вершину, в которую оно входило.
4. К омножеству потенциально добавляемых ребер добавляем те, которые исходят из новой вершины и входят в вершины, еще не включенные в остов.
5. Повторяем пункты 2 - 4 до тех пор, пока в остовном дереве не будет n вершин и, соответственно, n-1 рёбер.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Использование бинарной кучи позволяет поддерживать двоичное дерево, которое соответствует следующим условиям:
  - Ключ в любой вершине не меньше (если куча для максимума), чем значения её потомков. Это свойство гарантирует, что в вершине находится самый приоритетный элемент.
  - На i-ом слое 2^i вершин, кроме последнего. Для последнего слоя это условие может не выполняться. Слои нумеруются с нуля. Это свойство соответствует почти полноте.
  - Все слои, кроме последнего, уже заполнены полностью, в них вообще нет дыр. Последний слой заполняется элементами слева направо. Поэтому все элементы лежат в массиве плотно от начала до конца.
Поэтому ребро, извлекаемое из кучи всегда является ребром максимального веса.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Суммарная временная сложность алгоритма Прима на очереди с приоритетами - O(|E|⋅log|V|),
где |E| — количество рёбер в графе,
    |V| — количество вершин.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
1. Спики смежности - O(|V| + |E|);
2. Множество вершин, уже добавленных в остов - O(∣V1∣);
3. Множество вершин, ещё не добавленных в остов - O(∣V2∣);
4. Ребра, исходящие из остовного дерева - O(|E|);
!. причем, O(∣V1∣) + O(∣V2∣) = O(|V|);

Общая пространственная сложность: O(|V| + |E|) + O(|V|) + O(|E|) = O(|V| + |E|),
где |E| — количество рёбер в графе,
    |V| — количество вершин.

*/


// Класс для хранения графа в виде списка смежности:
// Все вершины хранятся в ассоциативном массиве, в котором ключами являются вершины, а значениями ассоциативные массивы с ключами в виде смешных вершин и значениями в виде веса ребра: вершина_1 => { вершина_2 => вес, вершина_3 => вес }.
// -------------------------------------------
// Пример: Map(4) {
//           1 => Map(2) { 2 => 5, 3 => 6 },
//           2 => Map(2) { 1 => 5, 4 => 8 },
//           3 => Map(2) { 1 => 6, 4 => 3 },
//           4 => Map(2) { 2 => 8, 3 => 3 }
//         }
// -------------------------------------------
class Graph {
  constructor(numberOfVertices) {
    this.n = numberOfVertices;
    this.adj = new Map();
  }

  // Метод добавления ребра в граф
  addEdge(vertexA, vertexB, weight) {
    // Получаем список вершин, смежных с вершиной А
    // Если такого списка нет, создаем новых
    let neighborsA = this.adj.get(vertexA);
    if (!neighborsA) neighborsA = new Map();
    // Аналогично для вершины В
    let neighborsB = this.adj.get(vertexB);
    if (!neighborsB) neighborsB = new Map();
    // При наличии кратных ребер, храним только то, которое имеет больший вес
    let weightAB = neighborsA.get(vertexB);
    if (weightAB && weightAB > weight) {
      weight = weightAB;
    }
    // Добавляем вес ребра в списки смежных вершин
    neighborsA.set(vertexB, weight);
    neighborsB.set(vertexA, weight);
    // Добавляем вершины в список смежности
    this.adj.set(vertexA, neighborsA);
    this.adj.set(vertexB, neighborsB);
  }
}

// Для хранения ребер, исходящих из остовного дерева используем реализацию Кучи из прошлого спринта. Это позволяет быстро и эффективно извлекать ребра с максимальным приоритетом.
class Heap {
  constructor(compareFn) {
    this.heap = [];
    this.compareFn = compareFn;
  }

  _swap(firstIdx, secondIdx) {
    const temp = this.heap[firstIdx];
    this.heap[firstIdx] = this.heap[secondIdx];
    this.heap[secondIdx] = temp;
  }

  _siftUp(idx) {
    let parentIdx = (idx - 1) >> 1;
    while (parentIdx >= 0 && this.compareFn(this.heap[idx], this.heap[parentIdx])) {
      this._swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = (idx - 1) >> 1;
    }
    return idx;
  }

  _siftDown(idx) {
    const heapSize = this.heap.length;
    while (2 * idx + 1 < heapSize) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let highestPriority = left;
      if (right < heapSize && this.compareFn(this.heap[right], this.heap[left])) highestPriority = right;
      if (this.compareFn(this.heap[idx], this.heap[highestPriority])) break;
      this._swap(idx, highestPriority);
      idx = highestPriority;
    }
    return idx;
  }

  heapAdd(item) {
    this.heap.push(item);
    this._siftUp(this.heap.length - 1);
  }

  heapGetMaxPriority() {
    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._siftDown(0);
    return result;
  }
}

// Функция, определяющая, какое ребро, из двух поступивших на вход, имеет больший приоритет (является ли первое из двух поступивших на вход ребер приоритетнее второго).
function compareFn(itemA, itemB) {
  if (itemA && !itemB) {
    return true;
  } else if (!itemA && itemB) {
    return false
  } else {
    const weightA = itemA[2];
    const weightB = itemB[2];
    return weightA - weightB > 0;
  }
}

// Функция вычисления веса максимального остовного дерева
function getMSTWeight(graph, compareFn) {
  // Функция добавления вершины в остов
  function addVertex(vertex) {
    // Добавляем вершину в множество вершин, уже добавленных в остов
    added.add(vertex);
    // Удаляем вершину из множества вершин, еще не добавленных в остов
    notAdded.delete(vertex);
    // Получаем список вершин, смежных с добавляемой
    const neighbors = graph.adj.get(vertex);
    // Если есть вершины, смежные с добавляемой, проходимся по каждой и проверяем их наличие в множестве вершин, еще не добавленных в остов
    if (neighbors) {
      for (let neighbor of neighbors.keys()) {
        // Если смежная вершина еще не добавлена в остов добавляем соответствующее ребро в кучу ребер, исходящих из остовного дерева
        if (notAdded.has(neighbor)) {
          const weight = neighbors.get(neighbor);
          edges.heapAdd([vertex, neighbor, weight]);
        }
      }
    }
  }
  // Суммарный вес получившегося остова
  let totalWeight = 0;
  // Куча с поддержанием максмума, содержащая ребра, исходящие из остовного дерева
  const edges = new Heap(compareFn);
  // Множество вершин, уже добавленных в остов
  const added = new Set();
  // Множество вершин, еще не добавленных в остов
  const notAdded = new Set();

  for (let i = 1; i <= graph.n; i++) {
    // Проходимся по каждой вершине графа и проверяем ее наличие в списке смежности
    // Если вершина отсутствует в списке смежности а количество вершин в графе больше одной, то граф несвязный
    if (!graph.adj.has(i) && graph.n > 1) return CONSTANTS.ERR;
    // Иначе добавляем вершину в множество вершин, еще не добавленных в остов
    notAdded.add(i);
  }
  // Добавляем в остов первую попавшуюся вершину
  addVertex(1);
  // Пока есть вершины еще не добавленные в остов и в куче еще есть ребра, исходящие из остова
  while (notAdded.size > 0 && edges.heap.length > 0) {
    // Извлекаем из кучи ребро максимального веса
    const edge = edges.heapGetMaxPriority();
    const [ , endVertex, weight ] = edge;
    if (notAdded.has(endVertex)) {
      // Прибавляем к суммарному весу остова вес этого ребра
      totalWeight += weight;
      // Добавляем в остов вершину, в которую ведет полученное ребро
      addVertex(endVertex);
    }
  }
  // Если остались вершины еще не добавленные в остов, значит граф несвязный, иначе возвращаем суммарный вес остовного дерева
  if (notAdded.size > 0) {
    return CONSTANTS.ERR;
  } else {
    return totalWeight;
  }
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

const CONSTANTS = {
  ERR: 'Oops! I did it again',
};

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
let graph;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
    graph = new Graph(parseInt(numberOfVertices, 10));
  } else if (lineNumber <= parseInt(numberOfEdges, 10)) {
    const [ vertexA, vertexB, cost ] = line.split(' ');
    graph.addEdge(parseInt(vertexA, 10), parseInt(vertexB, 10), parseInt(cost, 10));
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(getMSTWeight(graph, compareFn));
});