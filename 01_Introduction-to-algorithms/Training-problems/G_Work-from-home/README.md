<h1 align="center">G. Работа из дома</h1>

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

Вася реализовал функцию, которая переводит целое число из десятичной системы в двоичную. Но, кажется, она получилась не очень оптимальной.

Попробуйте написать более эффективную программу. <b>Не используйте встроенные средства языка по переводу чисел в бинарное представление.</b>

<h2 id="input">Формат ввода</h2>

На вход подаётся целое число в диапазоне от <i>0</i> до <i>10000</i>.

<h2 id="output">Формат вывода</h2>

Выведите двоичное представление этого числа.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
</pre>

<h6>Вывод</h6>
<pre>
101
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
14
</pre>

<h6>Вывод</h6>
<pre>
1110
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
  process.stdout.write(decimalToBinary(getInt(line)) + '\n');
});

function decimalToBinary(dec) {
  const ans = [];
  while (dec !== 0) {
    ans.push(dec % 2);
    dec = dec >> 1;
  }
  return ans.reverse().join('');
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
<td>71ms</td>
<td>6.19Mb</td>
</tr>
  </tbody>
</table>