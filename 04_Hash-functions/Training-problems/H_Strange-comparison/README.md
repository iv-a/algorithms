<h1 align="center">H. Странное сравнение</h1>

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

Жители Алгосского архипелага придумали новый способ сравнения строк. Две строки считаются равными, если символы одной из них можно заменить на символы другой так, что первая строка станет точной копией второй строки. При этом необходимо соблюдение двух условий:

* Порядок вхождения символов должен быть сохранён.
* Одинаковым символам первой строки должны соответствовать одинаковые символы второй строки. Разным символам —– разные.

Например, если строка _s = «abacaba»_, то ей будет равна строка _t = «xhxixhx»_, так как все вхождения _«a»_ заменены на _«x»_, _«b»_ –— на _«h»_, а _«c»_ –— на _«i»_. Если же первая строка _s=«abc»_, а вторая _t=«aaa»_, то строки уже не будут равны, так как разные буквы первой строки соответствуют одинаковым буквам второй.

<h2 id="input">Формат ввода</h2>

В первой строке записана строка <i>s</i>, во второй –— строка <i>t</i>. Длины обеих строк не превосходят <i>10<sup>6</sup></i>. Обе строки содержат хотя бы по одному символу и состоят только из маленьких латинских букв.

Строки могут быть разной длины.

<h2 id="output">Формат вывода</h2>

Выведите «YES», если строки равны (согласно вышеописанным правилам), и «NO» в ином случае.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
mxyskaoghi
qodfrgmslc
</pre>

<h6>Вывод</h6>
<pre>
YES
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
agg
xdd
</pre>

<h6>Вывод</h6>
<pre>
YES
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
agg
xda
</pre>

<h6>Вывод</h6>
<pre>
NO
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
  },
  ANS: {
    TRUE: 'YES',
    FALSE: 'NO',
  },
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
  console.log(areStringsEqual(stringA, stringB));
})

function areStringsEqual(stringA, stringB) {
  if (stringA.length !== stringB.length) {
    return CONST.ANS.FALSE;
  }
  const alphaBetA = new Map();
  const alphaBetB = new Map();
  let idxA = 0, idxB = 0;

  for (let i = 0; i < stringA.length; i++) {
    const symbolA = stringA[i]
    const codeA = alphaBetA.get(symbolA);
    if (codeA === undefined) {
      alphaBetA.set(symbolA, idxA);
      idxA++;
    }

    const symbolB = stringB[i]
    const codeB = alphaBetB.get(symbolB);
    if (codeB === undefined) {
      alphaBetB.set(symbolB, idxB);
      idxB++;
    }

    if (codeA !== codeB || idxA !== idxB) {
      return CONST.ANS.FALSE;
    }
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
<td>154ms</td>
<td>10.57Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>