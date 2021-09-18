// ID успешной посылки - 52918373

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
