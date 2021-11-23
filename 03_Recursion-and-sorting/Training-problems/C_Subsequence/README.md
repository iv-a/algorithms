<h1 align="center">C. Подпоследовательность</h1>

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

Гоша любит играть в игру «Подпоследовательность»: даны 2 строки, и нужно понять, является ли первая из них подпоследовательностью второй. Когда строки достаточно длинные, очень трудно получить ответ на этот вопрос, просто посмотрев на них. Помогите Гоше написать функцию, которая решает эту задачу.

<h2 id="input">Формат ввода</h2>

В первой строке записана строка s.

Во второй —- строка t.

Обе строки состоят из маленьких латинских букв, длины строк не превосходят 150000. Строки не могут быть пустыми.

<h2 id="output">Формат вывода</h2>

Выведите True, если s является подпоследовательностью t, иначе —– False.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
abc
ahbgdcu
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
abcp
ahpc
</pre>

<h6>Вывод</h6>
<pre>
False
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
  ANS: {
    TRUE: 'True',
    FALSE: 'False',
  }
};

let stringA, stringB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    stringA = line;
  } else if (_curLine === 1) {
    stringB = line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  print(isSubsequence(stringA, stringB));
});

function isSubsequence(stringA, stringB) {
  let i = 0;
  for (let charB of stringB) {
    const charA = stringA[i];
    if (charA === charB) {
      i++;
    }
    if (i === stringA.length) {
      return CONSTANTS.ANS.TRUE;
    }
  }
  return CONSTANTS.ANS.FALSE;
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
<td>119ms</td>
<td>9.51Mb</td>
</tr>
  </tbody>
</table>