<h1 align="center">A. Пирамидальная сортировка</h1>

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

В данной задаче необходимо реализовать сортировку кучей. При этом кучу необходимо реализовать самостоятельно, использовать имеющиеся в языке реализации нельзя. Сначала рекомендуется решить задачи про просеивание вниз и вверх.

Тимофей решил организовать соревнование по спортивному программированию, чтобы найти талантливых стажёров. Задачи подобраны, участники зарегистрированы, тесты написаны. Осталось придумать, как в конце соревнования будет определяться победитель.

Каждый участник имеет уникальный логин. Когда соревнование закончится, к нему будут привязаны два показателя: количество решённых задач Pi и размер штрафа Fi. Штраф начисляется за неудачные попытки и время, затраченное на задачу.

Тимофей решил сортировать таблицу результатов следующим образом: при сравнении двух участников выше будет идти тот, у которого решено больше задач. При равенстве числа решённых задач первым идёт участник с меньшим штрафом. Если же и штрафы совпадают, то первым будет тот, у которого логин идёт раньше в алфавитном (лексикографическом) порядке.

Тимофей заказал толстовки для победителей и накануне поехал за ними в магазин. В своё отсутствие он поручил вам реализовать алгоритм сортировки кучей (англ. Heapsort) для таблицы результатов.

<h2 id="input">Формат ввода</h2>

В первой строке задано число участников n, 1 ≤ n ≤ 100 000.
В каждой из следующих n строк задана информация про одного из участников.
i-й участник описывается тремя параметрами:

уникальным логином (строкой из маленьких латинских букв длиной не более 20)
числом решённых задач Pi
штрафом Fi
Fi и Pi — целые числа, лежащие в диапазоне от 0 до 109.

<h2 id="output">Формат вывода</h2>

Для отсортированного списка участников выведите по порядку их логины по одному в строке.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
alla 4 100
gena 6 1000
gosha 2 90
rita 2 90
timofey 4 80
</pre>

<h6>Вывод</h6>
<pre>
gena
timofey
alla
gosha
rita
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
5
alla 0 0
gena 0 0
gosha 0 0
rita 0 0
timofey 0 0
</pre>

<h6>Вывод</h6>
<pre>
alla
gena
gosha
rita
timofey
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
/*

-- ПРИНЦИП РАБОТЫ --
Функция heapSort:
 принимает на вход:
  - array -- массив, который необходимо отсортировать
  - compareFn -- функция, определяющая порядок сортировки
 возвращает:
  - отсортированный массив

Алгоритм:
1. Функция sort(array):
1.1. Создаем пустую бинарную кучу heap;
1.2. Проходимся по каждому элементу исходного массива и функцией heapAdd(heap, item) поочередно добавляем их в кучу, сохраняя её свойства;
1.3. Поочередно извлекаем и удаляем из кучи наиболее приоритетные элементы (сохраняя свойства кучи) и добавляем их в номый массив с отсортированными элементами функцией heapGetMaxPriority(heap).
1.4. Возвращаем маассив с отсортированными элементами.

2. Функция heapAdd(heap, item):
2.1. Добавляем в конец кучи heap элемент item;
2.2. Восстанавливаем свойства кучи "просеиванием вверх" добавленного элемента с помощью функции siftUp(heap, idx).

3. Функция siftUp(heap, idx):
3.1. Вычисляем индекс родительского элемента;
3.2. До тех пор, пока индекс родительского элемента не отрицательный и отслеживаемый элемент выше по приоритету чем родительский, в цикле меняем местами отслеживаемый элемент и родительский;

4. Функция heapGetMaxPriority(heap):
4.1. Извлекаем значение с вершины кучи (самое приоритетное) и записываем в переменну result;
4.2. На его место записываем последний элемент кучи;
4.3. Восстанавливаем свойства кучи "просеиванием вниз" оказавшегося на её вершине элемента с помощью функции siftDown(heap, idx);
4.4. Возвращаем значение переменной result.

5. Функция siftDown(heap, idx):
5.1. До тех пор, пока индекс левого дочернего (для отслеживаемого) элемента меньше размера кучи сравниваем приоритетность дочерних элементов:
5.1.1. По умолчанию считаем наиболее приоритетным дочерним элементом (highestPriority) - левый;
5.1.2. Если правый дочерний элемент существует и его приоритетность выше приоритетности левого, то считаем наиболее приоритетным дочерним элементом (highestPriority) - правый.
5.2. Если приоритетность отслеживаемого элемента выше, чем у наиболее приоритетного дочернего (highestPriority), то выходим из цикла.
5.3. Меняем местами отслеживаемый элемент и наиболее приоритетный дочерний.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Пирамидальная сортировка использует бинарную кучу - двоичное дерево, которое соответствует следующим условиям:
  - Ключ в любой вершине не меньше (если куча для максимума), чем значения её потомков. Это свойство гарантирует, что в вершине находится самый приоритетный элемент.
  - На i-ом слое 2^i вершин, кроме последнего. Для последнего слоя это условие может не выполняться. Слои нумеруются с нуля. Это свойство соответствует почти полноте.
  - Все слои, кроме последнего, уже заполнены полностью, в них вообще нет дыр. Последний слой заполняется элементами слева направо. Поэтому все элементы лежат в массиве плотно от начала до конца.
Эти свойства кучи обепечивают корректную работу описанного выше алгоритма.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Худшее время работы алгоритма пирамидальной сортировки - O(n log n), где n - число элементов массива.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Данная реализация не изменяет исходный массив, а создает новый уже отсортированный.
Поэтому память расходуется на хранение не только исходного массива размера n, но нового отсортированного массва такого же размера.
То есть потребуется O(n) дополнительной памяти, где n - число элементов массива.

*/

function heapSort(array, compareFn) {
  function swap(array, firstIdx, secondIdx) {
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
  }

  function siftUp(heap, idx) {
    let parentIdx = (idx - 1) >> 1;
    while (parentIdx >= 0 && compareFn(heap[idx], heap[parentIdx])) {
      swap(heap, idx, parentIdx);
      idx = parentIdx;
      parentIdx = (idx - 1) >> 1;
    }
    return idx;
  }

  function siftDown(heap, idx) {
    const heapSize = heap.length;
    while (2 * idx + 1 < heapSize) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let highestPriority = left;
      if (right < heapSize && compareFn(heap[right], heap[left])) highestPriority = right;
      if (compareFn(heap[idx], heap[highestPriority])) break;
      swap(heap, idx, highestPriority);
      idx = highestPriority;
    }
    return idx;
  }

  function heapAdd(heap, item) {
    heap.push(item);
    siftUp(heap, heap.length - 1);
  }

  function heapGetMaxPriority(heap) {
    const result = heap[0];
    heap[0] = heap.pop();
    siftDown(heap, 0);
    return result;
  }

  function sort(array) {
    const heap = [];
    array.forEach((item) => heapAdd(heap, item));
    const sortedArray = [];
    array.forEach(() => sortedArray.push(heapGetMaxPriority(heap)));
    return sortedArray;
  }

  return sort(array);
}

function solution() {
  const readline = require('readline');
  const io_interface = readline.createInterface({input: process.stdin});

  function compareFn(itemA, itemB) {
    const [ usernameA, solvedTasksA, penaltyA ] = itemA;
    const [ usernameB, solvedTasksB, penaltyB ] = itemB;
    if (solvedTasksA - solvedTasksB > 0) {
      return true;
    } else if (solvedTasksA - solvedTasksB === 0) {
      if (penaltyA - penaltyB > 0) {
        return false;
      } else if (penaltyA - penaltyB === 0) {
        return usernameA < usernameB;
      } else {
        return true
      }
    } else {
      return false;
    }
  }

  let lineNumber = 0;
  let numberOfParticipants;
  const participants = [];

  io_interface.on('line', function (line) {
    if (lineNumber === 0) {
      numberOfParticipants = Number(line);
    } else if (lineNumber < numberOfParticipants + 1) {
      participants.push(line.split(' '));
    }
    lineNumber++;
  });

  io_interface.on('close', function () {
    let sortedParticipants = heapSort(participants, compareFn);
    for (let participant of sortedParticipants) {
      console.log(participant[0]);
    }
  });
}

solution();

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
<td>1.911s</td>
<td>59.04Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>