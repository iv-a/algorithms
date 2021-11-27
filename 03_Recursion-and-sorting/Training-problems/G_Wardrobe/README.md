<h1 align="center">G. Гардероб</h1>

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

Рита решила оставить у себя одежду только трёх цветов: розового, жёлтого и малинового. После того как вещи других расцветок были убраны, Рита захотела отсортировать свой новый гардероб по цветам. Сначала должны идти вещи розового цвета, потом —– жёлтого, и в конце —– малинового. Помогите Рите справиться с этой задачей.

Примечание: попробуйте решить задачу за один проход по массиву!

<h2 id="input">Формат ввода</h2>

В первой строке задано количество предметов в гардеробе: n –— оно не превосходит 1000000. Во второй строке даётся массив, в котором указан цвет для каждого предмета. Розовый цвет обозначен 0, жёлтый —– 1, малиновый –— 2.

<h2 id="output">Формат вывода</h2>

Нужно вывести в строку через пробел цвета предметов в правильном порядке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
0 2 1 2 0 0 1
</pre>

<h6>Вывод</h6>
<pre>
0 0 0 1 1 2 2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
2 1 2 0 1
</pre>

<h6>Вывод</h6>
<pre>
0 1 1 2 2
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
2 1 1 2 0 2
</pre>

<h6>Вывод</h6>
<pre>
0 1 1 2 2 2
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
};

let numberOfItems, wardrobe;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfItems = getInt(line);
  } else if (_curLine === 1) {
    wardrobe = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(sortWardrobe(numberOfItems, wardrobe))
})

function sortWardrobe(numberOfItems, wardrobe) {
  const counts = [[], [], []];
  for (let i = 0;  i < numberOfItems; i++) {
    counts[wardrobe[i]].push(wardrobe[i]);
  }
  return counts[0].concat(counts[1], counts[2]);
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
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
<td>276ms</td>
<td>59.95Mb</td>
</tr>
  </tbody>
</table>