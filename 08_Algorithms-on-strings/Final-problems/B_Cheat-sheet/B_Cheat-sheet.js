/*

-- ПРИНЦИП РАБОТЫ --
Задача решается с помощью динамического программирования.
Создаем массив dp для хранения динамических результатов размера T, где T - длина текста.
Определим можно ли получить исходный текст из слов словаря.
Пусть в ячейке dp[i] содержится ответ на вопрос: можно ли получить данный префикс текста из слов словаря?
Тогда ответ к задаче будет храниться в ячейке dp[T].

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
  Пример 1.                    Пример 2.
  Входные данные:              Входные данные:
  aaaaa                        aaaaa
  2                            2
  aaa                          aaa
  aaaa                         aaaa
                               aa
  dp:
                               dp:
            │ │a│a│a│a│a│
            │0│1│2│3│4│5│                   │ │a│a│a│a│a│
  ───────────────────────                   │0│1│2│3│4│5│
  [aaa,aaaa]│+│-│-│+│+│-│      ──────────────────────────
  ───────────────────────      [aaa,aaaa,aa]│+│-│-│+│+│-│
                               ──────────────────────────

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Суммарная временная сложность - O(T * L * n), где
  T - длина текста;
  L - средняя длина слова в словаре;
  n - число слов в словаре.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Общая пространственная сложность - O(T + L * n), где
  T - длина текста;
  L - средняя длина слова в словаре;
  n - число слов в словаре.

*/

function solution(text, dictionary) {
  // Создаем массив для хранения динамических результатов
  const dp = new Array(text.length + 1).fill(false);
  // Отсчет с единицы
  dp[0] = true;
  // В цикле проходимся по каждому символу текста
  for (let i = 1; i <= text.length; i++) {
    // В цикле проходимся по каждому слову из словаря
    for (let j = 0; j < dictionary.length; j++) {
      const word = dictionary[j];
      // Проверяем, можно ли получить предыдущий префикс (если не считать рассматриваемое слово) из слов словаря
      if (i - word.length >= 0 && dp[i - word.length]) {
        // По умолчанию считаем, что слово является подстрокой в тексте
        let isSubstring = true;
        // Посимвольно сравниваем слово и рассматриваемую часть текста
        for (let k = 0; k < word.length; k++) {
          // Если какой либо из символов не совпадает, значит слово подстрокой не является
          if (text[i - word.length + k] !== word[k]) {
            isSubstring = false;
            // Выходим из цикла
            break;
          }
        }
        // Если слово является подстрокой, то рассматриваемый префикс можно получить из словарных слов
        if (isSubstring) {
          dp[i] = true;
        }
      }
    }
  }
  // Возвращаем ответ к задаче
  return dp[text.length] ? ANS.YES : ANS.NO;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});


let lineNumber = 0;
let text;
let numberOfWords;
const words = [];
const ANS = {
  YES: 'YES',
  NO: 'NO',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    text = line;
  } else if (lineNumber === 1) {
    numberOfWords = parseInt(line, 10);
  } else if (lineNumber <= numberOfWords + 1) {
    words.push(line);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(text, words));
});