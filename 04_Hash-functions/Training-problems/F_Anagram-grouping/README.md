<h1 align="center">F. Анаграммная группировка</h1>

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

Вася решил избавиться от проблем с произношением и стать певцом. Он обратился за помощью к логопеду. Тот посоветовал Васе выполнять упражнение, которое называется анаграммная группировка. В качестве подготовительного этапа нужно выбрать из множества строк анаграммы.

Анаграммы –— это строки, которые получаются друг из друга перестановкой символов. Например, строки «SILENT» и «LISTEN» являются анаграммами.

Помогите Васе найти анаграммы.

<h2 id="input">Формат ввода</h2>

В первой строке записано число n —– количество строк.

Далее в строку через пробел записаны n строк.

n не превосходит 6000. Длина каждой строки не более 100 символов.

<h2 id="output">Формат вывода</h2>

Нужно вывести в отсортированном порядке индексы строк, которые являются анаграммами.

Каждая группа индексов должна быть выведена в отдельной строке. Индексы внутри одной группы должны быть отсортированы по возрастанию. Группы между собой должны быть отсортированы по возрастанию первого индекса.

Обратите внимание, что группа анаграмм может состоять и из одной строки. Например, если в исходном наборе нет анаграмм, то надо вывести n групп, каждая из которых состоит из одного индекса.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
tan eat tea ate nat bat
</pre>

<h6>Вывод</h6>
<pre>
0 4
1 2 3
5
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function isAnagram(array, numberOfStrings) {
  const map = new Map();
  for (let i = 0; i < numberOfStrings; i++) {
    let sortedStr = array[i].split('').sort().join('');
    let value = map.get(sortedStr) ;
    if (!value) {
      value = [];
      value.push(i);
      map.set(sortedStr, value);
    } else {
      value.push(i);
      map.set(sortedStr, value);
    }
  }
  return map;
}

let lineNumber = 0;
let numberOfStrings, arrayOfStrings;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfStrings = Number(line);
  } else {
    arrayOfStrings = line.split(' ');
    for (let value of isAnagram(arrayOfStrings, numberOfStrings).values()) {
      console.log(value.join(' '));
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
<td>298ms</td>
<td>16.79Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>