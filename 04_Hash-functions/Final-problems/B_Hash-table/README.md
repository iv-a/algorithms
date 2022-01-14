<h1 align="center">B. Хеш-таблица</h1>

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
5 секунд
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
256Mb
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

Тимофей, как хороший руководитель, хранит информацию о зарплатах своих сотрудников в базе данных и постоянно её обновляет. Он поручил вам написать реализацию хеш-таблицы, чтобы хранить в ней базу данных с зарплатами сотрудников.

Хеш-таблица должна поддерживать следующие операции:

put key value —– добавление пары ключ-значение. Если заданный ключ уже есть в таблице, то соответствующее ему значение обновляется.
get key –— получение значения по ключу. Если ключа нет в таблице, то вывести «None». Иначе вывести найденное значение.
delete key –— удаление ключа из таблицы. Если такого ключа нет, то вывести «None», иначе вывести хранимое по данному ключу значение и удалить ключ.
В таблице хранятся уникальные ключи.

Требования к реализации:

Нельзя использовать имеющиеся в языках программирования реализации хеш-таблиц (std::unordered_map в С++, dict в Python, HashMap в Java, и т. д.)
Число хранимых в таблице ключей не превосходит 105.
Разрешать коллизии следует с помощью метода цепочек или с помощью открытой адресации.
Все операции должны выполняться за O(1) в среднем.
Поддерживать рехеширование и масштабирование хеш-таблицы не требуется.
Ключи и значения, id сотрудников и их зарплата, —– целые числа. Поддерживать произвольные хешируемые типы не требуется.

<h2 id="input">Формат ввода</h2>

В первой строке задано общее число запросов к таблице n (1≤ n≤ 106).

В следующих n строках записаны запросы, которые бывают трех видов –— get, put, delete —– как описано в условии.

Все ключи и значения –— целые неотрицательные числа, не превосходящие 109.

<h2 id="output">Формат вывода</h2>

На каждый запрос вида get и delete выведите ответ на него в отдельной строке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
10
get 1
put 1 10
put 2 4
get 1
get 2
delete 2
get 2
put 1 5
get 1
delete 2
</pre>

<h6>Вывод</h6>
<pre>
None
10
4
4
None
5
None
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
8
get 9
delete 9
put 9 1
get 9
put 9 2
get 9
put 9 3
get 9
</pre>

<h6>Вывод</h6>
<pre>
None
None
1
2
3
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
/*
-- ПРИНЦИП РАБОТЫ --
Реализована хеш-таблица с целочисленными ключами, в которой в качестве способа разрешения коллизий
используется метод открытой адресации, для решения проблемы кластеризации используется пробирование методом
двойного хеширования, а номер корзины вычисляется методом умножения.

У объектов класса HashTable имеются следующие поля:
  - CONSTANTS -- содержит константы:
    - ALPHA_ANALOG -- константа Alpha из формулы вычисления номеры корзины методом умножения заменяется на схожую
                      по значению дробь Alpha = ALPHA_ANALOG / (2^32) для того, чтобы можно было использовать быструю
                      целочисленную арифметику.
                      https://practicum.yandex.ru/learn/algorithms/courses/7f101a83-9539-4599-b6e8-8645c3f31fad/sprints/3890/topics/618173c7-3c0e-4955-b88b-d7146f9ffe2e/lessons/db4e40bc-75c2-4302-95ae-e9cc04f86546/
                      (самый конец страницы, на синем фоне)

    - POWER_OF_TWO -- степень двойки, выбранная так, чтобы 2^POWER_OF_TWO было больше максимального числа хранимых
                      в таблице ключей (по условию число хранимых в таблице ключей не превосходит 10^5);

  - NUMBER_OF_BUCKETS -- число корзин в таблице;
  - buckets -- массив корзин;
  - deletedBuckets -- массив, равный по величине массиву buckets, необходимый для поддержки операции удаления.
                      В соответствии с индексом удаляемой корзины массива buckets, в соответствующую ячейку
                      массива deleted ставится отметка true, помечающая элемент как удаленный.

Метод put:
1. Двумя назависимыми функциями _hashFunction1 и _hashFunction2 вычисляются хеши hash_1 и hash_2 ключа key.
2. Вычисляются номера корзин bucket и space методом умножения для полученных хешей.
3. В цикле проверяем корзину с индексом bucket.
4а. Если корзина пуста, или ее содержимое помеченно как удаленное, или если ключи равны, то в карзину записывается
    соответствующее значение. При этом отметка в deleted снимается.
4b. Иначе вычисляется новое значение bucket как сумма bucket и space, взятая по модулю размера таблицы. Возврат к шагу 3.

Метод get:
1. Двумя назависимыми функциями _hashFunction1 и _hashFunction2 вычисляются хеши hash_1 и hash_2 ключа key.
2. Вычисляются номера корзин bucket и space методом умножения для полученных хешей.
3. В цикле проверяем корзину с индексом bucket.
4а. Если корзина не пуста:
  5a. Если ключи равны и корзина не помечена как удаленная, то возвращаем значение этой корзины.
  5b. Иначе вычисляется новое значение bucket как сумма bucket и space, взятая по модулю размера таблицы. Возврат к шагу 3.
4b. Если корзина пуста, то возвращаем 'None'.
6. Если карзина с таким ключом не найдена, вовозвращаем 'None'.

Метод delete:
1. Двумя назависимыми функциями _hashFunction1 и _hashFunction2 вычисляются хеши hash_1 и hash_2 ключа key.
2. Вычисляются номера корзин bucket и space методом умножения для полученных хешей.
3. В цикле проверяем корзину с индексом bucket.
4а. Если корзина не пуста:
  5a. Если ключи равны и корзина не помечена как удаленная, то помечаем эту корзину как уделенная и возвращаем значение этой корзины.
  5b. Иначе вычисляется новое значение bucket как сумма bucket и space, взятая по модулю размера таблицы. Возврат к шагу 3.
4b. Если корзина пуста, то возвращаем 'None'.
6. Если карзина с таким ключом не найдена, вовозвращаем 'None'.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Двойное хеширование, за счёт того, что вероятность совпадения значений сразу двух независимых хеш-функций ниже, чем одной,
и вычисление номера корзины методом умножения с использованием числа, обратного золотому сечению,
позволяет существенно снизить вероятность возникновения коллизий.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Операции вставки, удаления и поиска в лучшем случае выполняются за O(1), в худшем — за O(m), где m - размер таблицы.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Данная реализация хеш-таблицы не поддерживает масштабирование, размер таблицы постоянный.
Независимо от количества добавленных в хеш-таблицу элементов, реализация содержит 2 массива, каждый размером 2^17.
Поэтому пространственная сложность O(1).



*/

class HashTable {
  constructor() {
    this.CONSTANTS = {
      ALPHA_ANALOG: 2654435769,
      POWER_OF_TWO: 17,
      HASH_CONSTANT: 131101,
      BIT_NUMBER: 32,
      NONE: 'None',
    };
    this.NUMBER_OF_BUCKETS = Math.pow(2, this.CONSTANTS.POWER_OF_TWO);
    this.buckets = new Array(this.NUMBER_OF_BUCKETS);
    this.deletedBuckets = new Array(this.NUMBER_OF_BUCKETS);
  }

  _hashFunction1(key) {
    return key % this.NUMBER_OF_BUCKETS;
  }

  _hashFunction2(key) {
    return key % (this.NUMBER_OF_BUCKETS - this.CONSTANTS.HASH_CONSTANT) + this.CONSTANTS.HASH_CONSTANT;
  }

  _getBucket(hash) {
    return (hash * this.CONSTANTS.ALPHA_ANALOG) % Math.pow(2, this.CONSTANTS.BIT_NUMBER) >>>
      (this.CONSTANTS.BIT_NUMBER - this.CONSTANTS.POWER_OF_TWO);
  }

  put(item) {
    let hash_1 = this._hashFunction1(item.key);
    let hash_2 = this._hashFunction2(item.key);
    let bucket = this._getBucket(hash_1);
    let space = this._getBucket(hash_2);
    for (let i = 0; i < this.NUMBER_OF_BUCKETS; i++) {
      if (this.buckets[bucket] === undefined || this.deletedBuckets[bucket] || this.buckets[bucket].key === item.key) {
        this.buckets[bucket] = item;
        this.deletedBuckets[bucket] = false;
        return
      }
      bucket = (bucket + space) % this.NUMBER_OF_BUCKETS;
    }
  }

  get(key) {
    let hash_1 = this._hashFunction1(key);
    let hash_2 = this._hashFunction2(key);
    let bucket = this._getBucket(hash_1);
    let space = this._getBucket(hash_2);
    for (let i = 0; i < this.NUMBER_OF_BUCKETS; i++) {
      if (this.buckets[bucket] !== undefined) {
        if (this.buckets[bucket].key === key && !this.deletedBuckets[bucket]) {
          return this.buckets[bucket].value;
        }
      } else {
        return this.CONSTANTS.NONE;
      }
      bucket = (bucket + space) % this.NUMBER_OF_BUCKETS;
    }
    return this.CONSTANTS.NONE;
  }

  delete(key) {
    let hash_1 = this._hashFunction1(key);
    let hash_2 = this._hashFunction2(key);
    let bucket = this._getBucket(hash_1);
    let space = this._getBucket(hash_2);
    for (let i = 0; i < this.NUMBER_OF_BUCKETS; i++) {
      if (this.buckets[bucket] !== undefined) {
        if (this.buckets[bucket].key === key && !this.deletedBuckets[bucket]) {
          this.deletedBuckets[bucket] = true;
          return this.buckets[bucket].value;
        }
      } else {
        return this.CONSTANTS.NONE;
      }
      bucket = (bucket + space) % this.NUMBER_OF_BUCKETS;
    }
    return this.CONSTANTS.NONE;
  }
}

const OPERATION = {
  PUT: 'put',
  GET: 'get',
  DELETE: 'delete',
};

function runCommand(hashTable, command, answer) {
  const method = command[0];
  const value = {
    key: command[1],
    value: command[2],
  };

  if (method === OPERATION.PUT) {
    hashTable.put(value);
  } else if (method === OPERATION.GET) {
    answer.push(hashTable.get(value.key));
  } else if (method === OPERATION.DELETE) {
    answer.push(hashTable.delete(value.key));
  }
}

function solution(data) {
  const [ numberOfCommands, ...commands ] = data;
  const answer = [];
  const hashTable = new HashTable();
  for (let i = 0; i < numberOfCommands; i++) {
    runCommand(hashTable, commands[i].split(' '), answer);
  }
  return answer.join('\n');
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

const input = [];

io_interface.on('line', function (line) {
  input.push(line);
});

io_interface.on('close', function () {
  process.stdout.write(solution(input));
});
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
<td>2.676s</td>
<td>209.86Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>