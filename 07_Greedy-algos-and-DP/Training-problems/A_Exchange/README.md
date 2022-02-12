<h1 align="center">A. Биржа</h1>

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
0.2 секунды
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

Рита хочет попробовать поиграть на бирже. Но для начала она решила потренироваться на исторических данных.

Даны стоимости акций в каждый из n дней. В течение дня цена акции не меняется. Акции можно покупать и продавать, но только по одной штуке в день. В один день нельзя совершать более одной операции (покупки или продажи). Также на руках не может быть более одной акции в каждый момент времени.

Помогите Рите выяснить, какую максимальную прибыль она могла бы получить.

Пояснения к примерам

Пример 1
Рита может купить акцию во 2-й день за 1 франк.

Затем она продаст её на 3-й день за 5 франков.

В 4-й день она снова купит акцию за 3 франка.

На 5-й день Рита продаст эту акцию за 6 франков.

Прибыль составила (5 - 1) + (6 - 3) = 7 франков.

Пример 2
Рите выгодно купить акцию в самый первый день и продать в последний.

Пример 3
Рита покупает акции в дни с номерами 1, 3 и 5. Продаёт в дни 2, 4 и 6. Итоговая прибыль составит (12 - 1) + (16 - 12) + (8 - 1) = 22. Такой же результат можно получить в виде: 22 = (16 - 1) + (8 - 1), если покупать акции в дни 1 и 5, а продавать в дни 4 и 6.

<h2 id="input">Формат ввода</h2>

В первой строке записано количество дней n —– целое число в диапазоне от 0 до 10 000.

Во второй строке через пробел записано n целых чисел в диапазоне от 0 до 1000 –— цены акций.

<h2 id="output">Формат вывода</h2>

Выведите число, равное максимально возможной прибыли за эти дни.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
7 1 5 3 6 4
</pre>

<h6>Вывод</h6>
<pre>
7
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
1 2 3 4 5
</pre>

<h6>Вывод</h6>
<pre>
4
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 12 12 16 1 8
</pre>

<h6>Вывод</h6>
<pre>
22
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function removeDuplicates(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const current = parseInt(arr[i], 10);
    const right = parseInt(arr[i + 1], 10);
    if (current !== right) {
      newArr.push(current);
    }
  }
  if (arr[arr.length - 1] !== newArr[newArr.length - 1]) newArr.push(arr[arr.length - 1]);
  return newArr;
}

function solution(arr) {
  let sum = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    const left = parseInt(arr[i - 1], 10);
    const current = parseInt(arr[i], 10);
    const right = parseInt(arr[i + 1], 10);
    if (i - 1 === 0 && left < current) {
      sum -= left;
    }
    if (current < left && current < right) {
      sum -= current;
    }
    if (current > left && current > right) {
      sum += current;
    }
    if (i + 1 === arr.length - 1 && current < right) {
      sum += right;
    }
  }
  return sum;
}



const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfDays;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfDays = parseInt(line, 10);
  } else if (lineNumber === 1) {
    console.log(solution(removeDuplicates(line.split(' '))));
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
<td>72ms</td>
<td>6.63Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>