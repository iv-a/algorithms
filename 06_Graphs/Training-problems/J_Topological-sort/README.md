<h1 align="center">J. Топологическая сортировка</h1>

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
0.7 секунд
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

Дан ациклический ориентированный граф (так называемый DAG, directed acyclic graph). Найдите его топологическую сортировку, то есть выведите его вершины в таком порядке, что все рёбра графа идут слева направо. У графа может быть несколько подходящих перестановок вершин. Вам надо найти любую топологическую сортировку.

<h2 id="input">Формат ввода</h2>

В первой строке даны два числа – количество вершин n (1 ≤ n ≤ 105) и количество рёбер m (0 ≤ m ≤ 105). В каждой из следующих m строк описаны рёбра по одному на строке. Каждое ребро представлено парой вершин (from, to), 1≤ from, to ≤ n, соответственно номерами вершин начала и конца.

<h2 id="output">Формат вывода</h2>

Выведите номера вершин в требуемом порядке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5 3
3 2
3 4
2 5
</pre>

<h6>Вывод</h6>
<pre>
1 3 2 4 5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6 3
6 4
4 1
5 1
</pre>

<h6>Вывод</h6>
<pre>
2 3 5 6 4 1
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
4 0
</pre>

<h6>Вывод</h6>
<pre>
1 2 3 4
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
  }

  sortArr() {
    this.adj.forEach((arr) => arr.sort((a, b) => b - a));
  }
}

io_interface.on('close', function () {
  const result = mainTopSort(graph).reverse();
  console.log(result.join(' '));
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
<td>360ms</td>
<td>49.71Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>