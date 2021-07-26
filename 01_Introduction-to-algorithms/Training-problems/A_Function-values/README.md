<h1 align="center">A. Значения функции</h1>

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
0.4 секунды
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

Вася делает тест по математике: вычисляет значение функций в различных точках. Стоит отличная погода, и друзья зовут Васю гулять. Но мальчик решил сначала закончить тест и только после этого идти к друзьям. К сожалению, Вася пока не умеет программировать. Зато вы умеете. Помогите Васе написать код функции, вычисляющей <i>y = ax<sup>2</sup> + bx + c</i>. Напишите программу, которая будет по коэффициентам <i>a, b, c</i> и числу x выводить значение функции в точке <i>x</i>.

<h2 id="input">Формат ввода</h2>

На вход через пробел подаются числа <i>a, x, b, c</i>. В конце ввода находится перенос строки

<h2 id="output">Формат вывода</h2>

Выведите одно число — значение функции в точке <i>x</i>.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
-8 -5 -2 7
</pre>

<h6>Вывод</h6>
<pre>
-183
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
8 2 9 -10
</pre>

<h6>Вывод</h6>
<pre>
40
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const _inputLines = [];

const CONSTANTS = {
  INPUT_LINES_NUMBER: 1,
}

_rl.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === CONSTANTS.INPUT_LINES_NUMBER) {
    _rl.close();
  }
});

_rl.on('close', () => {
  process.stdout.write(solve());
});

function calc([ a, x, b, c ]) {
  return (a * x ** 2 + b * x + c).toString();
}

function solve() {
  const coefficients = readArrayOfNumbers();
  return calc(coefficients);
}

function readArrayOfNumbers() {
  return _inputLines[_curLine++].trim().split(' ').map((num) => parseFloat(num));
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
<td>60ms</td>
<td>6.05Mb</td>
</tr>
  </tbody>
</table>