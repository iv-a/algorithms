<h1 align="center">M. Золотая середина</h1>

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
0.084 секунды
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

Задача повышенной сложности

На каждом острове в архипелаге Алгосы живёт какое-то количество людей или же остров необитаем (тогда на острове живёт 0 людей). Пусть на i-м острове численность населения составляет ai. Тимофей захотел найти медиану среди всех значений численности населения.

Определение: Медиана (https://ru.wikipedia.org/wiki/Медиана_(статистика)) массива чисел a_i —– это такое число, что половина чисел из массива не больше него, а другая половина не меньше. В общем случае медиану массива можно найти, отсортировав числа и взяв среднее из них. Если количество чисел чётно, то возьмём в качестве медианы полусумму соседних средних чисел, (a[n/2] + a[n/2 + 1])/2.

У Тимофея уже есть отдельно данные по северной части архипелага и по южной, причём значения численности населения в каждой группе отсортированы по неубыванию.

Определите медианную численность населения по всем островам Алгосов.

Подсказка: Если n –— число островов в северной части архипелага, а m –— в южной, то ваше решение должно работать за .

<h2 id="input">Формат ввода</h2>

В первой строке записано натуральное число n, во второй —– натуральное число m. Они не превосходят 10 000.

Далее в строку через пробел записаны n целых неотрицательных чисел, каждое из которых не превосходит 10 000, –— значения численности населения в северной части Алгосов.

В последней строке через пробел записаны m целых неотрицательных чисел, каждое из которых не превосходит 10 000 –— значения численности населения в южной части Алгосов.

Значения в третьей и четвёртой строках упорядочены по неубыванию.

<h2 id="output">Формат вывода</h2>

Нужно вывести одной число — найденную медиану.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
1
1 3
2
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
2
2
1 2
3 4
</pre>

<h6>Вывод</h6>
<pre>
2.5
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
10
0 0 0 1 3 3 5 10
4 4 5 7 7 7 8 9 9 10
</pre>

<h6>Вывод</h6>
<pre>
5
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

let lenA, lenB, arrA, arrB;

_rl.on('line',(line) => {
  if (_curLine === 0) {
    lenA = getInt(line);
  } else if (_curLine === 1) {
    lenB = getInt(line);
  } else if (_curLine === 2) {
    arrA = getArrayOfInt(line);
  } else if (_curLine === 3) {
    arrB = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(getMedian(lenA, arrA, lenB, arrB));
})

function getMedian(lenA, arrA, lenB, arrB) {
  if (lenA > lenB) {
    return getMedian(lenB, arrB, lenA, arrA);
  }

  let l = 0;
  let r = lenA;
  let totalLen = lenA + lenB;

  while (l <= r) {
    let partA = (l + r) >> 1;
    let partB = ((totalLen + 1) >> 1) - partA;

    let maxLeftA = partA === 0 ? Number.MIN_SAFE_INTEGER : arrA[partA - 1];
    let minRightA = partA === lenA ? Number.MAX_SAFE_INTEGER : arrA[partA];

    let maxLeftB = partB === 0 ? Number.MIN_SAFE_INTEGER : arrB[partB - 1];
    let minRightB = partB === lenB ? Number.MAX_SAFE_INTEGER : arrB[partB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      if (totalLen % 2 === 0) {
        return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
      } else {
        return Math.max(maxLeftA, maxLeftB);
      }
    } else if (maxLeftA > minRightB) {
      r = partA - 1;
    } else {
      l = partA + 1;
    }
  }
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
<td>78ms</td>
<td>6.55Mb</td>
</tr>
  </tbody>
</table>