<h1 align="center">G. Банкомат</h1>

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

имофей пошёл снять деньги в банкомат. Ему нужно m франков. В банкомате в бесконечном количестве имеются купюры различных достоинств. Всего различных достоинств n. Купюр каждого достоинства можно взять бесконечно много. Нужно определить число способов, которыми Тимофей сможет набрать нужную сумму.

Пояснения к примерам:

Пример 1

5 франков можно набрать следующими способами:
<pre>
1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 2
1 + 1 + 3
1 + 2 + 2
2 + 3
</pre>
Пример 2

Во втором примере всего две возможности набрать в сумме 3:
<pre>
1 + 2
1 + 1 + 1
</pre>

Пример 3

Набрать ровно 8 франков купюрами по 5 франков невозможно. Ответ равен нулю.

<h2 id="input">Формат ввода</h2>

В первой строке записано целое число m — сумма, которую нужно набрать. Во второй строке n — количество монет в банкомате. Оба числа не превосходят 300. Далее в третьей строке записано n уникальных натуральных чисел, каждое в диапазоне от 1 до 1000 –– достоинства купюр.

<h2 id="output">Формат вывода</h2>

Нужно вывести число способов, которым Тимофей сможет набрать нужную сумму.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
3
3 2 1
</pre>

<h6>Вывод</h6>
<pre>
5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
2
2 1
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
8
1
5
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let requiredAmount, numberOfDenominations ;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    requiredAmount = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    numberOfDenominations = parseInt(line, DEX);
  } else if (lineNumber === 2) {
    const denominations = line.split(' ').map((item) => parseInt(item, 10));
    console.log(solution(requiredAmount, numberOfDenominations, denominations));
  }
  lineNumber++;
});

function solution(requiredAmount, numberOfDenominations, denominations) {
  const dp = new Array(requiredAmount + 1).fill(0);
  dp[0] = 1;
  for (let coin of denominations) {
    for (let i = coin; i <= requiredAmount; i++) {
      dp[i] += dp[i - coin];
    }
    console.log(dp)
  }
  return dp[requiredAmount];
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
<td>62ms</td>
<td>6.17Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>