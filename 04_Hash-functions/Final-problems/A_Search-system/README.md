<h1 align="center">A. Поисковая система</h1>

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
6.5 секунд
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
1Gb
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

В этой задаче можно пользоваться хеш-таблицами из стандартных библиотек.

Тимофей пишет свою поисковую систему.

Имеется n документов, каждый из которых представляет собой текст из слов. По этим документам требуется построить поисковый индекс. На вход системе будут подаваться запросы. Запрос —– некоторый набор слов. По запросу надо вывести 5 самых релевантных документов.

Релевантность документа оценивается следующим образом: для каждого уникального слова из запроса берётся число его вхождений в документ, полученные числа для всех слов из запроса суммируются. Итоговая сумма и является релевантностью документа. Чем больше сумма, тем больше документ подходит под запрос.

Сортировка документов на выдаче производится по убыванию релевантности. Если релевантности документов совпадают —– то по возрастанию их порядковых номеров в базе (то есть во входных данных).

Подумайте над случаями, когда запросы состоят из слов, встречающихся в малом количестве документов. Что если одно слово много раз встречается в одном документе?

<h2 id="input">Формат ввода</h2>

В первой строке дано натуральное число n —– количество документов в базе (1 ≤ n ≤ 104).

Далее в n строках даны документы по одному в строке. Каждый документ состоит из нескольких слов, слова отделяются друг от друга одним пробелом и состоят из маленьких латинских букв. Длина одного текста не превосходит 1000 символов. Текст не бывает пустым.

В следующей строке дано число запросов —– натуральное число m (1 ≤ m ≤ 104). В следующих m строках даны запросы по одному в строке. Каждый запрос состоит из одного или нескольких слов. Запрос не бывает пустым. Слова отделяются друг от друга одним пробелом и состоят из маленьких латинских букв. Число символов в запросе не превосходит 100.

<h2 id="output">Формат вывода</h2>

Для каждого запроса выведите на одной строке номера пяти самых релевантных документов. Если нашлось менее пяти документов, то выведите столько, сколько нашлось. Документы с релевантностью 0 выдавать не нужно

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
i love coffee
coffee with milk and sugar
free tea for everyone
3
i like black coffee without milk
everyone loves new year
mary likes black coffee without milk
</pre>

<h6>Вывод</h6>
<pre>
1 2
3
2 1
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
buy flat in moscow
rent flat in moscow
sell flat in moscow
want flat in moscow like crazy
clean flat in moscow on weekends
renovate flat in moscow
1
flat in moscow for crazy weekends
</pre>

<h6>Вывод</h6>
<pre>
4 5 1 2 3
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
3
i like dfs and bfs
i like dfs dfs
i like bfs with bfs and bfs
1
dfs dfs dfs dfs bfs
</pre>

<h6>Вывод</h6>
<pre>
3 1 2
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
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
<td>2.447s</td>
<td>71.93Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>