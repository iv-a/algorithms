<h1 align="center">K. Списочная форма</h1>

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
•
<a href="#solution-2">Более эффективное решение</a>
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

Вася просил Аллу помочь решить задачу. На этот раз по информатике.

Для неотрицательного целого числа <i>X</i> списочная форма –— это массив его цифр слева направо. К примеру, для <i>1231</i> списочная форма будет <i>[1,2,3,1]</i>. На вход подается количество цифр числа <i>Х</i>, списочная форма неотрицательного числа <i>Х</i> и неотрицательное число <i>K</i>. Числа <i>К</i> и <i>Х</i> не превосходят <i>10 000</i>.

Нужно вернуть списочную форму числа <i>X + K</i>.

<h2 id="input">Формат ввода</h2>

В первой строке — длина списочной формы числа <i>X</i>. На следующей строке — сама списочная форма с цифрами записанными через пробел.

В последней строке записано число <i>K</i>, <i>0 ≤ K ≤ 10 000</i>.

<h2 id="output">Формат вывода</h2>

Выведите списочную форму числа <i>X + K</i>.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
1 2 0 0
34
</pre>

<h6>Вывод</h6>
<pre>
1 2 3 4
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
9 5
17
</pre>

<h6>Вывод</h6>
<pre>
1 1 2
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

let length, listForm, num;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    listForm = getArrayOfInt(line);
  } else if (_curLine === 2) {
    num = getArrayOfInt(line, CONSTANTS.SEPARATOR.NONE);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getListForm(length, listForm, num));
});

function getListForm(length, listForm, num) {
  let numA = listForm.reverse();
  let numB = num.reverse();

  if (numA.length > numB.length) {
    addZero(numA, numB);
  } else if (numB.length > numA.length) {
    addZero(numB, numA);
  }
  const result = [];
  let temp = 0;
  for (let i = 0; i < numA.length; i++) {
    let sum = numA[i] + numB[i] + temp
    result.push(sum % 10);
    temp = Math.floor(sum / 10);
  }
  if (temp !== 0) {
    result.push(temp);
  }
  return result.reverse().join(' ');
}

function addZero(longest, shortest) {
  while (longest.length > shortest.length) {
    shortest.push(0);
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line, separator = CONSTANTS.SEPARATOR.SPACE) {
  return line.trim().split(separator).map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
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
<td>163ms</td>
<td>6.26Mb</td>
</tr>
  </tbody>
</table>

<h2 id="solution-2">Более эффективное решение</h2>

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

let length, listForm, numB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    listForm = getArray(line);
  } else if (_curLine === 2) {
    numB = getInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getListForm(listForm, numB));
});

function getListForm(listForm, numB) {
  const numA = getInt(listForm.join(''));
  return (numA + numB).toString().split('').join(' ');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
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
<td>78ms</td>
<td>6.25Mb</td>
</tr>
  </tbody>
</table>