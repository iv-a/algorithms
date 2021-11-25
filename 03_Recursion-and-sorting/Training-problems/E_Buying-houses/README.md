<h1 align="center">E. Покупка домов</h1>

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

Тимофей решил купить несколько домов на знаменитом среди разработчиков Алгосском архипелаге. Он нашёл n объявлений о продаже, где указана стоимость каждого дома в алгосских франках. А у Тимофея есть k франков. Помогите ему определить, какое наибольшее количество домов на Алгосах он сможет приобрести за эти деньги.

<h2 id="input">Формат ввода</h2>

В первой строке через пробел записаны натуральные числа n и k.

n — количество домов, которые рассматривает Тимофей, оно не превосходит 100000;

k — общий бюджет, не превосходит 100000;

В следующей строке через пробел записано n стоимостей домов. Каждое из чисел не превосходит 100000. Все стоимости — натуральные числа.

<h2 id="output">Формат вывода</h2>

Выведите одно число —– наибольшее количество домов, которое может купить Тимофей.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 300
999 999 999
</pre>

<h6>Вывод</h6>
<pre>
0
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3 1000
350 999 200
</pre>

<h6>Вывод</h6>
<pre>
2
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });
let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfHouses, budget, prices;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    [ numberOfHouses, budget ] = getArrayOfInt(line);
  } else if (_curLine === 1) {
    prices = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(countHousesToBuy(numberOfHouses, budget, prices));
})

function compareFn(a, b) {
  return a - b;
}

function countHousesToBuy(numberOfHouses, budget, prices) {
  prices.sort(compareFn);
  let housesToBuyCounter = 0;
  let sum = 0;
  while (housesToBuyCounter < numberOfHouses) {
    sum += prices[housesToBuyCounter];
    if (sum > budget) {
      break;
    }
    housesToBuyCounter++;
  }
  return housesToBuyCounter;
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.toString() + '\n');
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
<td>75ms</td>
<td>6.26Mb</td>
</tr>
  </tbody>
</table>