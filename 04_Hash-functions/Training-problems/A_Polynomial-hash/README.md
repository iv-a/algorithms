<h1 align="center">A. Полиномиальный хеш</h1>

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

Алле очень понравился алгоритм вычисления полиномиального хеша. Помогите ей написать функцию, вычисляющую хеш строки s. В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Полиномиальный хеш считается по формуле:
<img src="./pic.png">

<h2 id="input">Формат ввода</h2>

В первой строке дано число <i>a</i> (<i>1 ≤ a ≤ 1000</i>) –— основание, по которому считается хеш.

Во второй строке дано число <i>m</i> (<i>1 ≤ m ≤ 10<sup>9</sup></i>) –— модуль.

В третьей строке дана строка <i>s</i> (<i>0 ≤ |s| ≤ 10<sup>6</sup></i>), состоящая из больших и маленьких латинских букв.

<h2 id="output">Формат вывода</h2>

Выведите целое неотрицательное число –— хеш заданной строки.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
123
100003
a
</pre>

<h6>Вывод</h6>
<pre>
97
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
123
100003
hash
</pre>

<h6>Вывод</h6>
<pre>
6080
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
123
100003
HaSH
</pre>

<h6>Вывод</h6>
<pre>
56156
</pre>
</ul>

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

let base, mod, string;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    base = getInt(line);
  } else if (_curLine === 1) {
    mod = getInt(line);
  } else if (_curLine === 2) {
    string = line;
    _rl.close()
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getPolynomialHash(base, mod, string));
})

function getPolynomialHash(base, mod, string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash * base + string.codePointAt(i)) % mod;
  }
  return hash;
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
<td>100ms</td>
<td>9.01Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>