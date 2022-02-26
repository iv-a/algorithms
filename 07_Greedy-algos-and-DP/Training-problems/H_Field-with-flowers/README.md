<h1 align="center">H. Поле с цветочками</h1>

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

Черепаха Кондратина путешествует по клетчатому полю из n строк и m столбцов. В каждой клетке либо растёт цветочек, либо не растёт. Кондратине надо добраться из левого нижнего в правый верхний угол и собрать как можно больше цветочков.

Помогите ей с этой сложной задачей и определите, какое наибольшее число цветочков она сможет собрать при условии, что Кондратина умеет передвигаться только на одну клетку вверх или на одну клетку вправо за ход.

<h2 id="input">Формат ввода</h2>

В первой строке даны размеры поля n и m (через пробел). Оба числа лежат в диапазоне от 1 до 1000. В следующих n строках задано поле. Каждая строка состоит из m символов 0 или 1, записанных подряд без пробелов, и завершается переводом строки. Если в клетке записана единица, то в ней растёт цветочек.

<h2 id="output">Формат вывода</h2>

Выведите единственное число — максимальное количество цветочков, которое сможет собрать Кондратина.

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
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
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
  return dp[numberOfRows - 1][numberOfColumns - 1];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfRows, numberOfColumns;
const dex = 10;
const flowers = [];
let row;

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
  console.log(solution(flowers));
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
<td>169ms</td>
<td>34.64Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>