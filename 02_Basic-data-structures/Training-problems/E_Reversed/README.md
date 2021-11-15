<h1 align="center">E. Всё наоборот</h1>

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

Вася решил запутать маму —– делать дела в обратном порядке. Список его дел теперь хранится в двусвязном списке. Напишите функцию, которая вернёт список в обратном порядке.

<h2 id="input">Формат ввода</h2>

Функция принимает на вход единственный аргумент — голову двусвязного списка.
Длина списка не превосходит <i>10000</i> элементов. Список не бывает пустым.

<h2 id="output">Формат вывода</h2>

Функция должна вернуть голову развернутого списка.

<h2 id="solution">Решение</h2>

```javascript
class Node {
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

function solution(node) {
  let temp = null;
  let current = node;
  while (current) {
    temp = current.next;
    current.next = current.prev;
    current.prev = temp;
    if (!temp) {
      break;
    }
    current = temp;
  }
  return current;
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