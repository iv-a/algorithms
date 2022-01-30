<h1 align="center">A. Построить список смежности</h1>

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

Алла пошла на стажировку в студию графического дизайна, где ей дали такое задание: для очень большого числа ориентированных графов преобразовать их список рёбер в список смежности. Чтобы побыстрее решить эту задачу, она решила автоматизировать процесс.

Помогите Алле написать программу, которая по списку рёбер графа будет строить его список смежности.

<h2 id="input">Формат ввода</h2>

В первой строке дано число вершин n (1 ≤ n ≤ 100) и число ребер m (1 ≤ m ≤ n(n-1)). В следующих m строках заданы ребра в виде пар вершин (u,v), если ребро ведет от u к v.

<h2 id="output">Формат вывода</h2>

Выведите информацию о рёбрах, исходящих из каждой вершины.

В строке i надо написать число рёбер, исходящих из вершины i, а затем перечислить вершины, в которые ведут эти рёбра –— в порядке возрастания их номеров.

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
1 3 
1 3 
0 
0 
1 2
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
  const vertices = new Array(++numberOfVertices);
  pairs.forEach((pair) => {
    const [ vertexFrom, vertexTo ] = pair;
    if (vertices[parseInt(vertexFrom, 10)] === undefined) {
      vertices[parseInt(vertexFrom, 10)] = [vertexTo];
    } else {
      vertices[parseInt(vertexFrom, 10)].push(vertexTo);
    }
  });
  for (let i = 1; i < vertices.length; i++) {
    if (vertices[i] === undefined) {
      console.log(0);
    } else {
      vertices[i].sort((a, b) => a - b);
      // console.log('' + vertices[i].length + vertices[i].join(' '));
      console.log(`${vertices[i].length} ${vertices[i].join(' ')}`);
    }
  }
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
<td>102ms</td>
<td>9.20Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>