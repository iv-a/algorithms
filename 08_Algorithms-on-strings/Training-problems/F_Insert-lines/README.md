<h1 align="center">F. Вставка строк</h1>

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

У Риты была строка s, Гоша подарил ей на 8 марта ещё n других строк ti, 1≤ i≤ n. Теперь Рита думает, куда их лучше поставить. Один из вариантов —– расположить подаренные строки внутри имеющейся строки s, поставив строку ti сразу после символа строки s с номером ki (в частности, если ki=0, то строка вставляется в самое начало s).

Помогите Рите и определите, какая строка получится после вставки в s всех подаренных Гошей строк.

<h2 id="input">Формат ввода</h2>

В первой строке дана строка s. Строка состоит из строчных букв английского алфавита, не бывает пустой и её длина не превышает 105 символов.

Во второй строке записано количество подаренных строк — натуральное число n, 1 ≤ n ≤ 105.

В каждой из следующих n строк через пробел записаны пары ti и ki. Строка ti состоит из маленьких латинских букв и не бывает пустой. ki — целое число, лежащее в диапазоне от 0 до |s|. Все числа ki уникальны. Гарантируется, что суммарная длина всех строк ti не превосходит 105.

<h2 id="output">Формат вывода</h2>

Выведите получившуюся в результате вставок строку.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abacaba
3
queue 2
deque 0
stack 7
</pre>

<h6>Вывод</h6>
<pre>
dequeabqueueacabastack
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
kukareku
2
p 1
q 2
</pre>

<h6>Вывод</h6>
<pre>
kpuqkareku
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(originalString, substrings) {
  substrings.sort(comparator);
  let counter = 0;
  const ans = [];
  substrings.forEach((item, i) => {
    let [ substring, position ] = item;
    ans.push(originalString.slice(counter, position));
    ans.push(substring);
    counter = position;
  });
  if (counter < originalString.length) {
    ans.push(originalString.slice(counter));
  }
  return ans.join('');
}

function comparator(a, b) {
  return a[1] - b[1];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfStrings;
const DEX = 10;
const substrings = [];
let originalString;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    originalString = line;
  } else if (lineNumber === 1) {
    numberOfStrings = parseInt(line, DEX);
  } else if (lineNumber <= numberOfStrings + 1) {
    const [ substring, position ] = line.split(' ');
    substrings.push([substring, parseInt(position, DEX)]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(originalString, substrings));
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
<td>321ms</td>
<td>33.03Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>