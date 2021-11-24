<h1 align="center">D. Печеньки</h1>

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
0.15 секунд
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

К Васе в гости пришли одноклассники. Его мама решила угостить ребят печеньем.

Но не всё так просто. Печенья могут быть разного размера. А у каждого ребёнка есть фактор жадности —– минимальный размер печенья, которое он возьмёт. Нужно выяснить, сколько ребят останутся довольными в лучшем случае, когда они действуют оптимально.

Каждый ребёнок может взять не больше одного печенья.

<h2 id="input">Формат ввода</h2>

В первой строке записано n —– количество детей.

Во второй —– n чисел, разделённых пробелом, каждое из которых –— фактор жадности ребёнка. Это натуральные числа, не превосходящие 1000.

В следующей строке записано число m –— количество печенек.

Далее —– m натуральных чисел, разделённых пробелом —– размеры печенек. Размеры печенек не превосходят 1000.

Оба числа n и m не превосходят 10000.

<h2 id="output">Формат вывода</h2>

Нужно вывести одно число –— количество детей, которые останутся довольными

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
2
1 2
3
2 1 3
</pre>

<h6>Вывод</h6>
<pre>
2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
2 1 3
2
1 1
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

let kidsNumber, greedFactor, cookiesNumber, cookies;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    kidsNumber = getInt(line);
  } else if (_curLine === 1) {
    greedFactor = getArrayOfInt(line);
  } else if (_curLine === 2) {
    cookiesNumber = getInt(line);
  } else if (_curLine === 3) {
    cookies = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(happyKidsCount(kidsNumber, greedFactor, cookiesNumber, cookies));
})

function compareFn(a, b) {
  return a - b;
}

function happyKidsCount(kidsNumber, greedFactor, cookiesNumber, cookies) {
  greedFactor.sort(compareFn);
  cookies.sort(compareFn);
  let kid = 0, cookie = 0;
  let happyKidsNumber = 0;

  while (kid < kidsNumber && cookie < cookiesNumber) {
    if (greedFactor[kid] <= cookies[cookie]) {
      happyKidsNumber++;
      kid++;
      cookie++;
    } else {
      cookie++;
    }
  }
  return happyKidsNumber;
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
<td>82ms</td>
<td>7.05Mb</td>
</tr>
  </tbody>
</table>