<h1 align="center">I. Степень четырёх</h1>

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

Вася на уроке математики изучил степени. Теперь он хочет написать программу, которая определяет, будет ли положительное целое число степенью четвёрки.

Подсказка: степенью четвёрки будут все числа вида <i>4n</i>, где <i>n</i> – целое неотрицательное число.

<h2 id="input">Формат ввода</h2>

На вход подаётся целое число в диапазоне от <i>0</i> до <i>10000</i>.

<h2 id="output">Формат вывода</h2>

Выведите «True», если число является степенью четырёх, «False» –— в обратном случае.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
15
</pre>

<h6>Вывод</h6>
<pre>
False
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
16
</pre>

<h6>Вывод</h6>
<pre>
True
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  ANS: {
    TRUE: 'True',
    FALSE: 'False'
  },
  RADIX: {
    DEC: 10
  },
}

_rl.on('line', (line) => {
  process.stdout.write(isPowerOfFour(getInt(line)) + '\n');
});

function isPowerOfFour(num) {
  while (num !== 1) {
    if (num % 4 !== 0) {
      return CONSTANTS.ANS.FALSE;
    }
    num = num >> 2;
  }
  return CONSTANTS.ANS.TRUE;
}

function getInt(line) {
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
<td>60ms</td>
<td>6.14Mb</td>
</tr>
  </tbody>
</table>