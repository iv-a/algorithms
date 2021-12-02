<h1 align="center">I. Любители конференций</h1>

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
0.5 секунд
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

На IT-конференции присутствовали студенты из разных вузов со всей страны. Для каждого студента известен ID университета, в котором он учится.

Тимофей предложил Рите выяснить, из каких k вузов на конференцию пришло больше всего учащихся.

<h2 id="input">Формат ввода</h2>

В первой строке дано количество студентов в списке —– n (1 ≤ n ≤ 15 000).

Во второй строке через пробел записаны n целых чисел —– ID вуза каждого студента. Каждое из чисел находится в диапазоне от 0 до 10 000.

В третьей строке записано одно число k.

<h2 id="output">Формат вывода</h2>

Выведите через пробел k ID вузов с максимальным числом участников. Они должны быть отсортированы по убыванию популярности (по количеству гостей от конкретного вуза). Если более одного вуза имеет одно и то же количество учащихся, то выводить их ID нужно в порядке возрастания.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
1 2 3 1 2 3 4
3
</pre>

<h6>Вывод</h6>
<pre>
1 2 3
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 1 1 2 2 3
1
</pre>

<h6>Вывод</h6>
<pre>
1
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

let numberOfStudents, students, numberOfUniversities;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfStudents = getInt(line);
  } else if (_curLine === 1) {
    students = getArrayOfInt(line);
  } else if (_curLine === 2) {
    numberOfUniversities = getInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(getTopUniversities(numberOfStudents, students, numberOfUniversities));
})

function compareFn(itemA, itemB) {
  const [ idA, countA ] = itemA;
  const [ idB, countB ] = itemB;
  if (countA - countB > 0) {
    return -1;
  } else if (countA - countB === 0) {
    return idA - idB;
  } else {
    return 1;
  }
}

function getTopUniversities(numberOfStudents, students, numberOfUniversities) {
  const universities = new Map();
  for (let student of students) {
    const count = universities.get(student);
    if (count) {
      universities.set(student, count + 1);
    } else {
      universities.set(student, 1);
    }
  }
  const topUniversities = Array.from(universities).sort(compareFn);
  const result = [];
  for (let i = 0; i < numberOfUniversities; i++) {
    result.push(topUniversities[i][0]);
  }

  return result.join(' ');
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
<td>97ms</td>
<td>6.52Mb</td>
</tr>
  </tbody>
</table>