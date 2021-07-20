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

Вам дана статистика по числу запросов в секунду к вашему любимому рекомендательному сервису.
Измерения велись <i>n</i> секунд.

В секунду <i>i</i> поступает <i>q<sub>i</sub></i> запросов.

Примените метод скользящего среднего с длиной окна <i>k</i> к этим данным и выведите результат.

<h2 id="input">Формат ввода</h2>

В первой строке передаётся натуральное число <i>n</i>, количество секунд, в течение которых велись измерения. <i>1 ≤ n ≤ 10<sup>5</sup></i>

Во второй строке через пробел записаны <i>n</i> целых неотрицательных чисел <i>q<sub>i</sub></i>, каждое лежит в диапазоне от <i>0</i> до <i>10<sup>3</sup></i>.

В третьей строке записано натуральное число <i>k</i> (<i>1 ≤ k ≤ n</i>) —– окно сглаживания.

Примечание для Go:

Заметьте, что в данной задаче достаточно большой размер ввода. Поэтому необходимо задавать размер буфера для сканнера хотя бы 600 Кб.

<h2 id="output">Формат вывода</h2>
Выведите через пробел результат применения метода скользящего среднего к серии измерений. Должно быть выведено <i>n - k + 1</i> элементов, каждый элемент -— вещественное (дробное) число.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
1 2 3 4 5 6 7
4
</pre>

<h6>Вывод</h6>
<pre>
2.5 3.5 4.5 5.5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
9
9 3 2 0 1 5 1 0 0
3
</pre>

<h6>Вывод</h6>
<pre>
4.6666666667 1.666666667 1 2 2.333333335 2 0.3333333
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
1 2 3 4 5
5
</pre>

<h6>Вывод</h6>
<pre>
3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const DEC = 10;

const _io_interface = _readline.createInterface({
  input: process.stdin
});

let _curLine = 0;
const _inputLines = [];

_io_interface.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === 3) {
    _io_interface.close();
  }
})

_io_interface.on('close', () => {
  process.stdout.write(solve());
});

function movingAverage(numberOfSeconds, timeSeries, period) {
  const result = [];
  let localSum = 0;

  for (let i = 0; i < period; i++) {
    localSum += timeSeries[i];
  }

  result.push(localSum / period);

  for (let i = 0; i < numberOfSeconds - period; i++) {
    localSum -= timeSeries[i];
    localSum += timeSeries[i + period];
    result.push(localSum/ period);
  }
  return result;
}

function solve() {
  const numberOfSeconds = readInt();
  const timeSeries = readArrayOfNums();
  const period = readInt();

  return movingAverage(numberOfSeconds, timeSeries, period).join(' ');
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}

function readArrayOfNums() {
  return _inputLines[_curLine++].trim().split(' ').map(num => parseInt(num, DEC));
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
<td>122ms</td>
<td>18.32Mb</td>
</tr>
  </tbody>
</table>