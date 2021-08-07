<h1 align="center">B. Ловкость рук</h1>

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

Гоша и Тимофей нашли необычный тренажёр для скоростной печати и хотят освоить его. Тренажёр представляет собой поле из клавиш <i>4 × 4</i>, в котором на каждом раунде появляется конфигурация цифр и точек. На клавише написана либо точка, либо цифра от <i>1</i> до <i>9</i>. В момент времени <i>t</i> игрок должен одновременно нажать на все клавиши, на которых написана цифра <i>t</i>. Гоша и Тимофей могут нажать в один момент времени на <i>k</i> клавиш каждый. Если в момент времени <i>t</i> были нажаты все нужные клавиши, то игроки получают <i>1</i> балл.

Найдите число баллов, которое смогут заработать Гоша и Тимофей, если будут нажимать на клавиши вдвоём.

<img src=".\pic.png">

<h2 id="input">Формат ввода</h2>

В первой строке дано целое число k (1 ≤ k ≤ 5).

В четырёх следующих строках задан вид тренажёра –— по <i>4</i> символа в каждой строке. Каждый символ —– либо точка, либо цифра от <i>1</i> до <i>9</i>. Символы одной строки идут подряд и не разделены пробелами.

<h2 id="output">Формат вывода</h2>

Выведите единственное число –— максимальное количество баллов, которое смогут набрать Гоша и Тимофей.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
1231
2..2
2..2
2..2
</pre>

<h6>Вывод</h6>
<pre>
2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
1111
9999
1111
9911
</pre>

<h6>Вывод</h6>
<pre>
1
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
1111
1111
1111
1111
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
let matrix = '';

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let possibility, numbers;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    possibility = readInt(line);
  } else if (_curLine >= 1 && _curLine < 4) {
    matrix += line;
  } else if (_curLine === 4) {
    matrix += line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getScore(possibility, matrix));
});

function getScore(enabledButtons, matrix) {
  const numbers = matrix.match(/\d/g);
  const activeButtons = new Map();
  if (numbers) {
    for (let num of numbers) {
      const score = activeButtons.get(num);
      if (score) {
        activeButtons.set(num, score + 1);
      } else {
        activeButtons.set(num, 1);
      }
    }
  }
  let score = 0;
  for (let value of activeButtons.values()) {
    if (value <= 2 * possibility) {
      score++;
    }
  }
  return score.toString();
}

function readInt(line) {
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
      <td>129ms</td>
      <td>6.26Mb</td>
    </tr>
  </tbody>
</table>