<h1 align="center">A. A+B</h1>

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
Напишите программу, которая считывает два целых числа и выводит их сумму.

<h2 id="input">Формат ввода</h2>

В первой строке записано первое число. Во второй строке — второе число. Оба числа целые и лежат в диапазоне от <strong>−10<sup>9</sup></strong> до <strong>10<sup>9</sup></strong>. Ввод заканчивается переносом строки.

<h2 id="output">Формат вывода</h2>
Выведите на стандартный поток вывода или в файл <code>output.txt</code> единственное число –— сумму двух переданных программе чисел.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
12
90
</pre>

<h6>Вывод</h6>
<pre>
102
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
200
-200
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
1000000000
1000000000
</pre>

<h6>Вывод</h6>
<pre>
2000000000
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });
const DEC = 10;

const _inputLines = [];
let _curLine = 0;

io_interface.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === 2) {
    io_interface.close();
  }
});

io_interface.on('close', () => {
  process.stdout.write(solve());
});

function sum(a, b) {
  return (a + b).toString();
}

function solve() {
  const a = readNumber();
  const b = readNumber();

  return sum(a, b);
}

function readNumber() {
  return parseInt(_inputLines[_curLine++], DEC);
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
<td>65ms</td>
<td>6.26Mb</td>
</tr>
  </tbody>
</table>