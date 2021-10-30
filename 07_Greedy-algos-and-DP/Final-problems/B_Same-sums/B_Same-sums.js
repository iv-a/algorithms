/*

-- ПРИНЦИП РАБОТЫ --
Задача решается с помощью динамического программирования и сводится к определению возможности разбить множество чисел на два подмножества, в каждом из которых сумма чисел будет равняться половине суммы всего множества.
Создадим матрицу для хранения промеждуточных вычислений размера m * n, где m - количество выигранных партий (число элементов), n - половина от суммы всех очков. Определим, существует ли подмножество набранных очков, такое, что их сумма равнв n.
Если среди scores = [score_1, ..., score_i] существует подмножество, элементы которого в сумме дают j в клетке матрицы DP(i, j) будем хранить True. В противном случае - False.
Тогда ответ к задаче будет храниться в клетке DP(m, n)
Тогда DP(m, n) принимает значение True тогда и только тогда, когда существует подмножество S, сумма которого равна n. Цель нашего алгоритма — вычислить DP(m, n). Для достижения этого мы имеем следующие рекуррентные формулы:
  - DP(i, j) принимает значение True, если либо DP(i - 1, j - score_j) принимает значение True, либо DP(i - 1, j) принимает значение True;
  - DP(i, j) принимает значение False в противном случае;


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
  Пример 1.                             Пример 2.
  Входные данные:                       Входные данные:
  4                                     3
  1 5 7 1                               1 3 10

  Матрица DP:                           Матрица DP:

           │0│1│2│3│4│5│6│7│                     │0│1│2│3│4│5│6│7│
  ──────────────────────────            ──────────────────────────
         []│+│-│-│-│-│-│-│-│                   []│+│-│-│-│-│-│-│-│
  ──────────────────────────            ──────────────────────────
        [1]│+│+│-│-│-│-│-│-│                  [1]│+│+│-│-│-│-│-│-│
  ──────────────────────────            ──────────────────────────
      [1,5]│+│+│-│-│-│+│+│-│                [1,3]│+│+│-│+│+│-│-│-│
  ──────────────────────────            ──────────────────────────
    [1,5,7]│+│+│-│-│-│+│+│+│             [1,3,10]│+│+│-│+│+│-│-│-│
  ──────────────────────────
  [1,5,7,1]│+│+│+│-│-│+│+│+│


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Суммарная временная сложность алгоритма - O(m * n),
где m — количество выигранных партий,
    n — половина от всех очков, заработанных во премя турнира.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пространственная сложность алгоритма - O(n),
где n — половина от всех очков, заработанных во премя турнира.

*/

function solution(numberOfWins, scores) {
  let sum = 0;
  // Вычисляем значение суммы всех набранных очков
  for (let score of scores) {
    sum += score;
  }
  // Проверяем сумму на четность
  if (sum % 2 === 1) {
    return CONSTANTS.ANS.FALSE;
  }
  // Вычисляем половину суммы
  const halfOfSum = sum >> 1;
  // Создаем массив для хранения текущих динамических результатов
  let currentDP = new Array( halfOfSum + 1);
  // Создаем массив для хранения предыдущих динамических результатов
  let previousDP = new Array(halfOfSum + 1);

  for (let i = 0; i <= numberOfWins; i++) {
    for (let j = 0; j <= halfOfSum; j++) {
      if (i === 0 && j > 0) {
        // В пустом множестве не может быть не пустого подмножества
        currentDP[j] = false;
      } else if (j === 0 && i >= 0) {
        // В любом множестве может быть пустое подмножество
        currentDP[j] = true;
      } else {
        if (j - scores[i - 1] >= 0) {
          currentDP[j] = previousDP[j - scores[i - 1]] || previousDP[j];
        } else {
          currentDP[j] = previousDP[j];
        }
      }
    }
    // Поскольку для вычисления currentDP требуется хранить только previousDP, то
    // в конце цикла сохраняем текщие промежуточные значения в качестве предыдущих
    [ previousDP, currentDP ] = [ currentDP, previousDP ]
  }
  // Возвращаем ответ к задаче
  return previousDP[halfOfSum] ? CONSTANTS.ANS.TRUE : CONSTANTS.ANS.FALSE;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfWins, scores;
const DEX = 10;
const CONSTANTS = {
  ANS: {
    TRUE: 'True',
    FALSE: 'False',
  },
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfWins = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    scores = line.split(' ').map((item) => parseInt(item, DEX));
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(numberOfWins, scores));
});