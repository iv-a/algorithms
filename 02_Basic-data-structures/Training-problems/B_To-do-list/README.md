<h1 align="center">B. Список дел</h1>

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

Васе нужно распечатать свой список дел на сегодня. Помогите ему: напишите функцию, которая печатает все его дела. Известно, что дел у Васи не больше <i>5000</i>.

<h2 id="input">Формат ввода</h2>

В качестве ответа сдайте только код функции, которая печатает элементы списка. Длина списка не превосходит <i>5000</i> элементов. Список не бывает пустым.

<h2 id="output">Формат вывода</h2>

Функция должна напечатать элементы списка по одному в строке.

<h2 id="solution">Решение</h2>

```javascript
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

function solution(node) {
  while (node) {
    process.stdout.write(node.value.toString() + '\n');
    node = node.next;
  }
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