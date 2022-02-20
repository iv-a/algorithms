<h1 align="center">D. Числа Фибоначчи для взрослых</h1>

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

Гоша практикуется в динамическом программировании — он хочет быстро считать числа Фибоначчи. Напомним, что числа Фибоначчи определены как последовательность . F0 = F1 = 1, Fn = Fn -1 + Fn-2, n ≥ 2. Помогите Гоше решить эту задачу.

<h2 id="input">Формат ввода</h2>

В единственной строке дано целое число n (0 ≤ n ≤ 106).

<h2 id="output">Формат вывода</h2>

Вычислите значение Fn по модулю 109 + 7 и выведите его.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
</pre>

<h6>Вывод</h6>
<pre>
8
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
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

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
</pre>

<h6>Вывод</h6>
<pre>
89
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  let i = 2;
  while (i <= n) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (10 ** 9 + 7);
    i++;
  }
  return dp[n];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

io_interface.on('line', function (line) {
  console.log(fibonacci(parseInt(line, 10)));
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
<td>77ms</td>
<td>14.09Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>