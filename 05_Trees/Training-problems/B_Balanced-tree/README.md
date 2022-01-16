<h1 align="center">B. Сбалансированное дерево</h1>

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

Гоше очень понравилось слушать рассказ Тимофея про деревья. Особенно часть про сбалансированные деревья. Он решил написать функцию, которая определяет, сбалансировано ли дерево.
Дерево считается сбалансированным, если левое и правое поддеревья каждой вершины отличаются по высоте не больше, чем на единицу.

<img src="./pic.png" align="center">

<h2 id="input">Формат ввода</h2>

На вход функции подаётся корень бинарного дерева.

<h2 id="output">Формат вывода</h2>

Функция должна вернуть True, если дерево сбалансировано в соответствии с критерием из условия, иначе - False.

<h2 id="solution">Решение</h2>

```javascript
function solution(root) {
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  function counter(root, i, arr) {
    i++;
    if (root.left !== null) counter(root.left, i, arr);
    if (root.right !== null) counter(root.right, i, arr);
    if (root.right === null || root.left === null) arr.push(i);
  }

  const arr = [];
  counter(root, 0, arr);

  const min = getMinOfArray(arr);
  const max = getMaxOfArray(arr);

  return max - min <= 1;
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
<td>Make</td>
<td>77ms</td>
<td>7.70Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>