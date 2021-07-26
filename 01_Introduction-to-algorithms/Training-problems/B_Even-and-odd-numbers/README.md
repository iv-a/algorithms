<h1 align="center">B. Чётные и нечётные числа</h1>

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
0.3 секунды
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

Алла придумала такую онлайн-игру: игрок нажимает на кнопку, и на экране появляются три случайных числа. Если все три числа оказываются одной чётности, игрок выигрывает.

Напишите программу, которая по трём числам определяет, выиграл игрок или нет.

<h2 id="input">Формат ввода</h2>

В первой строке записаны три случайных целых числа <i>a, b и c</i>. Числа не превосходят <i>10<sup>9</sup></i> по модулю.

На вход через пробел подаются числа <i>a, x, b, c</i>. В конце ввода находится перенос строки

<h2 id="output">Формат вывода</h2>

Выведите «WIN», если игрок выиграл, и «FAIL» в противном случае.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
1 2 -3
</pre>

<h6>Вывод</h6>
<pre>
FAIL
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
7 11 7
</pre>

<h6>Вывод</h6>
<pre>
WIN
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6 -2 0
</pre>

<h6>Вывод</h6>
<pre>
WIN
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
  RADIX: {
    DEC: 10,
  },
  ANS: {
    WIN: 'WIN',
    FAIL: 'FAIL',
  }
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

function calc([ a, b, c ]) {
  return (!((a | b | c) & 1) || (a & b & c & 1)) ? CONSTANTS.ANS.WIN : CONSTANTS.ANS.FAIL;
}

function solve() {
  const numbers = readArrayOfIntNumbers();
  return calc(numbers);
}

function readArrayOfIntNumbers() {
  return _inputLines[_curLine++].trim().split(' ').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
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
<td>6.18Mb</td>
</tr>
  </tbody>
</table>