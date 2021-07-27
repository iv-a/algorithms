<h1 align="center">C. Соседи</h1>

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

Дана матрица. Нужно написать функцию, которая для элемента возвращает всех его соседей. Соседним считается элемент, находящийся от текущего на одну ячейку влево, вправо, вверх или вниз. Диагональные элементы соседними не считаются.

Например, в матрице <i>A</i>:

<img src="./statement-image.png" align="center">

соседними элементами для <i>(0, 0)</i> будут <i>2</i> и <i>0</i>. А для <i>(2, 1)</i> –— <i>1, 2, 7, 7</i>.

<h2 id="input">Формат ввода</h2>

В первой строке задано <i>n</i> — количество строк матрицы. Во второй — количество столбцов <i>m</i>. Числа <i>m</i> и <i>n</i> не превосходят <i>1000</i>. В следующих <i>n</i> строках задана матрица. Элементы матрицы — целые числа, по модулю не превосходящие <i>1000</i>. В последних двух строках записаны координаты элемента (индексация начинается с нуля), соседей которого нужно найти.

На вход через пробел подаются числа <i>a, x, b, c</i>. В конце ввода находится перенос строки

<h2 id="output">Формат вывода</h2>

Напечатайте нужные числа в возрастающем порядке через пробел.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
3
1 2 3
0 2 6
7 4 1
2 7 0
3
0
</pre>

<h6>Вывод</h6>
<pre>
7 7
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
3
1 2 3
0 2 6
7 4 1
2 7 0
0
0
</pre>

<h6>Вывод</h6>
<pre>
0 2
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let rows, columns, targetRow, targetColumn;
const matrix = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    rows = readInt(line);
  } else if (_curLine === 1) {
    columns = readInt(line);
  } else if (_curLine < rows + 2) {
    matrix.push(readArrayOfInt(line));
  } else if (_curLine === rows + 2) {
    targetRow = readInt(line);
  } else if (_curLine === rows + 3) {
    targetColumn = readInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getNeighbours(rows, columns, matrix, targetRow, targetColumn));
});

function getNeighbours(rows, columns, matrix, targetRow, targetColumn) {
  const neighbours = [];
  if (targetColumn < columns - 1) {
    neighbours.push(matrix[targetRow][targetColumn + 1]);
  }
  if (targetRow < rows - 1) {
    neighbours.push(matrix[targetRow + 1][targetColumn]);
  }
  if (targetColumn > 0) {
    neighbours.push(matrix[targetRow][targetColumn - 1]);
  }
  if (targetRow > 0) {
    neighbours.push(matrix[targetRow - 1][targetColumn]);
  }
  return neighbours.sort((a, b) => a - b).join(' ');
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function readArrayOfInt(line) {
  return line.trim().split(' ').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}
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
<td>143ms</td>
<td>14.96Mb</td>
</tr>
  </tbody>
</table>