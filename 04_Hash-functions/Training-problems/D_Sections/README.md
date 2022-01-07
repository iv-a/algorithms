<h1 align="center">D. Кружки</h1>

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
1 секунд
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

В компании, где работает Тимофей, заботятся о досуге сотрудников и устраивают различные кружки по интересам. Когда кто-то записывается на занятие, в лог вносится название кружка.

По записям в логе составьте список всех кружков, в которые ходит хотя бы один человек.

<h2 id="input">Формат ввода</h2>

В первой строке даётся натуральное число _n_, не превосходящее _10 000_ –— количество записей в логе.

В следующих _n_ строках —– названия кружков.

<h2 id="output">Формат вывода</h2>

Выведите уникальные названия кружков по одному на строке, в порядке появления во входных данных.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
вышивание крестиком
рисование мелками на парте
настольный керлинг
настольный керлинг
кухня африканского племени ужасмай
тяжелая атлетика
таракановедение
таракановедение
</pre>

<h6>Вывод</h6>
<pre>
вышивание крестиком
рисование мелками на парте
настольный керлинг
кухня африканского племени ужасмай
тяжелая атлетика
таракановедение
</pre>
</ul>

<hr>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

let logLength;
const sections = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    logLength = getInt(line);
  } else if (_curLine <= logLength) {
    sections.push(line);
    if (_curLine === logLength) {
      _rl.close();
    }
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getUniqueSections(sections));
})

function getUniqueSections(sections) {
  return Array.from(new Set(sections)).join('\n');
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
<td>158ms</td>
<td>9.08Mb</td>
</tr>
  </tbody>
</table>