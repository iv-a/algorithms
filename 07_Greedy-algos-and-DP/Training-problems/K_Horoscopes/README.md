<h1 align="center">K. Гороскопы</h1>

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
0.3 секунды
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

В мире последовательностей нет гороскопов. Поэтому когда две последовательности хотят понять, могут ли они счастливо жить вместе, они оценивают свою совместимость как длину их наибольшей общей подпоследовательности.

Подпоследовательность получается из последовательности удалением некоторого (возможно, нулевого) числа элементов. То есть элементы сохраняют свой относительный порядок, но не обязаны изначально идти подряд.

Найдите наибольшую общую подпоследовательность двух одиноких последовательностей и выведите её!

<h2 id="input">Формат ввода</h2>

В первой строке дано число n — количество элементов в первой последовательности (1 ≤ n ≤ 1000). Во второй строке даны n чисел ai (0 ≤ |ai| ≤ 109) — элементы первой последовательности. Аналогично в третьей строке дано m (1 ≤ m ≤ 1000) — число элементов второй последовательности. В четвертой строке даны элементы второй последовательности через пробел bi (0 ≤ |bi| ≤ 109).

<h2 id="output">Формат вывода</h2>

Сначала выведите длину найденной наибольшей общей подпоследовательности, во второй строке выведите индексы элементов первой последовательности, которые в ней участвуют, в третьей строке — индексы элементов второй последовательности. Нумерация индексов с единицы, индексы должны идти в корректном порядке.

Если возможных НОП несколько, то выведите любую.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
4 9 2 4 6
7
9 4 0 0 2 8 4
</pre>

<h6>Вывод</h6>
<pre>
3
1 3 4
2 5 7
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
1 1 1 1
2
2 2
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
8
1 2 1 9 1 2 1 9
5
9 9 1 9 9
</pre>

<h6>Вывод</h6>
<pre>
3
3 4 8
3 4 5
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n, m;
let arrA, arrB;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    arrA = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 2) {
    m = parseInt(line, DEX);
  } else if (lineNumber === 3) {
    arrB = line.split(' ').map((item) => parseInt(item, 10));
    const [ sizeOfLCS, [ aLCS, bLCS ] ] = findLCS(n, arrA, m, arrB);
    console.log(sizeOfLCS);
    if (sizeOfLCS) {
      console.log(aLCS.join(' '));
      console.log(bLCS.join(' '));
    }
  }
  lineNumber++;
});

function findLCS(n, arrA, m, arrB) {
  const dp = [...Array(n + 1)].map(() => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (arrA[i - 1] === arrB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return [dp[n][m], getLCS(dp, n, arrA, m, arrB)]
}

function getLCS(dp, n, arrA, m, arrB) {
  const ansA = [];
  const ansB = [];
  let i = n;
  let j = m;
  while (dp[i][j] !== 0) {
    if (arrA[i - 1] === arrB[j - 1]) {
      ansA.push(i);
      ansB.push(j);
      i--;
      j--;
    } else {
      if (dp[i][j] === dp[i - 1][j]) {
        i--;
      } else if (dp[i][j] === dp[i][j - 1]){
        j--;
      }
    }
  }
  return [ansA.reverse(), ansB.reverse()];
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
<td>109ms</td>
<td>19.23Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>