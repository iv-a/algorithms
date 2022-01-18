<h1 align="center">I. Разные деревья поиска</h1>

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
5 секунд
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

Ребятам стало интересно, сколько может быть различных деревьев поиска, содержащих в своих узлах все уникальные числа от 1 до n. Помогите им найти ответ на этот вопрос.

<h2 id="input">Формат ввода</h2>

В единственной строке задано число n. Оно не превосходит 20.

<h2 id="output">Формат вывода</h2>

Нужно вывести число, равное количеству различных деревьев поиска, в узлах которых могут быть размещены числа от 1 до n включительно.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
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
3
</pre>

<h6>Вывод</h6>
<pre>
5
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
</pre>

<h6>Вывод</h6>
<pre>
14
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function numberOfDFT(n) {
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    ans *= (4 * i - 2);
    ans /= (i + 1);
  }
  console.log(ans);
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

io_interface.on('line', function (line) {
  numberOfDFT(Number(line));
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
<td>62ms</td>
<td>6.20Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>