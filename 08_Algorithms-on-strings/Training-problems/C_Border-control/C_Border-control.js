// function getLevenshteinDistance(stringA, stringB) {
//   // Определяем самую длинную и самую короткую строки
//   const [ longestString, shortestString ] =
//     stringA.length > stringB.length ? [ stringA, stringB ] : [ stringB, stringA ];
//   if (longestString.length - shortestString.length > 1) {
//     return ANS.FAIL;
//   }
//   // Создаем массив для хранения текущих динамических результатов
//   let currentDP = new Array(shortestString + 1);
//   // Создаем массив для хранения предыдущих динамических результатов
//   let previousDP = new Array(shortestString + 1);
//
//   for (let i = 0; i <= longestString.length; i++) {
//     let min;
//     for (let j = 0; j <= shortestString.length; j++) {
//       if (i === 0 && j === 0) {
//         // Если обе строки пустые, то расстояние Левенштейна равно нулю
//         currentDP[j] = 0;
//         min = currentDP[j];
//       } else if (i === 0 && j > 0) {
//         // Если бОльшая строка пустая, то расстояние Левенштейна равно длине меньшей строки
//         currentDP[j] = j;
//       } else if (j === 0 && i > 0) {
//         // Если меньшая строка пустая, то расстояние Левенштейна равно длине большей строки
//         currentDP[j] = i;
//         min = currentDP[j];
//       } else if (longestString[i - 1] === shortestString[j - 1]) {
//         // Если символы равны, то совершать атомарные преобразования не требуется,
//         // значит расстояние Левенштейна не изменилось
//         currentDP[j] = previousDP[j - 1];
//       } else if (i > 0 && j > 0 && longestString[i - 1] !== shortestString[j - 1]) {
//         // Если строки не нулевые и их соответствующие символы не равны, то
//         // Расстояние Левенштейна определяется минимальным из трех значений
//         // (добавление, удаление или замена соответствующего символа)
//         currentDP[j] = Math.min(currentDP[j - 1] + 1, previousDP[j] + 1, previousDP[j - 1] + 1);
//       }
//       if (currentDP[j] < min) {
//         min = currentDP[j];
//       }
//       // console.log(currentDP[j]);
//       // if (currentDP[j] >= 1) break;
//     }
//     if (min > 1) {
//       return ANS.FAIL;
//     }
//     // Поскольку для вычисления currentDP требуется хранить только previousDP, то
//     // в конце цикла сохраняем текщие промежуточные значения в качестве предыдущих
//     [ previousDP, currentDP ] = [ currentDP, previousDP ]
//   }
//   // Возвращаем расстояние между строками
//   return previousDP[shortestString.length] > 1 ? ANS.FAIL : ANS.OK;
// }

function solution(stringA, stringB) {
  const [ longestString, shortestString ] =
    stringA.length > stringB.length ? [ stringA, stringB ] : [ stringB, stringA ];
  if (longestString.length - shortestString.length > 1) {
    return ANS.FAIL;
  }
  if (longestString.length === shortestString.length) {
    let fails = 0;
    for (let i = 0; i < longestString.length; i++) {
      if (longestString[i] !== shortestString[i]) {
        fails += 1;
      }
    }
    return fails > 1 ? ANS.FAIL : ANS.OK;
  } else {
    for (let i = 0; i < longestString.length; i++) {
      if (longestString[i] !== shortestString[i] && longestString[i + 1] !== shortestString[i]) {
        return ANS.FAIL;
      }
    }
  }
  return ANS.OK;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let stringA, stringB;
const ANS = {
  OK: 'OK',
  FAIL: 'FAIL',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    stringA = line;
  } else if (lineNumber === 1) {
    stringB = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(stringA, stringB));
});
