<h1 align="center">G. Максимальное расстояние</h1>

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

Под расстоянием между двумя вершинами в графе будем понимать длину кратчайшего пути между ними в рёбрах. Для данной вершины s определите максимальное расстояние от неё до другой вершины неориентированного графа.

<h2 id="input">Формат ввода</h2>

В первой строке дано количество вершин n (1 ≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 105). Далее в m строках описаны рёбра графа. Каждое ребро описывается номерами двух вершин u и v (1 ≤ u, v ≤ n). В последней строке дан номер вершины s (1 ≤ s ≤ n). Гарантируется, что граф связный и что в нём нет петель и кратных рёбер.

<h2 id="output">Формат вывода</h2>

Выведите длину наибольшего пути от s до одной из вершин графа.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5 4
2 1
4 5
4 3
3 2
2
</pre>

<h6>Вывод</h6>
<pre>
3
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 3
3 1
1 2
2 3
1
</pre>

<h6>Вывод</h6>
<pre>
1
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6 8
6 1
1 3
5 1
3 5
3 4
6 5
5 2
6 2
4
</pre>

<h6>Вывод</h6>
<pre>
3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
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
  const distance = new Array(graph.n).fill(null);
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
        // previous[v - 1] = u;
        color[v - 1] = 'gray';
        planned.push(v);
      }
    });
    color[u - 1] = 'black';
  }
  return Math.max.apply(null, distance);
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
    console.log(result);
  }
  lineNumber++;
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
<td>0.504s</td>
<td>63.05Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>