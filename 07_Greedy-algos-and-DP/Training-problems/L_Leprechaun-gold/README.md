<h1 align="center">L. Золото лепреконов</h1>

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

Лепреконы в данной задаче появились по соображениям общей морали, так как грабить банки — нехорошо.

Вам удалось заключить неплохую сделку с лепреконами, поэтому они пустили вас в своё хранилище золотых слитков. Все слитки имеют единую пробу, то есть стоимость 1 грамма золота в двух разных слитках одинакова. В хранилище есть n слитков, вес i-го слитка равен wi кг. У вас есть рюкзак, вместимость которого M килограмм.

Выясните максимальную суммарную массу золотых слитков, которую вы сможете унести.

<h2 id="input">Формат ввода</h2>

В первой строке дано число слитков —– натуральное число n (1 ≤ n ≤ 1000) и вместимость рюкзака –— целое число M (0 ≤ M ≤ 104). Во второй строке записано n натуральных чисел wi (1 ≤ wi ≤ 104) -— массы слитков.

<h2 id="output">Формат вывода</h2>

Выведите единственное число — максимальную массу, которую можно забрать с собой.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5 15
3 8 1 2 5
</pre>

<h6>Вывод</h6>
<pre>
15
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
5 19
10 10 7 7 4
</pre>

<h6>Вывод</h6>
<pre>
18
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(M, W) {
  const dp = new Array(M + 1);
  W.forEach((item) => {
    const w = parseInt(item, 10);
    const buffer = [];
    for (let i = 1; i <= M; i++) {
      if (!dp[i]) {
        if (i - w > 0) {
          if (dp[i - w]) {
            buffer.push(i);
          }
        }
      }
    }
    dp[w] = true;
    while (buffer.length > 0) {
      dp[buffer.pop()] = true;
    }
  });

  for (let i = M; i > 0; i--) {
    if (dp[i] === true) return i;
  }
  return 0;
}

// const W = [3, 8, 1, 2, 5];
// console.log(solution(15, W));
// const W = [10, 10, 7, 7, 4];
// console.log(solution(19, W));

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n, M;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ n, M ] = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 1) {
    console.log(solution(M, line.split(' ')));
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
<td>219ms</td>
<td>7.45Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>