<h1 align="center">C. Пограничный контроль</h1>

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
0.2 секунды
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

Представьте, что вы работаете пограничником и постоянно проверяете документы людей по записи из базы. При этом допустима ситуация, когда имя человека в базе отличается от имени в паспорте на одну замену, одно удаление или одну вставку символа. Если один вариант имени может быть получен из другого удалением одного символа, то человека пропустят через границу. А вот если есть какое-либо второе изменение, то человек грустно поедет домой или в посольство.

Например, если первый вариант —– это «Лена», а второй — «Лера», то девушку пропустят. Также человека пропустят, если в базе записано «Коля», а в паспорте — «оля».

Однако вариант, когда в базе числится «Иннокентий», а в паспорте написано «ннакентий», уже не сработает. Не пропустят также человека, у которого в паспорте записан «Иинннокентий», а вот «Инннокентий» спокойно пересечёт границу.

Напишите программу, которая сравнивает имя в базе с именем в паспорте и решает, пропускать человека или нет. В случае равенства двух строк — путешественника, естественно, пропускают.

<h2 id="input">Формат ввода</h2>

В первой строке дано имя из паспорта.

Во второй строке —- имя из базы.

Обе строки состоят из строчных букв английского алфавита. Размер каждой строки не превосходит 100 000 символов.

<h2 id="output">Формат вывода</h2>

Выведите «OK», если человека пропустят, или «FAIL» в противном случае.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abcdefg
abdefg
</pre>

<h6>Вывод</h6>
<pre>
OK
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
helo
hello
</pre>

<h6>Вывод</h6>
<pre>
OK
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
dog
fog
</pre>

<h6>Вывод</h6>
<pre>
OK
</pre>
</ul>

<hr>

<h4>Пример 4</h4>
<ul>
<h6>Ввод</h6>
<pre>
mama
papa
</pre>

<h6>Вывод</h6>
<pre>
FAIL
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
function solution(stringA, stringB) {
  const [ longestString, shortestString ] =
    stringA.length > stringB.length ? [ stringA, stringB ] : [ stringB, stringA ];
  if (longestString.length - shortestString.length > 1) {
    return ANS.FAIL;
  }
  if (longestString.length === shortestString.length) {
    let fails = 0;
    for (let i = 0; i < longestString.length; i++) {
      if (longestString[i] !== shortestString[i]) {
        fails += 1;
      }
    }
    return fails > 1 ? ANS.FAIL : ANS.OK;
  } else {
    for (let i = 0; i < longestString.length; i++) {
      if (longestString[i] !== shortestString[i] && longestString[i + 1] !== shortestString[i]) {
        return ANS.FAIL;
      }
    }
  }
  return ANS.OK;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let stringA, stringB;
const ANS = {
  OK: 'OK',
  FAIL: 'FAIL',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    stringA = line;
  } else if (lineNumber === 1) {
    stringB = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(stringA, stringB));
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
<td>74ms</td>
<td>6.99Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>