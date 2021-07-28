<h1 align="center">D. Хаотичность погоды</h1>

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
0.2 секунды
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

Метеорологическая служба вашего города решила исследовать погоду новым способом. Под температурой воздуха в конкретный день будем понимать максимальную температуру в этот день. Назовём хаотичностью погоды за <code>n</code> дней количество дней, в которые температура строго больше, чем в день до (если такой существует) и в день после текущего (если такой существует). Например, если за <code>5</code> дней максимальная температура воздуха составляла <code>[1, 2, 5, 4, 8]</code> градусов, то хаотичность за этот период равна <code>2</code>: в 3-й и 5-й дни выполнялись описанные условия. Определите по ежедневным показаниям температуры хаотичность погоды за этот период.

<h2 id="input">Формат ввода</h2>

В первой строке дано число <code>n</code> –— длина периода измерений в днях, <i>1 ≤ <code>n</code>≤ 10<sup>5</sup></i>. Во второй строке даны n целых чисел –— значения температуры в каждый из n дней. Значения температуры не превосходят <code>273</code> по модулю.

<h2 id="output">Формат вывода</h2>

Выведите единственное число — хаотичность за данный период.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
-1 -10 -8 0 2 0 5
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
5
1 2 5 4 8
</pre>

<h6>Вывод</h6>
<pre>
2
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

let period, temperatureValues;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    period = readInt(line);
  } else if (_curLine === 1) {
    temperatureValues = readArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getChaotic(period, temperatureValues));
});

function getChaotic(period, temperatureValues) {
  let chaotic = 0;
  if (period > 1) {
    if (temperatureValues[0] > temperatureValues[1]) {
      chaotic++;
    }
    if (temperatureValues[period - 1] > temperatureValues[period - 2]) {
      chaotic++;
    }

    for (let i = 1; i < period - 1; i++) {
      if (temperatureValues[i - 1] < temperatureValues[i] && temperatureValues[i] > temperatureValues[i + 1]) {
        chaotic++;
      }
    }
  } else if (period === 1) {
    chaotic++;
  }
  return chaotic.toString();
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
<td>99ms</td>
<td>14.29Mb</td>
</tr>
  </tbody>
</table>