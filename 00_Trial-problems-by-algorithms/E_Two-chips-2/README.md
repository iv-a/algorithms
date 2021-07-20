<h1 align="center">E. Две фишки - 2</h1>

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
256Mb
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

Рита и Гоша играют в игру. У Риты есть <i>n</i> фишек, на каждой из которых написано количество очков. Сначала Гоша называет число <i>k</i>, затем Рита должна выбрать две фишки, сумма очков на которых равна заданному числу.

Рите надоело искать фишки самой, и она решила применить свои навыки программирования для решения этой задачи. Помогите ей написать программу для поиска нужных фишек.

<h2 id="input">Формат ввода</h2>

В первой строке записано количество фишек <i>n</i>, <i>2 ≤ n ≤ 10<sup>4</sup></i>.

Во второй строке записано <i>n</i> целых чисел в порядке неубывания —– очки на фишках Риты в диапазоне от <i>-10<sup>5</sup></i> до <i>10<sup>5</sup></i>.

В третьей строке —– загаданное Гошей целое число <i>k</i>, <i>-10<sup>5</sup> ≤ k ≤ 10<sup>5</sup></i>.

<h2 id="output">Формат вывода</h2>

Нужно вывести два числа —– очки на двух фишках, в сумме дающие <i>k</i>.

Если таких пар несколько, то можно вывести любую из них.

Если таких пар не существует, то вывести «None».

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
-1 -1 -9 -7 3 -6
2
</pre>

<h6>Вывод</h6>
<pre>
-1 3
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
6 2 8 -3 1 1 6 10
100
</pre>

<h6>Вывод</h6>
<pre>
None
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

function twoChips(numberOfChips, chipScores, requiredAmount) {
  let left = 0, right = numberOfChips - 1;
  while (left < right) {
    let sum = chipScores[left] + chipScores[right];
    if (sum === requiredAmount) {
      return [chipScores[left], chipScores[right]].join(' ');
    } else if (sum < requiredAmount) {
      left++;
    } else {
      right--;
    }
  }
  return 'None';
}

function solve() {
  const numberOfChips = readInt();
  const chipScores = readArrayOfNums();
  const requiredAmount = readInt();

  return twoChips(numberOfChips, chipScores, requiredAmount);
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
<td>104ms</td>
<td>14.56Mb</td>
</tr>
  </tbody>
</table>