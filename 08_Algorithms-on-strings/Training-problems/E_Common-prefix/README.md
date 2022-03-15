<h1 align="center">D. Общий префикс</h1>

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
2 секунды
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
128Mb
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

Найдите наибольший по длине общий префикс нескольких строк.

<h2 id="input">Формат ввода</h2>

В первой строке дано число n (1 ≤ n ≤ 105). Затем по одной на строке даны n строк, каждая не превышает 105 в длину. Суммарная длина всех строк не превосходит 107.

<h2 id="output">Формат вывода</h2>

Выведите единственное число — длину наибольшего префикса всех данных строк.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
abacaba
abudabi
abcdefg
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
2
tutu
kukuku
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
qwe
qwerty
qwerpy
</pre>

<h6>Вывод</h6>
<pre>
3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfStrings;
const DEX = 10;
const strings = [];

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfStrings = parseInt(line, DEX);
  } else if (lineNumber <= numberOfStrings) {
    strings.push(line);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(numberOfStrings, strings));
});

function solution(numberOfStrings, strings) {
  let min = 0;
  for (let i = 1; i < numberOfStrings; i++) {
    if (strings[i].length < strings[min].length) {
      min = i;
    }
  }
  for (let i = 0; i <= strings[min].length; i++) {
    for (let j = 1; j < numberOfStrings; j++) {
      let sym = strings[0][i];
      if (strings[j][i] !== sym) {
        return i;
      }
    }
  }
  return strings[min].length;
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
<td>0.69s</td>
<td>32.56Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>