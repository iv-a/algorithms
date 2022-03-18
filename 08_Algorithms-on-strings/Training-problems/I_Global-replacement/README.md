<h1 align="center">I. Глобальная замена</h1>

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

Напишите программу, которая будет заменять в тексте все вхождения строки s на строку t. Гарантируется, что никакие два вхождения шаблона s не пересекаются друг с другом.

<h2 id="input">Формат ввода</h2>

В первой строке дан текст —– это строка из строчных букв английского алфавита, длина которой не превышает 106.

Во второй строке записан шаблон s, вхождения которого будут заменены.

В третьей строке дана строка t, которая будет заменять вхождения.

Обе строки s и t состоят из строчных букв английского алфавита, длина каждой строки не превосходит 105. Размер итоговой строки не превосходит 2⋅ 106.

<h2 id="output">Формат вывода</h2>

В единственной строке выведите результат всех замен — текст, в котором все вхождения s заменены на t.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
pingpong
ng
mpi
</pre>

<h6>Вывод</h6>
<pre>
pimpipompi
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
aaa
a
ab
</pre>

<h6>Вывод</h6>
<pre>
ababab
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function findPattern(text, pattern) {
  const result = [];
  const string = pattern + '#' + text;
  const p = new Array(string.length).fill(0);
  let previousP = 0;
  for (let i = 1; i < string.length; i++) {
    let k = previousP;
    while (k > 0 && string[k] !==string[i]) {
      k = p[k - 1]
    }
    if (string[k] === string[i]) {
      k += 1;
    }
    if (i < pattern.length) {
      p[i] = k;
    }
    previousP = k;
    if (k === pattern.length) {
      result.push(i - 2 * pattern.length);
    }
  }
  return result;
}

function insertString(originalString, string, index, pattern) {
  const newString = originalString.slice(0, index) + string + originalString.slice(index + pattern.length);
  return newString;
}

function solution(originalString, pattern, string) {
  const positions = findPattern(originalString, pattern);
  let i = 0;
  for (let position of positions) {
    originalString = insertString(originalString, string, position + i, pattern);
    i += string.length - pattern.length;
  }
  return originalString;
}

// console.log(findPattern('ng', 'pingpong'));
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let originalString, pattern, string;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    originalString = line;
  } else if (lineNumber === 1) {
    pattern = line;
  } else if (lineNumber === 2) {
    string = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(originalString, pattern, string));
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
<td>128ms</td>
<td>21.71Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>