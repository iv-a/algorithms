/*

-- ПРИНЦИП РАБОТЫ --
Идея быстрой сортировки заключается в разделении массива на два под-массива, средней линией считается элемент,
который находится в самом центре массива. В ходе работы алгоритма элементы, меньшие чем средний
будут перемещены в лево, а большие в право. Такое же действие будет происходить рекурсивно и
из под-массива, они будут разделяться на еще два под-массива до тех пор, пока не будет
чего разделать (останется один элемент). На выходе получим отсортированный массив.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

Функция partition определяет опорный элемент pivot, беря его из середины массива.

Далее начинается просмотр с левого конца массива, который продолжается до тех пор,
пока не будет найден элемент, превосходящий по значению разделяющий элемент,
затем выполняется просмотр, начиная с правого конца массива, который продолжается до тех пор,
пока не отыскивается элемент, который по значению меньше разделяющего. Оба элемента,
на которых просмотр был прерван, очевидно, находятся не на своих местах в разделенном массиве,
и потому они меняются местами. Так продолжаем дальше, пока не убедимся в том,
что слева от левого указателя не осталось ни одного элемента, который был бы больше по значению
разделяющего, и ни одного элемента справа от правого указателя, которые были бы меньше
по значению разделяющего элемента.

Переменная pivot сохраняет значение разделяющего элемента, a l и r представляет собой, соответственно,
указатели левого и правого просмотра. Цикл разделения увеличивает значение l и уменьшает значение r на 1,
причем условие, что ни один элемент слева от l не больше pivot и ни один элемент справа от r
не меньше pivot, не нарушается. Как только значения указателей пересекаются, процедура разбиения завершается.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Среднее время работы алгоритма быстрой сортировки O(n log n).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Данная реализация не создает новых массивов делением исходного пополам, а лишь запоминает указатели
на границы этих массивов. Поэтому требует лишь O(1) дополнительной памяти.

*/

function efficientQuickSort() {
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

  function swap(array, firstIndex, secondIndex) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  }

  function partition(array, left, right) {
    let mid = ~~((left + right) / 2);
    let pivot = array[mid];

    let l = left, r = right;

    while (l <= r) {
      while (compareFn(array[l], pivot)) {
        l++;
      }

      while (compareFn(pivot, array[r])) {
        r--;
      }

      if (l >= r) break;
      swap(array, l++, r--);
    }
    return r;
  }

  function quickSort(array, left, right) {
    if (left < right) {
      let pivot = partition(array, left, right);
      quickSort(array, left, pivot);
      quickSort(array, pivot + 1, right);
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
    quickSort(participants, 0, participants.length - 1);
    for (let participant of participants) {
      console.log(participant[0]);
    }
  });
}

efficientQuickSort();
