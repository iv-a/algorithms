<h1 align="center">H. Время выходить</h1>

<h5 align="center">
<a href="#limits">Ограничения</a>
•
<a href="#task">Условие задачи</a>
•
<a href="#input">Формат ввода</a>
•
<a href="#output">Формат вывода</a>
•
<a href="#examples">Примеры</a>
•
<a href="#solution">Решение</a>
</h5>

<br>

<table id="limits">
<tbody>
<tr>
<td>
<b>Ограничение времени</b>
</td>
<td>
4 секунды
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
128Mb
</td>
</tr>
<tr>
<td>
<b>Ввод</b>
</td>
<td>
стандартный ввод или input.txt
</td>
</tr>
<tr>
<td>
<b>Вывод</b>
</td>
<td>
стандартный вывод или output.txt
</td>
</tr>
</tbody>
</table>

<h2 id="task">Условие задачи</h2>

Вам дан ориентированный граф. Известно, что все его вершины достижимы из вершины s=1. Найдите время входа и выхода при обходе в глубину, производя первый запуск из вершины s. Считайте, что время входа в стартовую вершину равно 0. Соседей каждой вершины обходите в порядке увеличения номеров.

<h2 id="input">Формат ввода</h2>

В первой строке дано число вершин n (1 ≤ n ≤ 2⋅ 105) и рёбер (0 ≤ m ≤ 2 ⋅ 105). В каждой из следующих m строк записаны рёбра графа в виде пар (from, to), 1 ≤ from ≤ n — начало ребра, 1 ≤ to ≤ n — его конец. Гарантируется, что в графе нет петель и кратных рёбер.

<h2 id="output">Формат вывода</h2>

Выведите n строк, в каждой из которых записана пара чисел tini, touti — время входа и выхода для вершины i.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6 8
2 6
1 6
3 1
2 5
4 3
3 2
1 2
1 4
</pre>

<h6>Вывод</h6>
<pre>
0 11
1 6
8 9
7 10
2 3
4 5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 2
1 2
2 3
</pre>

<h6>Вывод</h6>
<pre>
0 5
1 4
2 3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
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

  graph.sortArr();
  const color = new Array(graph.n).fill('white');
  let time = 0;
  const timer = [...Array(graph.n)].map(() => Array(2).fill(null));
  DFS(start);
  
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
  }

  sortArr() {
    this.adj.forEach((arr) => arr.sort((a, b) => b - a));
  }
}

io_interface.on('close', function () {
  const result = mainDFS(graph);
  result.forEach((arr) => {
    process.stdout.write(arr.join(' ') + '\n');
  })
});
```
<table>
  <thead>
    <tr>
      <th>Вердикт</th>
      <th>Компилятор</th>
      <th>Время</th>
      <th>Память</th>
    </tr>
  </thead>
  <tbody>
<tr align="center">
<td>OK</td>
<td>Node.js 14.15.5</td>
<td>3.059s</td>
<td>122.70Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>