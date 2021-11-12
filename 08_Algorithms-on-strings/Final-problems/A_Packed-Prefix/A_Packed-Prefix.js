/*

-- ПРИНЦИП РАБОТЫ --
Решение состоит из двух этапов:
1. Распаковываем все строки
2. Находим наибольший общий префикс

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Использование стека позволяет обеспечить корректность распаковки строк

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность функции unpack - O(L + M), где
  L - длина запакованной строки;
  М - сумма всех множителей.

Временная сложность функции getLCP - O(minL * n), где
  minL - длина самой короткой распакованной строки;
  n - число строк.

Временная сложность функции solution - O(L + M) * O(n) + O(minL * n), где
  L - средняя длина запакованной строки;
  М - средняя сумма всех множителей;
  minL - длина самой короткой распакованной строки;
  n - число строк.

Итоговая суммарная временная сложность - O((L + M + minL) * n),

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Общая пространственная сложность - O((L + M) * n), где
  L - средняя длина запакованной строки;
  М - средняя длина распакованной строки;
  n - число строк;

*/

// Функция, проверяющая является ли символ цифрой
function isNumber(char) {
  return char >= '0' && char <= '9';
}

// Функция распаковки строки
function unpack(string) {
  // Заводим стек для для запакованных строк (ЗС)
  const stack = [];
  // Заводим стек для множителей
  const multipliers = [];
  // В цикле проходимся по каждому символу строки
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (isNumber(char)) {
      // Если символ является цифрой, то добавляем его в стек множителей
      multipliers.push(parseInt(char, DEX));
    } else if (char === BRACKET.OPEN) {
      // Если символ является открывающей скобкой, то добавляем в стек пустую строку
      stack.push('');
    } else if (char === BRACKET.CLOSE) {
      // Если символ является закрывающей скобкой, то извлекаем множитель с вершины стека множителей
      const multiplier = multipliers.pop();
      // Извлекаем ЗС с вершины стека и повторяем ее соответствующее число раз
      let unpackedString = stack.pop().repeat(multiplier);
      // Извлекаем из стека распакованную ранее часть строки и суммируем с текущей распакованной
      // Результат помещаем обратно в стек
      stack.push((stack.length ? stack.pop() : '') + unpackedString);
    } else {
      // Извлекаем из стека запакованную часть строки и суммируем с текущим символом
      // Результат помещаем обратно в стек
      stack.push((stack.length ? stack.pop() : '') + char);
    }
  }
  // Возвращаем распакованную строку
  return stack.pop();
}

// Функция поиска наибольшего общего префикса
function getLCP(array, minLength) {
  // Заводим переменную для хранения результата
  let result = '';
  // Проходимся в цикле по каждому символу от 0 до длины наименьшей строки
  for (let i = 0; i < minLength; i++) {
    // Запоминаем символ самой первой строки
    let char = array[0][i];
    // Проходимся по каждой строке
    for (let j = 0; j < array.length; j++) {
      // Если символ текущей строки не равен соответствующему символу самой первой строки,
      // то возвращаем результат
      if (char !== array[j][i]) {
        return result;
      }
    }
    // Если соответствующиее символы всех строк равны, добавляем этот символ к результату
    result += char;
  }
  // Возвращаем наибольший общий префикс
  return result;
}

function solution(packedStrings) {
  // Заводим массив для хранения распакованных строк
  const unpackedStrings = [];
  // Заводим переменную для хранения длины самой короткой строки
  let minLength = Infinity;
  // В цикле проходимся по каждой запакованной строке
  for (let packedString of packedStrings) {
    // Распаковываем каждую строку
    const unpackedString = unpack(packedString);
    // Добавляем распакованную строку в массив
    unpackedStrings.push(unpackedString);
    // Если длина распракованной строки меньше минимальной, обновляем длину минимальной
    if (minLength > unpackedString.length) {
      minLength = unpackedString.length;
    }
  }
  // Возвращаем наибольший общий префикс
  return getLCP(unpackedStrings, minLength);
}


const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let packedStringsNumber;
const packedStrings = [];

const DEX = 10;
const BRACKET = {
  OPEN: '[',
  CLOSE: ']',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    packedStringsNumber = parseInt(line, DEX);
  } else if (lineNumber <= packedStringsNumber) {
    packedStrings.push(line);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(packedStrings));
});