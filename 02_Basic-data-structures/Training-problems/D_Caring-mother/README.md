<h1 align="center">D. Заботливая мама</h1>

<h5 align="center">
<a href="#limits">Ограничения</a>
•
<a href="#task">Условие задачи</a>
•
<a href="#input">Формат ввода</a>
•
<a href="#output">Формат вывода</a>
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

Мама Васи хочет знать, что сын планирует делать и когда. Помогите ей: напишите функцию solution, определяющую индекс первого вхождения передаваемого ей на вход значения в связном списке, если значение присутствует.

<h2 id="input">Формат ввода</h2>

Функция на вход принимает голову односвязного списка и элемент, который нужно найти. Длина списка не превосходит <i>10000</i> элементов. Список не бывает пустым.

<h2 id="output">Формат вывода</h2>

Функция возвращает индекс первого вхождения искомого элемента в список(индексация начинается с нуля). Если элемент не найден, нужно вернуть <i>-1</i>.

<h2 id="solution">Решение</h2>

```javascript
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

function solution(node, elem) {
  let idx = 0;
  while (node.value !== elem) {
    node = node.next;
    idx++;
    if (!node) {
      return -1;
    }
  }
  return idx;
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
      <td>82ms</td>
      <td>8.54Mb</td>
    </tr>
  </tbody>
</table>