<h1 align="center">A. Генератор скобок</h1>

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

Рита по поручению Тимофея наводит порядок в правильных скобочных последовательностях (ПСП), состоящих только из круглых скобок <code>()</code>. Для этого ей надо сгенерировать все ПСП длины <i>2n</i> в алфавитном порядке —– алфавит состоит из <code>(</code> и <code>)</code> и открывающая скобка идёт раньше закрывающей.

Помогите Рите —– напишите программу, которая по заданному <i>n</i> выведет все ПСП в нужном порядке.

Рассмотрим второй пример. Надо вывести ПСП из четырёх символов. Таких всего две:
<pre>
  1. (())
  2. ()()
</pre>
<code>(())</code> идёт раньше <code>()()</code>, так как первый символ у них одинаковый, а на второй позиции у первой ПСП стоит <code>(</code>, который идёт раньше <code>)</code>.

<h2 id="input">Формат ввода</h2>

На вход функция принимает <i>n</i> — целое число от <i>0</i> до <i>10</i>.

<h2 id="output">Формат вывода</h2>

Функция должна напечатать все возможные скобочные последовательности заданной длины в алфавитном (лексикографическом) порядке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
</pre>

<h6>Вывод</h6>
<pre>
((()))
(()())
(())()
()(())
()()()
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
</pre>

<h6>Вывод</h6>
<pre>
(())
()()
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  BRACKET: {
    OPENING: '(',
    CLOSING: ')',
  },
};

_rl.on('line', (line) => {
  getBrackets(getInt(line));
});

function getBrackets(n, seq = '', openingBrackets = 0, closingBrackets = 0) {
  if (seq.length ===  2 * n) {
    print(seq);
    return;
  }
  if (openingBrackets < n) {
    getBrackets(n, seq + CONSTANTS.BRACKET.OPENING, openingBrackets + 1, closingBrackets);
  }
  if (openingBrackets > closingBrackets) {
    getBrackets(n, seq + CONSTANTS.BRACKET.CLOSING, openingBrackets, closingBrackets + 1);

  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function print(text) {
  process.stdout.write(text + '\n');
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
<td>69ms</td>
<td>6.25Mb</td>
</tr>
  </tbody>
</table>