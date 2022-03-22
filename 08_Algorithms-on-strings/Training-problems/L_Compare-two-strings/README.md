<h1 align="center">L. Сравнить две строки</h1>

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

Алла придумала новый способ сравнивать две строки: чтобы сравнить строки a и b, в них надо оставить только те буквы, которые в английском алфавите стоят на четных позициях. Затем полученные строки сравниваются по обычным правилам. Помогите Алле реализовать новое сравнение строк.

<h2 id="input">Формат ввода</h2>

На вход подаются строки a и b по одной в строке. Обе строки состоят из маленьких латинских букв, не бывают пустыми и не превосходят 105 символов в длину.

<h2 id="output">Формат вывода</h2>

Выведите -1, если a < b, 0, если a = b, и 1, если a > b.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
gggggbbb
bbef
</pre>

<h6>Вывод</h6>
<pre>
-1
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
z
aaaaaaa
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
ccccz
aaaaaz
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(stringA, stringB) {
  const arrayA = [];
  const arrayB = [];
  for (let i = 0; i < stringA.length; i++) {
    if (stringA.charCodeAt(i) % 2 === 0) {
      arrayA.push(stringA[i]);
    }
  }
  for (let i = 0; i < stringB.length; i++) {
    if (stringB.charCodeAt(i) % 2 === 0) {
      arrayB.push(stringB[i]);
    }
  }
  stringA = arrayA.join('');
  stringB = arrayB.join('');
  if (stringA === stringB) {
    return 0;
  } else if (stringA > stringB) {
    return 1;
  } else {
    return -1;
  }
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let stringA, stringB;
const ANS = {
  OK: 'OK',
  FAIL: 'FAIL',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    stringA = line;
  } else if (lineNumber === 1) {
    stringB = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(stringA, stringB));
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
<td>89ms</td>
<td>10.92Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>