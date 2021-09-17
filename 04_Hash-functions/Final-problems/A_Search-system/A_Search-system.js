/*
-- ПРИНЦИП РАБОТЫ --
Принцип работы заключается в составлении поискового индекса.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Сначала функцией getMap создается хеш-таблица wordsMap всех слов из всех документов, для которой ключом является слово,
а значением является другая хеш-таблица documentsMap, для которой, в свою очередь, ключом является номер документа,
а значением - сколько раз данное слово встречается в данном документе.
_______________________________________________________
  Пример:

  i love coffee
  coffee with milk and sugar
  free tea for everyone

  Map(11) {
    'i' => Map(1) { 1 => 1 },
    'love' => Map(1) { 1 => 1 },
    'coffee' => Map(2) { 1 => 1, 2 => 1 },
    'with' => Map(1) { 2 => 1 },
    'milk' => Map(1) { 2 => 1 },
    'and' => Map(1) { 2 => 1 },
    'sugar' => Map(1) { 2 => 1 },
    'free' => Map(1) { 3 => 1 },
    'tea' => Map(1) { 3 => 1 },
    'for' => Map(1) { 3 => 1 },
    'everyone' => Map(1) { 3 => 1 }
  }
_______________________________________________________

Затем, полученная хеш-таблица wordsMap вместе с поисковым запросом передается функции getAns.

Создается новая хеш-таблица documents, для которой ключом является номер документа, а значением - сколько раз слова из запроса встретились в документе.

Проверяем наличие каждого из слов запроса в хеш-таблице wordsMap.

Если слово присутствует в хеш-таблице wordsMap и в запросе оно встретилось в первый раз, то для каждого документа из documentsMap,
добавляем соответствующую коллеккцию в documents.

Полученную хеш-таблицу documents преобразовывается в массив, который впоследствии сортируется в соответствии с условием задачи.

На выходе функции получается не более 5 первых членов отсортированного массива.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

Временная сложность функции getSearchIndex - O(m * n), где
  n - число документов;
  m - среднее число слов в каждом документе.

Временная сложность функции getAnswer - O(k * n), где
  n - число документов;
  k - число слов в поисковом запросе.
  Так как в худшем случае все слова из запроса встречаются в каждом документе.

Итоговая суммарная временная сложность - O((m + k) * n);


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Общая пространственная сложность - O(m + n), где m - количество уникальных слов в запросе, n - количество уникальных
слов во всех документах.

*/

function getAnswer(request, wordsMap) {
  const documents = new Map();
  const words = new Set();
  for (let word of request) {
    let documentsMap = wordsMap.get(word);
    if (documentsMap && !words.has(word)) {
      words.add(word);
      for (let doc of documentsMap.keys()) {
        let value = documents.get(doc);
        if (!value) {
          documents.set(doc, documentsMap.get(doc));
        } else {
          documents.set(doc, value + documentsMap.get(doc));
        }
      }
    }
  }
  const arr = Array.from(documents);
  arr.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

  return arr.slice(0, TOP_RELEVANT_DOCS).map(doc => doc[0]).join(' ');
}

function getSearchIndex(documents) {
  const wordsMap = new Map();
  let docIdx = 1;
  for (let document of documents) {
    for (let word of document) {
      let documentsMap = wordsMap.get(word);
      if (!documentsMap) {
        documentsMap = new Map();
        documentsMap.set(docIdx, 1);
        wordsMap.set(word, documentsMap);
      } else {
        let documentsMapValue = documentsMap.get(docIdx);
        if (!documentsMapValue) {
          documentsMap.set(docIdx, 1);
        } else {
          documentsMap.set(docIdx, ++documentsMapValue);
        }
      }
    }
    docIdx++;
  }
  return wordsMap;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfDocuments, numberOfRequests;
let wordsMap;
const documents = [];
const TOP_RELEVANT_DOCS = 5;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfDocuments = Number(line);
  } else if (lineNumber < numberOfDocuments + 1) {
    documents.push(line.split(' '));
  } else if (lineNumber === numberOfDocuments + 1) {
    numberOfRequests = Number(line);
    wordsMap = getSearchIndex(documents);
  } else if (lineNumber < numberOfDocuments + numberOfRequests + 2) {
    console.log(getAnswer(line.split(' '), wordsMap));
  }
  lineNumber++;
});
