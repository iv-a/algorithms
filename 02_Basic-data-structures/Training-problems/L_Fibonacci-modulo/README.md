<h1 align="center">L. Фибоначчи по модулю</h1>

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
1.5 секунд
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

У Тимофея было очень много стажёров, целых <i>N (0 ≤ N ≤ 10<sup>6</sup>)</i> человек. Каждый стажёр хотел быть лучше своих предшественников, поэтому <i>i</i>-й стажёр делал столько коммитов, сколько делали два предыдущих стажёра в сумме. Два первых стажёра были менее инициативными — они сделали по одному коммиту.

Пусть <i>Fi</i> —– число коммитов, сделанных <i>i</i>-м стажёром (стажёры нумеруются с нуля). Первые два стажёра сделали по одному коммиту: <i>F<sub>0</sub> = F<sub>1</sub> = 1</i>. Для всех <i>i ≥ 2</i> выполнено <i>F <sub>i</sub> = F<sub>i−1</sub> + F<sub>i−2</sub></i>.

Определите, сколько кода напишет следующий стажёр –— найдите последние <i>k</i> цифр числа <i>F<sub>n</sub></i>.

Как найти <i>k</i> последних цифр

Чтобы вычислить <i>k</i> последних цифр некоторого числа <i>x</i>, достаточно взять остаток от его деления на число <i>10<sup>k</sup></i>. Эта операция обозначается как <i>x mod 10<sup>k</sup></i>. Узнайте, как записывается операция взятия остатка по модулю в вашем языке программирования.

Также обратите внимание на возможное переполнение целочисленных типов, если в вашем языке такое случается.

<h2 id="input">Формат ввода</h2>

В первой строке записаны через пробел два целых числа <i>n</i> <i>(0 ≤ n ≤ 10<sup>6</sup>)</i> и <i>k (1 ≤ k ≤ 8)</i>.

<h2 id="output">Формат вывода</h2>

Выведите единственное число – последние <i>k</i> цифр числа <i>F<sub>n</sub></i>.

Если в искомом числе меньше <i>k</i> цифр, то выведите само число без ведущих нулей.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 1
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
10 1
</pre>

<h6>Вывод</h6>
<pre>
9
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10
  },
}

_rl.on('line', (line) => {
  const [ num, modulo ] = readArrayOfInt(line);
  process.stdout.write(fibonacci(num, modulo).toString() + '\n');
})

function fibonacci(num, modulo) {
  let prePrev = 1, prev = 1;
  for (let  i = 1; i < num; i++) {
    const current = (prev + prePrev) % (10 ** modulo);
    prePrev = prev;
    prev = current;
  }
  return prev;
}

function readInt(line) {
  return parseInt(line, CONST.RADIX.DEC);
}

function readArrayOfInt(line) {
  return line.split(' ').map((item) => readInt(item));
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
<td>211ms</td>
<td>6.46Mb</td>
</tr>
  </tbody>
</table>