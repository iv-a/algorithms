<h1 align="center">L. Лишняя буква</h1>

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
•
<a href="#solution2">Более компактное решение</a>
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

Васе очень нравятся задачи про строки, поэтому он придумал свою. Есть 2 строки s и t, состоящие только из строчных букв. Строка t получена перемешиванием букв строки s и добавлением 1 буквы в случайную позицию. Нужно найти добавленную букву.

<h2 id="input">Формат ввода</h2>

На вход подаются строки s и t, разделённые переносом строки. Длины строк не превосходят 1000 символов. Строки не бывают пустыми.

<h2 id="output">Формат вывода</h2>

Выведите лишнюю букву.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abcd
abcde
</pre>

<h6>Вывод</h6>
<pre>
e
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
go
ogg
</pre>

<h6>Вывод</h6>
<pre>
g
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
xtkpx
xkctpx
</pre>

<h6>Вывод</h6>
<pre>
c
</pre>
</ul>


<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

let lineA, lineB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    lineA = getArray(line);
  } else if (_curLine === 1) {
    lineB = getArray(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(findExtraLetter(lineA, lineB));
});

function findExtraLetter(lineA, lineB) {
  lineA.sort();
  lineB.sort();

  let longestLine, shortestLine;
  if (lineA.length > lineB.length) {
    longestLine = lineA;
    shortestLine = lineB;
  } else {
    longestLine = lineB;
    shortestLine = lineA;
  }
  for (let i = 0; i < shortestLine.length; i++) {
    if (longestLine[i] !== shortestLine[i]) {
      return longestLine[i];
    }
  }
  return longestLine[longestLine.length - 1];
}


function getArray(line) {
  return line.split('');
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
<td>65ms</td>
<td>6.26Mb</td>
</tr>
  </tbody>
</table>

<h2 id="solution2">Более компактное решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

let lineA, lineB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    lineA = line;
  } else if (_curLine === 1) {
    lineB = line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(findExtraLetter(lineA, lineB));
});

function findExtraLetter(lineA, lineB) {
  const line = lineA + lineB;
  let result = 0;
  for (let i = 0; i < line.length; i++) {
    result ^= line.charCodeAt(i);
  }
  return String.fromCharCode(result);
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
<td>111ms</td>
<td>6.26Mb</td>
</tr>
  </tbody>
</table>