<h1 align="center">B. Расписание</h1>

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

Дано количество учебных занятий, проходящих в одной аудитории. Для каждого из них указано время начала и конца. Нужно составить расписание, в соответствии с которым в классе можно будет провести как можно больше занятий.

Если возможно несколько оптимальных вариантов, то выведите любой. Возможно одновременное проведение более чем одного занятия нулевой длительности.

<h2 id="input">Формат ввода</h2>

В первой строке задано число занятий. Оно не превосходит 1000. Далее для каждого занятия в отдельной строке записано время начала и конца, разделённые пробелом. Время задаётся одним целым числом h, если урок начинается/заканчивается ровно в h часов. Если же урок начинается/заканчивается в h часов m минут, то время записывается как h.m. Гарантируется, что каждое занятие начинается не позже, чем заканчивается. Указываются только значащие цифры.

<h2 id="output">Формат вывода</h2>

Выведите в первой строке наибольшее число уроков, которое можно провести в аудитории. Далее выведите время начала и конца каждого урока в отдельной строке в порядке их проведения.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
9 10
9.3 10.3
10 11
10.3 11.3
11 12
</pre>

<h6>Вывод</h6>
<pre>
3
9 10
10 11
11 12
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
9 10
11 12.25
12.15 13.3
</pre>

<h6>Вывод</h6>
<pre>
2
9 10
11 12.25
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
19 19
7 14
12 14
8 22
22 23
5 21
9 23
</pre>

<h6>Вывод</h6>
<pre>
3
7 14
19 19
22 23
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfClasses;
const classes = [];

function comparator(a, b) {
  const [ startTimeA, endTimeA ] = a;
  const [ startTimeB, endTimeB ] = b;
  if (endTimeA > endTimeB) {
    return 1;
  } else if (endTimeA < endTimeB) {
    return -1;
  } else {
    return startTimeA - startTimeB;
  }
}

function getOptimalClasses(classes) {
  classes.sort(comparator);
  const ans = [];
  let addedLessonStarts, addedLessonEnds;
  for (let i = 0; i < classes.length; i++) {
    const [ start, end ] = classes[i];
    if (i === 0) {
      ans.push(classes[i]);
      addedLessonStarts = start;
      addedLessonEnds = end;
    } else {
      if (start >= addedLessonEnds) {
        ans.push(classes[i]);
        addedLessonStarts = start;
        addedLessonEnds = end;
      }
    }
  }
  return ans;
}

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfClasses = parseInt(line, 10);
  } else if (lineNumber <= numberOfClasses) {
    const [ startTime, endTime ] = line.split(' ');
    classes.push([Number(startTime), Number(endTime)]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  const ans = getOptimalClasses(classes);
  console.log(ans.length);
  ans.forEach((item) => {
    process.stdout.write(item.join(' ') + '\n');
  })
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
<td>73ms</td>
<td>6.93Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>