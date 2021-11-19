<h1 align="center">J. Списочная очередь</h1>

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
0.12 секунд
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

Любимый вариант очереди Тимофея — очередь, написанная с использованием связного списка. Помогите ему с реализацией. Очередь должна поддерживать выполнение трёх команд:

<ul>
<li><code>get()</code> — вывести элемент, находящийся в голове очереди, и удалить его. Если очередь пуста, то вывести «error»</li>
<li><code>put(x)</code> — добавить число x в очередь</li>
<li><code>size()</code> — вывести текущий размер очереди</li>
</ul>

<b>Все операции должны выполняться за O(1).</b>

<h2 id="input">Формат ввода</h2>

В первой строке записано количество команд <i>n</i> — целое число, не превосходящее <i>1000</i>. В каждой из следующих <i>n</i> строк записаны команды по одной строке.

<h2 id="output">Формат вывода</h2>

Выведите ответ на каждый запрос по одному в строке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
put -34
put -23
get
size
get
size
get
get
put 80
size
</pre>

<h6>Вывод</h6>
<pre>
-34
1
-23
0
error
error
1
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
put -66
put 98
size
size
get
get
</pre>

<h6>Вывод</h6>
<pre>
2
2
-66
98
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
9
get
size
put 74
get
size
put 90
size
size
size
</pre>

<h6>Вывод</h6>
<pre>
error
0
74
0
1
1
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
  },
  MESSAGE: {
    ERROR: 'error',
    NONE: 'None',
  },
  COMMAND: {
    GET: 'get',
    PUT: 'put',
    SIZE: 'size',
  }
};


let numberOfCommands, queue;
const result = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
    queue = new ListQueue(readInt(line));
  } else if (_curLine < numberOfCommands) {
    doCommand(line);
  } else if (_curLine === numberOfCommands) {
    doCommand(line);
    process.stdout.write(result.join('\n'));
  }
  _curLine++;
});

class Node {
  constructor(value = null, next = null) {
    this.next = next;
    this.value = value;
  }
}

class ListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.queueSize = 0;
  }

  get() {
    if (this._isEmpty()) {
      result.push(CONSTANTS.MESSAGE.ERROR);
    } else {
      result.push(this.head.value);
      this.head = this.head.next;
      this.queueSize--;
    }
  }

  put(value) {
    let currentTail = this.tail;
    this.tail = new Node(value, null);
    if (this._isEmpty()) {
      this.head = this.tail;
    } else {
      currentTail.next = this.tail;
    }
    this.queueSize++;
  }

  size() {
    result.push(this.queueSize);
  }

  _isEmpty() {
    return this.queueSize === 0;
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUT: {
      queue.put(item);
      break;
    }
    case CONSTANTS.COMMAND.GET: {
      queue.get();
      break;
    }
    case CONSTANTS.COMMAND.SIZE: {
      queue.size();
      break;
    }
  }
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function print(message) {
  process.stdout.write(message + '\n');
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
<td>80ms
</td>
<td>6.52Mb</td>
</tr>
  </tbody>
</table>