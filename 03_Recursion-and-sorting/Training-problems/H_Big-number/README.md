<h1 align="center">H. Большое число</h1>

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
0.5 секунд
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

Вечером ребята решили поиграть в игру «Большое число».
Даны числа. Нужно определить, какое самое большое число можно из них составить.

<h2 id="input">Формат ввода</h2>

В первой строке записано n — количество чисел. Оно не превосходит 100.
Во второй строке через пробел записаны n неотрицательных чисел, каждое из которых не превосходит 1000.

<h2 id="output">Формат вывода</h2>

Нужно вывести самое большое число, которое можно составить из данных чисел.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
15 56 2
</pre>

<h6>Вывод</h6>
<pre>
56215
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
1 783 2
</pre>

<h6>Вывод</h6>
<pre>
78321
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
2 4 5 2 10
</pre>

<h6>Вывод</h6>
<pre>
542210
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfNumbers, numbers;

let _curLine = 0;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfNumbers = getInt(line);
  } else if (_curLine === 1) {
    numbers = getArray(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  print(getBiggestNumber(numberOfNumbers, numbers));
});

function getBiggestNumber(numberOfNumbers, numbers) {
  numbers.sort(comparator);
  return numbers.join('');
}

function comparator(a, b) {
  return (b + a) - (a + b);
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
}

function print(text) {
  process.stdout.write(text + '\n');
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
<td>72ms</td>
<td>6.21Mb</td>
</tr>
  </tbody>
</table>