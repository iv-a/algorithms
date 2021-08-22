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