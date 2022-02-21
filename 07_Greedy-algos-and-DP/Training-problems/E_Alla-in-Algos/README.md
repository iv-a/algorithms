<h1 align="center">E. Алла на Алгосах</h1>

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
0.5 секунд
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

Алла хочет купить дом на Алгосах. Для этого ей надо много наличных, которые она собирается получить в банкомате. Банкомат приличный, поэтому в нём есть бесконечно много банкнот каждого номинала. Всего номиналов k штук. Дом мечты Аллы стоит x франков.

Найдите минимальное количество банкнот, которые в сумме дадут x франков. Если в набор входит несколько банкнот одинакового номинала, то учитывать надо их все.

Например, если необходимо набрать 15 франков, а в банкомате купюры по 5 франков, то минимальное число купюр —- 3.

<h2 id="input">Формат ввода</h2>

В первой строке дана сумма, которую хочет получить Алла –— натуральное число x (1 ≤ x ≤ 104). Во второй строке дано число различных номиналов k. В третьей строке даны k чисел (1 ≤ k ≤ 1000) —– номиналы купюр. Все номиналы лежат в диапазоне от 1 до 104. Номиналы купюр могут повторяться.

<h2 id="output">Формат вывода</h2>

Выведите единственное число —– минимальное количество купюр, которыми можно набрать x франков. Если нельзя набрать в точности x франков, то выведите -1.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
130
4
10 3 40 1
</pre>

<h6>Вывод</h6>
<pre>
4
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
100
2
7 5
</pre>

<h6>Вывод</h6>
<pre>
16
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
1
1
1
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

let lineNumber = 0;
let requiredAmount, numberOfDenominations ;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    requiredAmount = parseInt(line, DEX);
    // [ n, M ] = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 1) {
    numberOfDenominations = parseInt(line, DEX);
    // console.log(solution(M, line.split(' ')));
  } else if (lineNumber === 2) {
    const denominations = line.split(' ').map((item) => parseInt(item, 10));
    console.log(solution(requiredAmount, numberOfDenominations, denominations));
  }
  lineNumber++;
});

function solution(requiredAmount, numberOfDenominations, denominations) {
  const dp = new Array(requiredAmount + 1).fill(Infinity);

  for (let i = 1; i <= numberOfDenominations; i++) {
    for (let j = 1; j <= requiredAmount; j++) {
      if (j - denominations[i - 1] > 0) {
        dp[j] = Math.min(dp[j], dp[j - denominations[i - 1]] + 1);
      } else if (j - denominations[i - 1] === 0) {
        dp[j] = 1;
      }
    }
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
<td>153ms</td>
<td>6.91Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>