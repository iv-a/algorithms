<h1 align="center">G. Стек - MaxEffective</h1>

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
1.5 секунд
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

Реализуйте класс <code>StackMaxEffective</code>, поддерживающий операцию определения максимума среди элементов в стеке. Сложность операции должна быть <code>O(1)</code>. Для пустого стека операция должна возвращать <code>None</code>. При этом <code>push(x)</code> и <code>pop()</code> также должны выполняться за константное время.

<h2 id="input">Формат ввода</h2>

В первой строке записано одно число <i>n</i> — количество команд, которое не превосходит <i>100000</i>. В следующих <i>n</i> строках идут команды. Команды могут быть следующих видов:

<ul>
<li><code>push(x)</code> — добавить число x в стек;</li>
<li><code>pop()</code> — удалить число с вершины стека;</li>
<li><code>get_max()</code> — напечатать максимальное число в стеке;</li>
</ul>

Если стек пуст, при вызове команды <code>get_max()</code> нужно напечатать «None», для команды <code>pop()</code> — «error».

<h2 id="output">Формат вывода</h2>

Для каждой команды <code>get_max()</code> напечатайте результат её выполнения. Если стек пустой, для команды <code>get_max()</code> напечатайте «None». Если происходит удаление из пустого стека — напечатайте «error».

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
pop
pop
push 4
push -5
push 7
pop
pop
get_max
pop
get_max
</pre>

<h6>Вывод</h6>
<pre>
error
error
4
None
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
get_max
push -6
pop
pop
get_max
push 2
get_max
pop
push -2
push -6
</pre>

<h6>Вывод</h6>
<pre>
None
error
None
2
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
  MESSAGE: {
    ERROR: 'error',
    NONE: 'None',
  },
  COMMAND: {
    PUSH: 'push',
    POP: 'pop',
    GET_MAX: 'get_max',
  }
}

let numberOfCommands;
let stack;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
    stack = new StackMax();
  } else if (_curLine <= numberOfCommands) {
    doCommand(line);
  }
  _curLine++;
});

class StackMax {
  constructor() {
    this.stack = [];
    this.stackMax = [];
  }

  push(item) {
    if (this.stackMax.length) {
      if (this.stackMax[this.stackMax.length - 1] <= item) {
        this.stackMax.push(item);
      }
    } else {
      this.stackMax.push(item);
    }
    this.stack.push(item);
  }

  pop() {
    if (this.stack.length) {
      const res = this.stack.pop();
      if (res === this.stackMax[this.stackMax.length - 1]) {
        this.stackMax.pop();
      }
    } else {
      return print(CONSTANTS.MESSAGE.ERROR);
    }
  }

  getMax() {
    if (this.stackMax.length) {
      print(this.stackMax[this.stackMax.length - 1]);
    } else {
      return print(CONSTANTS.MESSAGE.NONE);
    }
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUSH: {
      stack.push(readInt(item));
      break;
    }
    case CONSTANTS.COMMAND.POP: {
      stack.pop();
      break;
    }
    case CONSTANTS.COMMAND.GET_MAX: {
      stack.getMax();
      break;
    }
  }
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function print(message) {
  process.stdout.write(message.toString() + '\n');
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
<td>468ms</td>
<td>16.79Mb</td>
</tr>
  </tbody>
</table>