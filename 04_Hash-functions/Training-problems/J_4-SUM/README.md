<h1 align="center">J. Сумма четвёрок</h1>

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

У Гоши есть любимое число S. Помогите ему найти все уникальные четвёрки чисел в массиве, которые в сумме дают заданное число S.

<h2 id="input">Формат ввода</h2>

В первой строке дано общее количество элементов массива n (0 ≤ n ≤ 1000).

Во второй строке дано целое число S  .

В третьей строке задан сам массив. Каждое число является целым и не превосходит по модулю 109.

Строки могут быть разной длины.

<h2 id="output">Формат вывода</h2>

В первой строке выведите количество найденных четвёрок чисел.

В последующих строках выведите найденные четвёрки. Числа внутри одной четверки должны быть упорядочены по возрастанию. Между собой четвёрки упорядочены лексикографически.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
10
2 3 2 4 1 10 3 0
</pre>

<h6>Вывод</h6>
<pre>
3
0 3 3 4
1 2 3 4
2 2 3 3
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
0
1 0 -1 0 2 -2
</pre>

<h6>Вывод</h6>
<pre>
3
-2 -1 1 2
-2 0 0 2
-1 0 0 1
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
4
1 1 1 1 1
</pre>

<h6>Вывод</h6>
<pre>
1
1 1 1 1
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function fourSum(numbers, target) {
  const len = numbers.length;
  const res = [];
  let l = 0;
  let r = 0;
  let sum = 0;

  numbers.sort((a, b) => a - b);

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && numbers[i] === numbers[i - 1]) continue;
    if (numbers[i] + numbers[i + 1] + numbers[i + 2] + numbers[i + 3] > target) break;
    if (numbers[i] + numbers[len - 1] + numbers[len - 2] + numbers[len - 3] < target) continue;

    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && numbers[j] === numbers[j - 1]) continue;
      if (numbers[i] + numbers[j] + numbers[j + 1] + numbers[j + 2] > target) break;
      if (numbers[i] + numbers[j] + numbers[len - 1] + numbers[len - 2] < target) continue;

      l = j + 1;
      r = len - 1;

      while (l < r) {
        sum = numbers[i] + numbers[j] + numbers[l] + numbers[r];

        if (sum < target) {
          l++;
        } else if (sum > target) {
          r--;
        } else  {
          res.push([numbers[i], numbers[j], numbers[l], numbers[r]]);
          while (l < r && numbers[l] === numbers[l + 1]) l++;
          while (l < r && numbers[r] === numbers[r - 1]) r--;
          l++;
          r--;
        }
      }
    }
  }
  return res;
}

let lineNumber = 0;
let n, target;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = Number(line);
  } else if (lineNumber === 1) {
    target = Number(line);
  } else {
    const input = line.split(' ').map(Number);
    input.sort((a, b) => a - b);
    const res = fourSum(input, target);
    console.log(res.length);
    for (let quadruplet of res) {
      console.log(quadruplet.join(' '));
    }
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
<td>0.854s</td>
<td>7.39Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>