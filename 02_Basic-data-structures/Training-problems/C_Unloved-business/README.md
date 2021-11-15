<h1 align="center">C. Нелюбимое дело</h1>

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

Вася размышляет, что ему можно не делать из того списка дел, который он составил. Но, кажется, все пункты очень важные! Вася решает загадать число и удалить дело, которое идёт под этим номером. Список дел представлен в виде односвязного списка. Напишите функцию solution, которая принимает на вход голову списка и номер удаляемого дела и возвращает голову обновлённого списка.

<h2 id="input">Формат ввода</h2>

Функция принимает голову списка и индекс элемента, который надо удалить (нумерация с нуля). Список содержит не более <i>5000</i> элементов. Список не бывает пустым.

<h2 id="output">Формат вывода</h2>

Верните голову списка, в котором удален нужный элемент.

<h2 id="solution">Решение</h2>

```javascript
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

function getNodeByIndex(node, idx) {
  while (idx) {
    node = node.next;
    idx--;
  }
  return node;
}

function solution(node, idx) {
  if (idx > 0) {
    const previousNode = getNodeByIndex(node, idx - 1);
    const nodeToDelete = previousNode.next;
    previousNode.next = nodeToDelete.next;
  } else {
    node = node.next;
  }
  return node;
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
      <td>143ms</td>
      <td>10.61Mb</td>
    </tr>
  </tbody>
</table>