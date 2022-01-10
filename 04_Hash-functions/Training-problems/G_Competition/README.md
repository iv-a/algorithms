<h1 align="center">G. Соревнование</h1>

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

Жители Алгосов любят устраивать турниры по спортивному программированию. Все участники разбиваются на пары и соревнуются друг с другом. А потом два самых сильных программиста встречаются в финальной схватке, которая состоит из нескольких раундов. Если в очередном раунде выигрывает первый участник, в таблицу с результатами записывается _0_, если второй, то _1_. Ничьей в раунде быть не может.

Нужно определить наибольший по длине непрерывный отрезок раундов, по результатам которого суммарно получается ничья. Например, если дана последовательность _0 0 1 0 1 1 1 0 0 0_, то раунды с 2-го по 9-й (нумерация начинается с единицы) дают ничью.

<h2 id="input">Формат ввода</h2>

В первой строке задаётся _n_ (_0 ≤ n ≤ 105_) –— количество раундов. Во второй строке через пробел записано _n_ чисел –— результаты раундов. Каждое число равно либо _0_, либо _1_.

<h2 id="output">Формат вывода</h2>

Выведите длину найденного отрезка.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
0 1
</pre>

<h6>Вывод</h6>
<pre>
2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
0 1 0
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

const CONST = {
  RADIX: {
    DEC: 10,
  },
}

let _curLine = 0;
let sequenceLength, sequence;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    sequenceLength = getInt(line);
  } else if (_curLine === 1) {
    sequence = line.split(' ');
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getMaxLengthDrawSequence(sequenceLength, sequence))
});

function getMaxLengthDrawSequence(sequenceLength, sequence) {
  let curScore = 0;
  const scoresMap = new Map();

  scoresMap.set(curScore, [0]);

  for (let i = 0; i < sequenceLength; i++) {
    if (sequence[i] === '0') {
      curScore--;
    } else if (sequence[i] === '1') {
      curScore++;
    }

    const curScoreSeq = scoresMap.get(curScore);

    if (!curScoreSeq) {
      scoresMap.set(curScore, [i + 1]);
    } else {
      curScoreSeq[1] = i + 1;
    }
  }

  let maxSeqLength = 0;
  for (let seq of scoresMap.values()) {
    const [ start, end ] = seq;
    const seqLength = end - start;
    if (seqLength > maxSeqLength) {
      maxSeqLength = seqLength;
    }
  }
  return maxSeqLength;
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
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
<td>147ms</td>
<td>28.40Mb</td>
</tr>
  </tbody>
</table>