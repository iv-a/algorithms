<h1 align="center">J. Путешествие</h1>

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

Гоша решил отправиться в турне по островам Алгосского архипелага. Туристическая программа состоит из последовательного посещения n достопримечательностей. У i-й достопримечательности есть свой рейтинг ri.

Впечатление от i-й достопримечательности равно её рейтингу ri. Гоша хочет, чтобы его впечатление от каждой новой посещённой достопримечательности было сильнее, чем от предыдущей. Ради этого он даже готов пропустить некоторые места в маршруте –— в случае, если они нарушают этот порядок плавного возрастания.

Помогите Гоше и найдите наибольшую возрастающую подпоследовательность в массиве рейтингов ri.

<h2 id="input">Формат ввода</h2>

В первой строке дано натуральное число n (1 ≤ n ≤ 3 ⋅ 103) –— сколько различных туристических мест есть в программе. Во второй строке дано n натуральных чисел через пробел –— рейтинги этих достопримечательностей ri (1 ≤ ri ≤ 109).

<h2 id="output">Формат вывода</h2>

Сначала в отдельной строке выведите длину найденной подпоследовательности. В следующей строке выведите номера достопримечательностей, которые образуют эту подпоследовательность.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
4 2 9 1 13
</pre>

<h6>Вывод</h6>
<pre>
3
1 3 5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 2 4 8 16 32
</pre>

<h6>Вывод</h6>
<pre>
6
1 2 3 4 5 6
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function findLIS(n, arr) {
  const dp = new Array(n + 1).fill(Infinity);
  const pos = new Array(n + 1);
  const prev = new Array(n);
  let length = 0;

  pos[0] = -1;
  dp[0] = -Infinity;
  for (let i = 0; i < n; i++) {
    let j = binarySearch(dp, arr[i]);
    if (dp[j - 1] < arr[i] && arr[i] < dp[j]) {
      dp[j] = arr[i];
      pos[j] = i;
      prev[i] = pos[j - 1];
      length = Math.max(length, j);
    }
  }

  let p = pos[length];
  const ans = [];
  while (p != -1) {
    ans.push(p + 1);
    p = prev[p];
  }
  ans.reverse();
  return [length, ans];
}

function binarySearch(arr, value) {
  let left = 0;
  let right = arr.length - 1;
  while (left !== right) {
    let middle = (left + right) >> 1;
    if (arr[middle] < value) {
      left = middle + 1;
    } else  {
      right = middle;
    }
  }
  return right;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = parseInt(line, 10);
  } else if (lineNumber === 1) {
    const [length , ans] = findLIS(n, line.split(' ').map((item) => parseInt(item, 10)));
    console.log(length);
    console.log(ans.join(' '));
  }
  lineNumber++;
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
<td>70ms</td>
<td>6.93Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>