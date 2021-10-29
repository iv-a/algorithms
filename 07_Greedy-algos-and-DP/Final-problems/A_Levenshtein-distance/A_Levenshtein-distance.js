/*

-- ПРИНЦИП РАБОТЫ --
Решение основано на алгоритме Вагнера — Фишера.
Алгоритм вычисляет расстояние по Левенштейну основании наблюдения, что если мы зарезервируем матрицу для хранения расстояний редактирования между всеми префиксами первой строки и всеми префиксами второй строки, тогда мы сможем вычислить значения в матрице путем заполнения матрицы и, таким образом, найти расстояние между двумя полными строками как последнее вычисленное значение.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Инвариант заключается в том, что мы можем преобразовать начальный сегмент stingA[1..i] в stingB[1..j] с использованием минимум операций dp[i, j]. Этот инвариант выполняется, поскольку:
  - Изначально он истинен для строки и столбца 0, потому что stingA[1..i] может быть преобразовано в пустую строку stingB[1..0] просто отбросив все символы i. Точно так же мы можем преобразовать stingA[1..0] в stingB[1..j], просто добавив все символы j.
  - Если stingA[i] = stingB[j], и мы можем преобразовать stingA[1..i-1] в stingB[1..j-1] в k операций, то мы можем сделать то же самое с stingA[1..i] и просто оставить последний символ в покое, дав k операций .
  - В противном случае расстояние будет минимальным из трех возможных способов выполнить преобразование:
    -- Если мы можем преобразовать stingA[1..i] в stingB[1..j-1] в k операциях, тогда мы можем просто добавить stingB[j] после этого, чтобы получить stingB[1..j ] в k + 1 операциях (вставка).
    -- Если мы можем преобразовать stingA[1..i-1] в stingB[ 1..j] в k операциях, тогда мы можем удалить stingA[i] , а затем выполнить то же преобразование, всего k + 1 операции (удаление).
    -- Если мы можем преобразовать stingA[1..i-1] в stingB[1..j-1] в k операций, то мы можем сделать то же самое с stingA[1..i] и заменить исходный stingA[i] на stingB[j] затем, всего k + 1 операций (подстановка).
  - Операции, необходимые для преобразования stingA[1..n] в stingB[1..m] - это, конечно, число, необходимое для преобразования всего stingA во все stingB , и поэтому dp[n, m ] содержит наш результат.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Суммарная временная сложность алгоритма - O(N * M),
где N — длина первой строки,
    M — длина второй строки.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пространственная сложность алгоритма - O(N),
где N — длина самой короткой из строк.

*/

// Функция вычисления расстояния по Левенштейну
function getLevenshteinDistance(stringA, stringB) {
  // Определяем самую длинную и самую короткую строки
  const [ longestString, shortestString ] =
    stringA.length > stringB.length ? [ stringA, stringB ] : [ stringB, stringA ];
  // Создаем массив для хранения текущих динамических результатов
  let currentDP = new Array(shortestString + 1);
  // Создаем массив для хранения предыдущих динамических результатов
  let previousDP = new Array(shortestString + 1);

  for (let i = 0; i <= longestString.length; i++) {
    for (let j = 0; j <= shortestString.length; j++) {
      if (i === 0 && j === 0) {
        // Если обе строки пустые, то расстояние Левенштейна равно нулю
        currentDP[j] = 0;
      } else if (i === 0 && j > 0) {
        // Если бОльшая строка пустая, то расстояние Левенштейна равно длине меньшей строки
        currentDP[j] = j;
      } else if (j === 0 && i > 0) {
        // Если меньшая строка пустая, то расстояние Левенштейна равно длине большей строки
        currentDP[j] = i;
      } else if (longestString[i - 1] === shortestString[j - 1]) {
        // Если символы равны, то совершать атомарные преобразования не требуется,
        // значит расстояние Левенштейна не изменилось
        currentDP[j] = previousDP[j - 1];
      } else if (i > 0 && j > 0 && longestString[i - 1] !== shortestString[j - 1]) {
        // Если строки не нулевые и их соответствующие символы не равны, то
        // Расстояние Левенштейна определяется минимальным из трех значений
        // (добавление, удаление или замена соответствующего символа)
        currentDP[j] = Math.min(currentDP[j - 1] + 1, previousDP[j] + 1, previousDP[j - 1] + 1);
      }
    }
    // Поскольку для вычисления currentDP требуется хранить только previousDP, то
    // в конце цикла сохраняем текщие промежуточные значения в качестве предыдущих
    [ previousDP, currentDP ] = [ currentDP, previousDP ]
  }
  // Возвращаем расстояние между строками
  return previousDP[shortestString.length];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let stringA, stringB;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    stringA = line;
  } else if (lineNumber === 1) {
    stringB = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(getLevenshteinDistance(stringA, stringB));
});
