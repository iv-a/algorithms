<h1 align="center">A. Ближайший ноль</h1>

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
3 секунды
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
256Mb
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

Улица, на которой хочет жить Тимофей, имеет длину <i>n</i>, то есть состоит из <i>n</i> одинаковых идущих подряд участков. На каждом участке либо уже построен дом, либо участок пустой. Тимофей ищет место для строительства своего дома. Он очень общителен и не хочет жить далеко от других людей, живущих на этой улице.

Чтобы оптимально выбрать место для строительства, Тимофей хочет для каждого участка знать расстояние до ближайшего пустого участка. (Для пустого участка эта величина будет равна нулю –— расстояние до самого себя).

Ваша задача –— помочь Тимофею посчитать искомые расстояния. Для этого у вас есть карта улицы. Дома в городе Тимофея нумеровались в том порядке, в котором строились, поэтому их номера на карте никак не упорядочены. Пустые участки обозначены нулями.

<h2 id="input">Формат ввода</h2>

В первой строке дана длина улицы —– <i>n</i> (<i>1 ≤ n ≤ 10<sup>6</sup></i>). В следующей строке записаны n целых неотрицательных чисел — номера домов и обозначения пустых участков на карте (нули). Гарантируется, что в последовательности есть хотя бы один ноль. Номера домов (положительные числа) уникальны и не превосходят <i>10<sup>9</sup></i>.

<h2 id="output">Формат вывода</h2>

Для каждого из участков выведите расстояние до ближайшего нуля. Числа выводите в одну строку, разделяя их пробелами.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
0 1 4 9 0
</pre>

<h6>Вывод</h6>
<pre>
0 1 2 1 0
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
0 7 9 4 8 20
</pre>

<h6>Вывод</h6>
<pre>
0 1 2 3 4 5
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
  },
  SEPARATOR: {
    SPACE: ' ',
    NONE: '',
  }
}

let length, street;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    street = line.split(' ');
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(solution(length, street));
});

function solution(length, street) {
  const dp = new Array(length).fill(0);
  let zeroDetected = false;
  let leftZero;
  let counter = 0;
  for (let i = 0; i < length; i++) {
    if (street[i] === '0') {
      if (!zeroDetected) {
        leftZero = i;
      }
      zeroDetected = true;
      counter = 0;
    }
    if (zeroDetected) {
      dp[i] = counter;
      counter++;
    }
  }
  zeroDetected = false;
  for (let i = length - 1; i >= leftZero; i--) {
    if (street[i] === '0') {
      zeroDetected = true;
      counter = 0;
    }
    if (zeroDetected) {
      dp[i] = Math.min(dp[i], counter);
      counter++;
    }
  }
  counter = 0;
  for (let i = leftZero; i >= 0; i--) {
    dp[i] = counter;
    counter++;
  }
  return dp.join(' ');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
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
      <td>0.697s</td>
      <td>130.88Mb</td>
    </tr>
  </tbody>
</table>