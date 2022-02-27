<h1 align="center">I. Сложное поле с цветочками</h1>

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

Теперь черепашке Кондратине надо узнать не только, сколько цветочков она может собрать, но и как ей построить свой маршрут для этого. Помогите ей!

Напомним, что Кондратине надо дойти от левого нижнего до правого верхнего угла, а передвигаться она умеет только вверх и вправо.

<h2 id="input">Формат ввода</h2>

В первой строке даны размеры поля n и m (через пробел). Оба числа лежат в диапазоне от 1 до 1000. В следующих n строках задано поле. Каждая строка состоит из m символов 0 или 1 и завершается переводом строки. Если в клетке записана единица, то в ней растет цветочек.

<h2 id="output">Формат вывода</h2>

Выведите в первой строке максимальное количество цветочков, которое сможет собрать Кондратина. Во второй строке выведите маршрут в виде последовательности символов «U» и «R», где «U» означает передвижение вверх, а «R» – передвижение вправо.

Если возможных оптимальных путей несколько, то выведите любой.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
2 3
101
110
</pre>

<h6>Вывод</h6>
<pre>
3
URR
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 3
100
110
001
</pre>

<h6>Вывод</h6>
<pre>
2
UURR
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function getRoute(dp, numberOfRows, numberOfColumns) {
  let ans = [];
  let i = numberOfRows - 1;
  let j = numberOfColumns - 1;
  while (true) {
    if (i === 0 && j === 0) break;
    if (i - 1 < 0) {
      ans.push(CONSTANTS.RIGHT);
      j--;
    } else if (j - 1 < 0) {
      ans.push(CONSTANTS.UP);
      i--;
    } else {
      if (dp[i - 1][j] > dp[i][j - 1]) {
        ans.push(CONSTANTS.UP);
        i--;
      } else {
        ans.push(CONSTANTS.RIGHT);
        j--;
      }
    }
  }
  return ans.reverse().join('');
}

function solution(flowers) {
  const dp = [...Array(numberOfRows)].map(() => Array(numberOfColumns));
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = flowers[i][j];
      } else {
        if (i - 1 < 0) {
          dp[i][j] = dp[i][j - 1] + flowers[i][j];
        } else if (j - 1 < 0) {
          dp[i][j] = dp[i - 1][j] + flowers[i][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + flowers[i][j];
        }
      }
    }
  }
  return [dp[numberOfRows - 1][numberOfColumns - 1], getRoute(dp, numberOfRows, numberOfColumns)];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfRows, numberOfColumns;
let row;
const flowers = [];

const dex = 10;
const CONSTANTS = {
  UP: 'U',
  RIGHT: 'R',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfRows, numberOfColumns ] = line.split(' ').map((item) => parseInt(item, dex));
    row = numberOfRows - 1;
  } else if (lineNumber <= numberOfRows) {
    flowers[row] = line.split('').map((item) => parseInt(item, dex));
    row--;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  const [ maxFlowers, route] = solution(flowers);
  console.log(maxFlowers);
  console.log(route);
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
<td>173ms</td>
<td>34.84Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>