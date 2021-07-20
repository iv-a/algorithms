<h1 align="center">B. Застёжка-молния</h1>

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

Даны два массива чисел длины <i>n</i>. Составьте из них один массив длины <i>2n</i>, в котором числа из входных массивов чередуются (первый — второй — первый — второй — ...). При этом относительный порядок следования чисел из одного массива должен быть сохранён.

<h2 id="input">Формат ввода</h2>

В первой строке записано целое число n –— длина каждого из массивов, <i>1 ≤ n ≤ 1000</i>.

Во второй строке записано <i>n</i> чисел из первого массива, через пробел.

В третьей строке –— <i>n</i> чисел из второго массива.

Значения всех чисел –— натуральные и не превосходят <i>1000</i>.

<h2 id="output">Формат вывода</h2>
Выведите <i>2n</i> чисел из объединённого массива через пробел.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
1 2 3
4 5 6
</pre>

<h6>Вывод</h6>
<pre>
1 4 2 5 3 6
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
1
1
2
</pre>

<h6>Вывод</h6>
<pre>
1 2
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
1 8 9
2 3 1
</pre>

<h6>Вывод</h6>
<pre>
1 2 8 3 9 1
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

function zip(arrayA, arrayB, length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(arrayA[i]);
    result.push(arrayB[i]);
  }
  return result;
}

function solve() {
  const length = readInt();
  const arrayA = readArrayOfNums();
  const arrayB = readArrayOfNums();

  return zip(arrayA, arrayB, length).join(' ');
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
<td>69ms</td>
<td>6.04Mb</td>
</tr>
  </tbody>
</table>