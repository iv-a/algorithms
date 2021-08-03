<h1 align="center">J. Факторизация</h1>

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
0.4 секунды
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

Тимофей готовит доклад ко дню открытых дверей кафедры Теории чисел. Он собирается рассказать про Основную теорему арифметики. В соответствии с этой теоремой, любое число раскладывается на произведение простых множителей единственным образом –— с точностью до их перестановки.

Например, число <i>8</i> можно представить как <i>2 × 2 × 2</i>.

Число <i>50</i> –— как <i>2 × 5 × 5</i> (или <i>5 × 5 × 2</i>, или <i>5 × 2 × 5</i>). Три варианта отличаются лишь порядком следования множителей.

Разложение числа на простые множители называется факторизацией числа.

Факторизацию в уме делать сложно, поэтому помогите Тимофею написать для этого программу.

<h2 id="input">Формат ввода</h2>

В единственной строке дано число <i>n</i> (<i>2 ≤ n ≤ 10<sup>9</sup></i>), которое нужно факторизовать.

<h2 id="output">Формат вывода</h2>

Выведите в порядке неубывания простые множители, на которые раскладывается число <i>n</i>.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
</pre>

<h6>Вывод</h6>
<pre>
2 2 2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
13
</pre>

<h6>Вывод</h6>
<pre>
13
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
100
</pre>

<h6>Вывод</h6>
<pre>
2 2 5 5
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10
  }
}

_rl.on('line', (line) => {
  process.stdout.write(solution(getInt(line)) + '\n');
})

function solution(num) {
  const sqrt = Math.sqrt(num);
  const primes = getPrimes(Math.ceil(sqrt));
  const result = [];
  for (let prime of primes) {
    while (num % prime === 0) {
      result.push(prime);
      num /= prime;
    }
  }
  if (num !== 1) {
    result.push(num);
  }
  return result.join(' ');
}

function getPrimes(num) {
  const dp = Array(num + 1).fill(0);
  const primes = [];

  for (let i = 2; i < num + 1; i++) {
    if (dp[i] === 0) {
      dp[i] = i;
      primes.push(i);
    }
    for (let p of primes) {
      let x = p * i;
      if (p > dp[i] || x > num) {
        break;
      }
      dp[x] = p;
    }
  }
  return primes;
}

function getInt(line) {
  return parseInt(line, CONST.RADIX.DEC);
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
<td>73ms</td>
<td>7.00Mb</td>
</tr>
  </tbody>
</table>