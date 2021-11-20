<h1 align="center">A. Дек</h1>

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

Гоша реализовал структуру данных Дек, максимальный размер которого определяется заданным числом. Методы <code>push_back(x)</code>, <code>push_front(x)</code>, <code>pop_back()</code>, <code>pop_front()</code> работали корректно. Но, если в деке было много элементов, программа работала очень долго. Дело в том, что не все операции выполнялись за <i>O(1)</i>. Помогите Гоше! Напишите эффективную реализацию.

<b>Внимание: при реализации используйте кольцевой буфер.</b>

<h2 id="input">Формат ввода</h2>

В первой строке записано количество команд <i>n</i> — целое число, которое не превосходит <i>100 000</i>. Во второй строке записано число <i>m</i> — максимальный размер дека. Он не превосходит <i>50 000</i>.
В следующих <i>n</i> строках записана одна из команд:

<ul>
<li><code>push_back(value)</code> — добавить элемент в конец дека. Если в деке уже находится максимальное число элементов, вывести «error».</li>
<li><code>push_front(value)</code> — добавить элемент в начало дека. Если в деке уже находится максимальное число элементов, вывести «error».</li>
<li><code>pop_front()</code> — вывести первый элемент дека и удалить его. Если дек был пуст, то вывести «error».</li>
<li><code>pop_back()</code> — вывести последний элемент дека и удалить его. Если дек был пуст, то вывести «error».</li>
</ul>

<code>Value</code> — целое число, по модулю не превосходящее <i>1000</i>.

<h2 id="output">Формат вывода</h2>

Выведите результат выполнения каждой команды на отдельной строке. Для успешных запросов <code>push_back(x)</code> и <code>push_front(x)</code> ничего выводить не надо.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
4
push_front 861
push_front -819
pop_back
pop_back
</pre>

<h6>Вывод</h6>
<pre>
861
-819
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
7
10
push_front -855
push_front 0
pop_back
pop_back
push_back 844
pop_back
push_back 823
</pre>

<h6>Вывод</h6>
<pre>
-855
0
844
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
6
push_front -201
push_back 959
push_back 102
push_front 20
pop_front
pop_back
</pre>

<h6>Вывод</h6>
<pre>
20
102
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
/*

-- ПРИНЦИП РАБОТЫ --
Дек реализован на кольцевом буфере на основе массива константной длины.
У объектов класса Deque имеются следующие поля:
  - maxDequeSize -- максимально возможное количество элементов в деке;
  - front -- индекс начала дека;
  - back -- индекс конца дека (указывает на ;
  - dequeSize -- текущий размер дека.

Если в деке есть свободное место (текущий размер дека не равен максимально возможному), то:
  # Метод pushFront записывает в массив элемент по новому индексу начала дека,
    полученному путем уменьшения front на единицу и взятому по модулю maxDequeSize.
    При этом dequeSize увеличивается на единицу.
  # Метод pushBack записывает в массив элемент по индксу back. После добавлления
    значение back увеличивается на единицу и берется по модулю maxDequeSize.
    При этом dequeSize увеличивается на единицу.
Иначе выводится сообщение об ошибке.

Если дек не пустой (текущий размер дека не равен 0), то:
  # Метод popFront извлекает элемент по индексу front, после чего front
    увеличивается на единицу и берется по модулю maxDequeSize.
    При этом dequeSize уменьшается на единицу.
  # Метод popBack извлекает из массива элемент по новому индексу конца дека,
    полученному путем уменьшения back на единицу и взятому по модулю maxDequeSize.
    При этом dequeSize уменьшается на единицу.
Иначе выводится сообщение об ошибке.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В реализации обработаны случаи переполнения дека и изъятия из пустого дека.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление и в начало дека и в конец стоит O(1),
потому что запись значения в массив фиксированного размера стоит O(1).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Поскольку массив константной длины, то дек будет потреблять O(1) памяти.

*/

class Deque {
  constructor(maxDeckSize) {
    this.deque = new Array(maxDeckSize);
    this.maxDequeSize = maxDeckSize;
    this.front = 0;
    this.back = 0;
    this.dequeSize = 0;
  }

  _isNotFull() {
    return this.dequeSize !== this.maxDequeSize;
  }

  _isEmpty() {
    return this.dequeSize === 0;
  }

  pushFront(value) {
    if (this._isNotFull()) {
      this.front = (this.front - 1 + this.maxDequeSize) % this.maxDequeSize;
      this.deque[this.front] = value;
      this.dequeSize += 1;
    } else {
      console.log('error');
    }
  }

  pushBack(value) {
    if (this._isNotFull()) {
      this.deque[this.back] = value;
      this.back = (this.back + 1) % this.maxDequeSize;
      this.dequeSize += 1;
    } else {
      console.log('error');
    }
  }

  popBack() {
    if (this._isEmpty()) {
      return 'error';
    } else {
      this.back = (this.back - 1 + this.maxDequeSize) % this.maxDequeSize;
      let back = this.deque[this.back];
      this.deque[this.back] = undefined;
      this.dequeSize -= 1;
      return back;
    }
  }

  popFront() {
    if (this._isEmpty()) {
      return 'error';
    } else {
      let front = this.deque[this.front];
      this.deque[this.front] = undefined;
      this.front = (this.front + 1) % this.maxDequeSize;
      this.dequeSize -= 1;
      return front;
    }
  }
}

function A_Deque() {
  const readline = require('readline');
  const io_interface = readline.createInterface({input: process.stdin});

  const OPERATION = {
    PUSH_FRONT: 'push_front',
    PUSH_BACK: 'push_back',
    POP_FRONT: 'pop_front',
    POP_BACK: 'pop_back',
  };

  function runCommand(deque, command) {
    const [method, value = undefined] = command;

    if (method === OPERATION.PUSH_FRONT) {
      deque.pushFront(Number(value));
    } else if (method === OPERATION.PUSH_BACK) {
      deque.pushBack(Number(value));
    } else if (method === OPERATION.POP_FRONT) {
      console.log(deque.popFront());
    } else if (method === OPERATION.POP_BACK) {
      console.log(deque.popBack());
    }
  }

  let lineNumber = 0;
  let numberOfCommands, deque, maxDequeSize;

  io_interface.on('line', function (line) {
    if (lineNumber === 0) {
      numberOfCommands = Number(line);
    } else if (lineNumber === 1) {
      maxDequeSize = Number(line);
      deque = new Deque(maxDequeSize);
    } else if (lineNumber <= numberOfCommands + 2) {
      runCommand(deque, line.split(' '));
    }
    lineNumber++;
  });
}

A_Deque();
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
<td>186ms</td>
<td>10.32Mb</td>
</tr>
  </tbody>
</table>