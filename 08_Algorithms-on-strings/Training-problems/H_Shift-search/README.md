<h1 align="center">H. Поиск со сдвигом</h1>

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

Гоша измерял температуру воздуха n дней подряд. В результате у него получился некоторый временной ряд. Теперь он хочет посмотреть, как часто встречается некоторый шаблон в получившейся последовательности. Однако температура — вещь относительная, поэтому Гоша решил, что при поиске шаблона длины m (a1, a2, ..., am) стоит также рассматривать сдвинутые на константу вхождения. Это значит, что если для некоторого числа c в исходной последовательности нашёлся участок вида (a1 + c, a2 + c, ... , am + c), то он тоже считается вхождением шаблона (a1, a2, ..., am).

По заданной последовательности измерений X и шаблону A=(a1, a2, ..., am) определите все вхождения A в X, допускающие сдвиг на константу.

Подсказка: если вы пишете на питоне и сталкиваетесь с TL, то попробуйте заменить какие-то из циклов операциями со срезами.

<h2 id="input">Формат ввода</h2>

В первой строке дано количество сделанных измерений n — натуральное число, не превышающее 104. Во второй строке через пробел записаны n целых чисел xi, 0 ≤ xi ≤ 103 –— результаты измерений. В третьей строке дано натуральное число m –— длина искомого шаблона, 1≤ m ≤ n. В четвёртой строке даны m целых чисел ai — элементы шаблона, 0 ≤ ai ≤ 103.

<h2 id="output">Формат вывода</h2>

Выведите через пробел в порядке возрастания все позиции, на которых начинаются вхождения шаблона A в последовательность X. Нумерация позиций начинается с единицы.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
9
3 9 1 2 5 10 9 1 7
2
4 10
</pre>

<h6>Вывод</h6>
<pre>
1 8
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
1 2 3 4 5
3
10 11 12
</pre>

<h6>Вывод</h6>
<pre>
1 2 3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(measurements, pattern) {
  const occurrences = [];
  let start = 0;
  let min = Math.min.apply(null, pattern);
  pattern.forEach((item, i, arr) => arr[i] = item - min);
  let pos = findPattern(measurements, pattern, start);
  while (pos !== -1) {
    occurrences.push(pos + 1);
    start = pos + 1;
    pos = findPattern(measurements, pattern, start);
  }
  return occurrences.join(' ');
}

function findPattern(array, pattern, start = 0) {
  if (array.length < pattern.length) {
    return -1;
  }
  for (let pos = start; pos <= array.length - pattern.length; pos++) {
    let match = true;
    for (let offset = 1; offset < pattern.length; offset++) {
      if (array[pos + offset] - pattern[offset] !== array[pos + offset - 1] - pattern[offset - 1]) {
        match = false;
        break;
      }
    }
    if (match === true) return pos;
  }
  return -1;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;

let numberOfMeasurements;
let measurements;
let patternSize;
let pattern;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfMeasurements = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    measurements = line.split(' ').map((item) => parseInt(item, DEX));
  } else if (lineNumber === 2) {
    patternSize = parseInt(line, DEX);
  } else if (lineNumber === 3) {
    pattern = line.split(' ').map((item) => parseInt(item, DEX));
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(measurements, pattern));
});
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
<td>103ms</td>
<td>7.16Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>