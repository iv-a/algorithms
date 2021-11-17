<h1 align="center">I. Ограниченная очередь</h1>

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

Астрологи объявили день очередей ограниченного размера. Тимофею нужно написать класс <code>MyQueueSized</code>, который принимает параметр <code>max_size</code>, означающий максимально допустимое количество элементов в очереди.

Помогите ему —– реализуйте программу, которая будет эмулировать работу такой очереди. Функции, которые надо поддержать, описаны в формате ввода.

<h2 id="input">Формат ввода</h2>

В первой строке записано одно число — количество команд, оно не превосходит <i>5000</i>.
Во второй строке задан максимально допустимый размер очереди, он не превосходит <i>5000</i>.
Далее идут команды по одной на строке. Команды могут быть следующих видов:

<ul>
<li><code>push(x)</code> — добавить число <i>x</i> в очередь;</li>
<li><code>pop()</code> — удалить число из очереди и вывести на печать;</li>
<li><code>peek()</code> — напечатать первое число в очереди;</li>
<li><code>size()</code> — вернуть размер очереди;</li>
</ul>

При превышении допустимого размера очереди нужно вывести «error». При вызове операций <code>pop()</code> или <code>peek()</code> для пустой очереди нужно вывести «None».

<h2 id="output">Формат вывода</h2>

Напечатайте результаты выполнения нужных команд, по одному на строке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
2
peek
push 5
push 2
peek
size
size
push 1
size
</pre>

<h6>Вывод</h6>
<pre>
None
5
2
2
error
2
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
1
push 1
size
push 3
size
push 1
pop
push 1
pop
push 3
push 3
</pre>

<h6>Вывод</h6>
<pre>
1
error
1
error
1
1
error
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
    PEEK: 'peek',
    SIZE: 'size',
  }
}


let numberOfCommands, maxSize, queue;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
  } else if (_curLine === 1) {
    maxSize = readInt(line);
    queue = new LimitedQueue(readInt(line));
  } else if (_curLine < numberOfCommands + 2) {
    doCommand(line);
  }
  _curLine++;
});

class LimitedQueue {
  constructor(maxSize) {
    this.queue = new Array(maxSize);
    this.maxSize = maxSize;
    this.head = 0;
    this.tail = 0;
    this.queueSize = 0;
  }

  _isEmpty() {
    return this.queueSize === 0;
  }

  push(item) {
    if (this.queueSize !== this.maxSize) {
      this.queue[this.tail] = item;
      this.tail = (this.tail + 1) % this.maxSize;
      this.queueSize += 1;
    } else {
      print(CONSTANTS.MESSAGE.ERROR);
    }
  }

  pop() {
    if (this._isEmpty()) {
      print(CONSTANTS.MESSAGE.NONE);
    } else {
      const item = this.queue[this.head];
      this.head = (this.head + 1) % this.maxSize;
      this.queueSize--;
      print(item);
    }
  }

  peek() {
    if (this._isEmpty()) {
      print(CONSTANTS.MESSAGE.NONE);
    } else {
      print(this.queue[this.head]);
    }
  }

  size() {
    print(this.queueSize);
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUSH: {
      queue.push(readInt(item));
      break;
    }
    case CONSTANTS.COMMAND.POP: {
      queue.pop();
      break;
    }
    case CONSTANTS.COMMAND.PEEK: {
      queue.peek();
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
<td>80ms
</td>
<td>6.52Mb</td>
</tr>
  </tbody>
</table>