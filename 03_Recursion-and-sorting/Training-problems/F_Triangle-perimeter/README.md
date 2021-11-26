<h1 align="center">F. Периметр треугольника</h1>

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

Перед сном Рита решила поиграть в игру на телефоне. Дан массив целых чисел, в котором каждый элемент обозначает длину стороны треугольника. Нужно определить максимально возможный периметр треугольника, составленного из сторон с длинами из заданного массива. Помогите Рите скорее закончить игру и пойти спать.

Напомним, что из трёх отрезков с длинами a ≤ b ≤ c можно составить треугольник, если выполнено неравенство треугольника: c < a + b

Разберём пример:
даны длины сторон 6, 3, 3, 2. Попробуем в качестве наибольшей стороны выбрать 6. Неравенство треугольника не может выполниться, так как остались 3, 3, 2 —– максимальная сумма из них равна 6.

Без шестёрки оставшиеся три отрезка уже образуют треугольник со сторонами 3, 3, 2. Неравенство выполняется: 3 < 3 + 2. Периметр равен 3 + 3 + 2 = 8.

<h2 id="input">Формат ввода</h2>

В первой строке записано количество отрезков n, 3≤ n≤ 10000.

Во второй строке записано n неотрицательных чисел, не превосходящих 10 000, –— длины отрезков.

<h2 id="output">Формат вывода</h2>

Нужно вывести одно число —– наибольший периметр треугольника.

Гарантируется, что тройка чисел, которая может образовать треугольник, всегда есть.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
6 3 3 2
</pre>

<h6>Вывод</h6>
<pre>
8
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
5 3 7 2 8 3
</pre>

<h6>Вывод</h6>
<pre>
20
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
  }
};

let numberOfSegments, segments;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfSegments = getInt(line);
  } else if (_curLine === 1) {
    segments = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(maxPerimeter(numberOfSegments, segments));
})

function compareFn(a, b) {
  return b - a;
}

function maxPerimeter(numberOfSegments, segments) {
  segments.sort(compareFn);
  let i = 0;
  while (i + 2 < numberOfSegments) {
    if (segments[i] < segments[i + 1] + segments[i + 2]) {
      break;
    } else {
      i++;
    }
  }
  return segments[i] + segments[i + 1] + segments[i + 2];
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.toString() + '\n');
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
<td>84ms</td>
<td>6.53Mb</td>
</tr>
  </tbody>
</table>