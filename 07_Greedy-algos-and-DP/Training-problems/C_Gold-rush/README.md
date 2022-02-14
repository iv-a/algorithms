<h1 align="center">C. Золотая лихорадка</h1>

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
64Mb
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

Гуляя по одному из островов Алгосского архипелага, Гоша набрёл на пещеру, в которой лежат кучи золотого песка. К счастью, у Гоши есть с собой рюкзак грузоподъёмностью до M килограмм, поэтому он может унести с собой какое-то ограниченное количество золота.

Всего золотых куч n штук, и все они разные. В куче под номером i содержится mi килограммов золотого песка, а стоимость одного килограмма — ci алгосских франков.

Помогите Гоше наполнить рюкзак так, чтобы общая стоимость золотого песка в пересчёте на алгосские франки была максимальной.

<h2 id="input">Формат ввода</h2>

В первой строке задано целое число M — грузоподъёмность рюкзака Гоши (0 ≤ M ≤ 108).

Во второй строке дано количество куч с золотым песком — целое число n (1 ≤ n ≤ 105).

В каждой из следующих n строк описаны кучи: i-ая куча задаётся двумя целыми числами ci и mi, записанными через пробел (1 ≤ ci ≤ 107, 1 ≤ mi ≤ 108).

<h2 id="output">Формат вывода</h2>

Выведите единственное число —– максимальную сумму (в алгосских франках), которую Гоша сможет вынести из пещеры в своём рюкзаке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
3
8 1
2 10
4 5
</pre>

<h6>Вывод</h6>
<pre>
36
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
10000
1
4 20
</pre>

<h6>Вывод</h6>
<pre>
80
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(capacity, heaps) {
  let sum = 0, iterator = 0, totalWeight = 0;
  heaps.sort(comparator);
  while (totalWeight <= capacity && iterator < heaps.length) {
    let [ cost, weight ] = heaps[iterator];
    if (capacity - totalWeight >= weight) {
      totalWeight += weight;
      sum += cost * weight;
    } else {
      sum += cost * (capacity - totalWeight);
      totalWeight += (capacity - totalWeight);
    }
    iterator++;
  }
  return sum;
}

function comparator(a, b) {
  return b[0] - a[0];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let capacity, numberOfHeaps;
const heaps = [];
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    capacity = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    numberOfHeaps = parseInt(line, DEX);
  } else if (lineNumber <= numberOfHeaps + 1) {
    const [ cost, weight ] = line.split(' ').map((item) => parseInt(item, DEX));
    heaps.push([cost, weight]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(capacity, heaps));
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
<td>397ms</td>
<td>30.98Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>