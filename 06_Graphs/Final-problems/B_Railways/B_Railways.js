/*

-- ПРИНЦИП РАБОТЫ --
Принцип решения основан на том, что при рассмотрении одного типа дорог в качестве ребер графа, направленных по возрастанию значения вершин графа, а другого типа дорог в качестве ребер по убыванию значений вершин графа, то исходную задачу можно свести к поиску цикла в ориентированном графе. А Задача поиска цикла уже решается с помощью алгоритма поиска в глубину. Для этого произведём серию обходов. То есть из каждой вершины, в которую мы ещё ни разу не приходили, запустим поиск в глубину, который при входе в вершину будет красить её в серый цвет, а при выходе из нее — в чёрный. И, если алгоритм пытается пойти в серую вершину, то это означает, что цикл найден.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Рассмотрим примеры (Приложенная картинка).
____________________________________
Пример 1. Карта не оптимальная:
Входные данные:
3
RB
R
--------------------------
Рассмотрим рисунок 1:
Данная карта является не оптимальной, т.к. из вершины 1 можно попасть в вершину 3 по обоим типам дорог: 1-3 (B) и 1-2-3 (R).
Если изменить направление дороги B, то получится цикл (Рисунок 2)
____________________________________
Пример 2. Карта оптимальная:
Входные данные:
3
RB
B
--------------------------
Рассмотрим рисунок 3:
Данная карта является оптимальной, т.к. не существует пары городов A и B такой, что от A до B можно добраться как по дорогам типа R, так и по дорогам типа B.
Если изменить направление дороги B, то цикла не будет (Рисунок 4)

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
detectCycle обрабатывает все вершины ∣V∣, hasCycle проходится по всем спискам смежности (по каждому ребру) ∣E∣.
Итоговая временная сложность алгоритма: O(∣V∣+∣E∣),
где |E| — количество рёбер в графе,
    |V| — количество вершин.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
1. Спики смежности - O(|V| + |E|);
2. Ассоциативный массив цветов для каждой вершины O(|V|);

Общая пространственная сложность: O(|V| + |E|) + O(|V|) = O(|V| + |E|),
где |E| — количество рёбер в графе,
    |V| — количество вершин.

*/


// Класс для хранения графа в виде списка смежности:
// Все вершины хранятся в ассоциативном массиве, в котором ключами являются вершины, а значениями массивы смежных к ним вершин : вершина_1 => { [вершина_2, вершина_3 ]}.
// -------------------------------------------
// Пример: Map(4) { 1 => [], 2 => [ 1, 3 ], 3 => [ 1 ], 4 => [ 1, 2, 3 ] }
// -------------------------------------------
class Graph {
  constructor(numberOfVertices) {
    this.n = numberOfVertices;
    this.adj = new Map();
    for (let i = 1; i <= this.n; i++) {
      this.adj.set(i, []);
    }
  }
  // Метод добавления ребра в граф
  addEdge(vertexA, vertexB) {
    // Получаем массив вершин, смежных с вершиной А
    const neighbors = this.adj.get(vertexA);
    // Добавляем смежную к А вершину В в массив
    neighbors.push(vertexB);
    // Добавляем вершину А в список смежности
    this.adj.set(vertexA, neighbors);
  }
}

// Реализация функции поиска в глубину для обнаружения циклов
function detectCycle(graph) {
  // Реализация поиска в глубину (DFS) из заданной вершины  на стеке
  function hasCycle(startVertex) {
    // По умолчанию считаем, что цикл в графе отсутствует
    let isCycle = false;
    // Заводим стек и добавляем в него заданную вершину
    const stack = [];
    stack.push(startVertex);
    // Пока стек не пуст:
    while (stack.length > 0) {
      // Извлекаем из стека вершину
      const vertex = stack.pop();
      if (colors.get(vertex) === CONSTANTS.COLOR.WHITE) {
        // Если вершина белая, красим её в серый
        colors.set(vertex, CONSTANTS.COLOR.GRAY);
        // Кладем ее обратно в стек
        stack.push(vertex);
        // Получаем список смежных вершин
        const adj = graph.adj.get(vertex);
        // Проходимся по каждой смежной вершине
        adj.forEach((neighbor) => {
          // Если она белая, то кладем ее в стек
          if (colors.get(neighbor) === CONSTANTS.COLOR.WHITE) stack.push(neighbor);
          // Если она серая, то цикл обнаружен
          if (colors.get(neighbor) === CONSTANTS.COLOR.GRAY) isCycle = true;
        });
      } else if (colors.get(vertex) === CONSTANTS.COLOR.GRAY) {
        // Если вершина серая, красим ее в черный
        colors.set(vertex, CONSTANTS.COLOR.BLACK);
      }
    }
    return isCycle;
  }
  // Ассоциативный массив цветов, в котором ключом является номер вершины, а значением - ее цвет
  const colors = new Map();
  // Изначально красим все вершины графа в белый
  for (let vertex = 1; vertex <= graph.n; vertex++) {
    colors.set(vertex, CONSTANTS.COLOR.WHITE);
  }
  for (let vertex = 1; vertex <= graph.n; vertex++) {
    // Для каждой вершины графа, если она белая, запускаем поиск в глубину
    // if (colors.get(vertex) === CONSTANTS.COLOR.WHITE) {
    if (hasCycle(vertex)) return true;
    // }
  }
  return false;
}

// Функция получения карты железных дорог
function getMapOfRailways(graph, city, railways) {
  railways.forEach((railway, index) => {
    if (railway === CONSTANTS.RAILWAYS.R) {
      // Если дорога R, то направление ребра от вершины с меньшим номером к вершине с большим номером
      graph.addEdge(city, city + index + 1);
    } else if (railway === CONSTANTS.RAILWAYS.B) {
      // Если дорога B, то направление ребра от вершины с большим номером к вершине с меньшим номером
      graph.addEdge(city + index + 1, city);
    }
  })
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

const CONSTANTS = {
  RAILWAYS: {
    R: 'R',
    B: 'B',
  },
  COLOR: {
    WHITE: 0,
    GRAY: 1,
    BLACK: 2,
  },
  ANS: {
    NO: 'NO',
    YES: 'YES',
  },
};

let lineNumber = 0;
let numberOfCities;
let graph, city;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfCities = parseInt(line, 10);
    graph = new Graph(numberOfCities);
    city = 1;
  } else if (lineNumber < numberOfCities) {
    let railways = line.split('');
    getMapOfRailways(graph, city, railways);
    city++;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(detectCycle(graph) ? CONSTANTS.ANS.NO : CONSTANTS.ANS.YES);
});
