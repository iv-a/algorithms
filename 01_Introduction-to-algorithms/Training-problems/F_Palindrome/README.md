<h1 align="center">F. Палиндром</h1>

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

Помогите Васе понять, будет ли фраза палиндромом. Учитываются только буквы и цифры, заглавные и строчные буквы считаются одинаковыми.

Решение должно работать за <i>O(N)</i>, где <i>N</i> — длина строки на входе.

<h2 id="input">Формат ввода</h2>

В единственной строке записана фраза или слово. Буквы могут быть только латинские. Длина текста не превосходит <i>20000</i> символов.

Фраза может состоять из строчных и прописных латинских букв, цифр, знаков препинания.

<h2 id="output">Формат вывода</h2>

Выведите «True», если фраза является палиндромом, и «False», если не является.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
A man, a plan, a canal: Panama
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

Ввод	Вывод
zo
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

const ANS = {
  TRUE: 'True',
  FALSE: 'False'
}

_rl.on('line', (line) => {
  process.stdout.write(isPalindrome(line) + '\n');
});

function isPalindrome(line) {
  const regexp = /\w/g;
  const letters = line.toLowerCase().match(regexp);
  const mid = letters.length >> 1;
  for (let i = 0; i < mid; i++) {
    if (letters[i] !== letters[letters.length - 1 - i]) {
      return ANS.FALSE;
    }
  }
  return ANS.TRUE;
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
<td>62ms</td>
<td>6.24Mb</td>
</tr>
  </tbody>
</table>