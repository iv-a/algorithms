<h1 align="center">H. Скобочная последовательность</h1>

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
0.1 секунда
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

Вот какую задачу Тимофей предложил на собеседовании одному из кандидатов. Если вы с ней ещё не сталкивались, то наверняка столкнётесь –— она довольно популярная.

Дана скобочная последовательность. Нужно определить, правильная ли она.

Будем придерживаться такого определения:

<ul>
<li>пустая строка —– правильная скобочная последовательность;</li>
<li>правильная скобочная последовательность, взятая в скобки одного типа, –— правильная скобочная последовательность;</li>
<li>правильная скобочная последовательность с приписанной слева или справа правильной скобочной последовательностью —– тоже правильная.</li>
</ul>

На вход подаётся последовательность из скобок трёх видов: <code>[]</code>, <code>()</code>, <code>{}</code>.
Напишите функцию <code>is_correct_bracket_seq</code>, которая принимает на вход скобочную последовательность и возвращает <code>True</code>, если последовательность правильная, а иначе <code>False</code>.

<h2 id="input">Формат ввода</h2>

На вход подаётся одна строка, содержащая скобочную последовательность. Скобки записаны подряд, без пробелов.

<h2 id="output">Формат вывода</h2>

Выведите «True» или «False».

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
{[()]}
</pre>

<h6>Вывод</h6>
<pre>
True
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
()
</pre>

<h6>Вывод</h6>
<pre>
True
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  ANS: {
    TRUE: 'True',
    FALSE: 'False',
  }
}

_rl.on('line', (line) => {
  process.stdout.write(isCorrectBracketSeq(line) + '\n');
})

function isCorrectBracketSeq(seq) {
  const brackets = new Map([['(', ')'],['[', ']'],['{', '}']]);
  const stack = [];

  for (let bracket of seq) {
    if (brackets.has(bracket)) {
      stack.push(bracket);
    } else if (brackets.get(stack[stack.length - 1]) === bracket) {
      stack.pop();
    } else {
      return CONST.ANS.FALSE;
    }
  }
  if (stack.length) {
    return CONST.ANS.FALSE;
  }
  return CONST.ANS.TRUE;
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
<td>76ms</td>
<td>6.22Mb</td>
</tr>
  </tbody>
</table>