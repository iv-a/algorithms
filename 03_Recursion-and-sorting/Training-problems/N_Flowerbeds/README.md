<h1 align="center">N. Клумбы</h1>

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
1 секунда
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
64Mb
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

Алла захотела, чтобы у неё под окном были узкие клумбы с тюльпанам. На схеме земельного участка клумбы обозначаются просто горизонтальными отрезками, лежащими на одной прямой. Для ландшафтных работ было нанято n садовников. Каждый из них обрабатывал какой-то отрезок на схеме. Процесс был организован не очень хорошо, иногда один и тот же отрезок или его часть могли быть обработаны сразу несколькими садовниками. Таким образом, отрезки, обрабатываемые двумя разными садовниками, сливаются в один. Непрерывный обработанный отрезок затем станет клумбой. Нужно определить границы будущих клумб.

Рассмотрим примеры.

Пример 1:
Два одинаковых отрезка [7, 8] и [7, 8] сливаются в один, но потом их накрывает отрезок [6, 10]. Таким образом, имеем две клумбы с координатами [2,3] и [6,10].

Пример 2
Отрезки [2,3], [3, 4] и [3,4] сольются в один отрезок [2,4]. Отрезок [5,6] ни с кем не объединяется, добавляем его в ответ.

<h2 id="input">Формат ввода</h2>

В первой строке задано количество садовников n. Число садовников не превосходит 100 000.

В следующих n строках через пробел записаны координаты клумб в формате: start end, где start —– координата начала, end —– координата конца. Оба числа целые, неотрицательные и не превосходят 107. start строго меньше, чем end.

<h2 id="output">Формат вывода</h2>

Нужно вывести координаты каждой из получившихся клумб в отдельных строках. Данные должны выводится в отсортированном порядке —– сначала клумбы с меньшими координатами, затем —– с бОльшими.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
7 8
7 8
2 3
6 10
</pre>

<h6>Вывод</h6>
<pre>
2 3
6 10
</pre>
</ul>

<hr>

<h4>Пример 2</h4>
<ul>
<h6>Ввод</h6>
<pre>
4
2 3
5 6
3 4
3 4
</pre>

<h6>Вывод</h6>
<pre>
2 4
5 6
</pre>
</ul>

<hr>

<h4>Пример 3</h4>
<ul>
<h6>Ввод</h6>
<pre>
6
1 3
3 5
4 6
5 6
2 4
7 10
</pre>

<h6>Вывод</h6>
<pre>
1 6
7 10
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfGardeners;
const flowerbeds = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfGardeners = getInt(line);
  } else if (_curLine < numberOfGardeners) {
    flowerbeds.push(getArrayOfInt(line));
  } else if (_curLine === numberOfGardeners) {
    flowerbeds.push(getArrayOfInt(line));
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  const result = getFlowerbeds(flowerbeds);
  for (let flowerbed of result) {
    print(flowerbed);
  }
});

function getFlowerbeds(flowerbeds) {
  flowerbeds.sort(([startA], [startB]) => startA - startB);
  const result = [];
  for (let flowerbed of flowerbeds) {
    const [ start, end ] = flowerbed;
    const prevFlowerbed = result.pop();
    if (!prevFlowerbed) {
      result.push(flowerbed);
    } else {
      const [ prevStart, prevEnd ] = prevFlowerbed;
      if (start > prevEnd) {
        result.push(prevFlowerbed);
        result.push(flowerbed);
      } else {
        if (end > prevEnd) {
          result.push([prevStart, end]);
        } else {
          result.push(prevFlowerbed);
        }
      }
    }
  }
  return result;
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.join(' ') + '\n');
}
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
<td>0.55s</td>
<td>48.41Mb</td>
</tr>
  </tbody>
</table>