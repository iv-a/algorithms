<h1 align="center">E. Компоненты связности</h1>

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
1 секунда
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

Вам дан неориентированный граф. Найдите его компоненты связности.

<h2 id="input">Формат ввода</h2>

В первой строке дано количество вершин n (1≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 2 ⋅ 105). В каждой из следующих m строк записано по ребру в виде пары вершин 1 ≤ u, v ≤ n.

Гарантируется, что в графе нет петель и кратных рёбер.

<h2 id="output">Формат вывода</h2>

Выведите все компоненты связности в следующем формате: в первой строке выведите общее количество компонент.

Затем на отдельных строках выведите вершины каждой компоненты, отсортированные по возрастанию номеров. Компоненты между собой упорядочивайте по номеру первой вершины.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6 3
1 2
6 5
2 3
</pre>

<h6>Вывод</h6>
<pre>
3
1 2 3 
4 
5 6
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
2 0
</pre>

<h6>Вывод</h6>
<pre>
2
1 
2
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
4 3
2 3
2 1
4 3
</pre>

<h6>Вывод</h6>
<pre>
1
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
<td>0.673s</td>
<td>63.89Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>