<h1 align="center">L. Два велосипеда</h1>

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

Вася решил накопить денег на два одинаковых велосипеда — себе и сестре. У Васи есть копилка, в которую каждый день он может добавлять деньги (если, конечно, у него есть такая финансовая возможность). В процессе накопления Вася не вынимает деньги из копилки.

У вас есть информация о росте Васиных накоплений — сколько у Васи в копилке было денег в каждый из дней.

Ваша задача — по заданной стоимости велосипеда определить

первый день, в которой Вася смог бы купить один велосипед,
и первый день, в который Вася смог бы купить два велосипеда.
Подсказка: решение должно работать за O(log n).

<h2 id="input">Формат ввода</h2>

В первой строке дано число дней n, по которым велись наблюдения за Васиными накоплениями. 1 ≤ n ≤ 106.

В следующей строке записаны n целых неотрицательных чисел. Числа идут в порядке неубывания. Каждое из чисел не превосходит 106.

В третьей строке записано целое положительное число s — стоимость велосипеда. Это число не превосходит 106.

<h2 id="output">Формат вывода</h2>

Нужно вывести два числа — номера дней по условию задачи.

Если необходимой суммы в копилке не нашлось, нужно вернуть -1 вместо номера дня.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 2 4 4 6 8
3
</pre>

<h6>Вывод</h6>
<pre>
3 5
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 2 4 4 4 4
3
</pre>

<h6>Вывод</h6>
<pre>
3 -1
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

let numberOfDays, days, cost;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfDays = getInt(line);
  } else if (_curLine === 1) {
    days = getArray(line);
  } else if (_curLine === 2) {
    cost = getInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  const result = [];
  result.push(getTheDay(days, cost, 0, numberOfDays));
  result.push(getTheDay(days, cost * 2, 0, numberOfDays));
  print(result);
})

function getTheDay(array, cost, left, right) {
  if (right <= left ) {
    return -1
  }
  const mid = (left + right) >> 1;
  if (getInt(array[mid]) >= cost && getInt(array[mid - 1]) < cost || mid === 0) {
    return mid + 1;
  } else if (getInt(array[mid]) < cost) {
    return getTheDay(array, cost, mid + 1, right);
  } else {
    return getTheDay(array, cost, left, mid);
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
}

function print(text) {
  process.stdout.write(text.join(' ') + '\n');
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
<td>424ms</td>
<td>83.15Mb</td>
</tr>
  </tbody>
</table>