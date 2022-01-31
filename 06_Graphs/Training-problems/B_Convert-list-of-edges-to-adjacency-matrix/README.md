<h1 align="center">B. Перевести список ребер в матрицу смежности</h1>

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
5 секунд
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
256Mb
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

Алла успешно справилась с предыдущим заданием, и теперь ей дали новое. На этот раз список рёбер ориентированного графа надо переводить в матрицу смежности. Конечно же, Алла попросила вас помочь написать программу для этого.

<h2 id="input">Формат ввода</h2>

В первой строке дано число вершин n (1 ≤ n ≤ 100) и число рёбер m (1 ≤ m ≤ n(n-1)). В следующих m строках заданы ребра в виде пар вершин (u,v), если ребро ведет от u к v.

<h2 id="output">Формат вывода</h2>

Выведите матрицу смежности n на n. На пересечении i-й строки и j-го столбца стоит единица, если есть ребро, ведущее из i в j.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5 3
1 3
2 3
5 2
</pre>

<h6>Вывод</h6>
<pre>
0 0 1 0 0 
0 0 1 0 0 
0 0 0 0 0 
0 0 0 0 0 
0 1 0 0 0
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
const pairs = [];

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
  } else if (lineNumber < ++numberOfEdges) {
    pairs.push(line.split(' '));
  }
  lineNumber++;
});

function convert(pairs, numberOfVertices) {
  const matrix = [...Array(parseInt(numberOfVertices, 10))].map(() => Array(parseInt(numberOfVertices, 10)).fill(0));
  pairs.forEach((pair) => {
    const [vertexFrom, vertexTo] = pair;
    matrix[parseInt(vertexFrom, 10) - 1][parseInt(vertexTo, 10) - 1] = 1;
  });
  matrix.forEach((row) => {
    console.log(row.join(' '));
  });
}

io_interface.on('close', function () {
  convert(pairs, numberOfVertices);
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
<td>97ms</td>
<td>8.64Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>