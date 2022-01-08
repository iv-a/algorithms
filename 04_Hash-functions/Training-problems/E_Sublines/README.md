<h1 align="center">E. Подстроки</h1>

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
0.1 секунда
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

На вход подается строка. Нужно определить длину наибольшей подстроки, которая не содержит повторяющиеся символы.

<h2 id="input">Формат ввода</h2>

Одна строка, состоящая из строчных латинских букв. Длина строки не превосходит 10 000.

<h2 id="output">Формат вывода</h2>

Выведите натуральное число —– ответ на задачу.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abcabcbb
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
bbbbb
</pre>

<h6>Вывод</h6>
<pre>
1
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function getMaxLength(line) {
  let maxLen = 0;
  let startIdx = 0;
  const symbols = new Map();

  for (let i = 0; i < line.length; i++) {
    if (symbols.has(line[i])) {
      startIdx = Math.max(startIdx, symbols.get(line[i]) + 1);
    }
    maxLen = Math.max(maxLen, i - startIdx + 1);
    symbols.set(line[i], i);
  }
  return maxLen;
}

io_interface.on('line', function (line) {
  console.log(getMaxLength(line));
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
<td>72ms</td>
<td>7.21Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>