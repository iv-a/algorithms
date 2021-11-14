<h1 align="center">A. Мониторинг</h1>

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

Алла получила задание, связанное с мониторингом работы различных серверов. Требуется понять, сколько времени обрабатываются определённые запросы на конкретных серверах. Эту информацию нужно хранить в матрице, где номер столбца соответствуют идентификатору запроса, а номер строки — идентификатору сервера. Алла перепутала строки и столбцы местами. С каждым бывает. Помогите ей исправить баг.

Есть матрица размера <i>m × n</i>. Нужно написать функцию, которая её транспонирует.

Транспонированная матрица получается из исходной заменой строк на столбцы.

Например, для матрицы <i>А</i> (слева) транспонированной будет следующая матрица (справа):

<img src="./pic.png">

<h2 id="input">Формат ввода</h2>

В первой строке задано число <i>n</i> — количество строк матрицы.
Во второй строке задано <i>m</i> — число столбцов, <i>m</i> и <i>n</i> не превосходят <i>1000</i>. В следующих <i>n</i> строках задана матрица. Числа в ней не превосходят по модулю <i>1000</i>.

<h2 id="output">Формат вывода</h2>

Напечатайте транспонированную матрицу в том же формате, который задан во входных данных. Каждая строка матрицы выводится на отдельной строке, элементы разделяются пробелами.

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
</pre>

<h6>Вывод</h6>
<pre>
1 0 7 2
2 2 4 7
3 6 1 0
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
9
5
-7 -1 0 -4 -9
5 -1 2 2 9
3 1 -8 -1 -7
9 0 8 -8 -1
2 4 5 2 8
-7 10 0 -4 -8
-3 10 -7 10 3
1 6 -7 -5 9
-1 9 9 1 9
</pre>

<h6>Вывод</h6>
<pre>
-7 5 3 9 2 -7 -3 1 -1
-1 -1 1 0 4 10 10 6 9
0 2 -8 8 5 0 -7 -7 9
-4 2 -1 -8 2 -4 10 -5 1
-9 9 -7 -1 8 -8 3 9 9
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

let rows, columns;
const matrix = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    rows = readInt(line);
  } else if (_curLine === 1) {
    columns = readInt(line);
  } else if (_curLine < rows + 1) {
    matrix.push(line);
  } else  if (_curLine === rows + 1) {
    matrix.push(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(transpose(rows, columns, matrix.join(' ').split(' ')));
});

function transpose(rows, columns, matrix) {
  const transposedMatrix = [];
  for (let i = 0; i < columns; i++) {
    const newRow = [];
    for (let j = i; j < matrix.length; j += columns) {
      newRow.push(matrix[j]);
    }
    transposedMatrix.push(newRow.join(' '));
  }
  return transposedMatrix.join('\n');
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
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
<td>388ms</td>
<td>77.65Mb</td>
</tr>
  </tbody>
</table>