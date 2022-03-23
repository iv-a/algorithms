<h1 align="center">M. Подсчёт префикс-функции</h1>

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

В этой задаче вам необходимо посчитать префикс-функцию для заданной строки.

<h2 id="input">Формат ввода</h2>

На вход подаётся строка, состоящая из строчных латинских букв. Длина строки не превосходит 106.

<h2 id="output">Формат вывода</h2>

Если длина входной строки L, то выведите через пробел L целых неотрицательных чисел —– массив значений префикс-функции исходной строки.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abracadabra
</pre>

<h6>Вывод</h6>
<pre>
0 0 0 1 0 1 0 1 2 3 4
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
xxzzxxz
</pre>

<h6>Вывод</h6>
<pre>
0 1 0 0 1 2 3
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
aaaaa
</pre>

<h6>Вывод</h6>
<pre>
0 1 2 3 4
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function prefixFunctionCounter(string) {
  const p = new Array(string.length).fill(0);
  for (let i = 1; i < string.length; i++) {
    let k = p[i - 1];
    while (k > 0 && string[k] !==string[i]) {
      k = p[k - 1]
    }
    if (string[k] === string[i]) {
      k += 1;
    }
    p[i] = k;
  }
  return p.join(' ');
}

io_interface.on('line', function (line) {
  console.log(prefixFunctionCounter(line));
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
<td>336ms</td>
<td>66.88Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>