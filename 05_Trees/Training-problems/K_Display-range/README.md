<h1 align="center">K. Выведи диапазон</h1>

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
3 секунды
</td>
</tr>
<tr>
<td>
<b>Ограничение памяти</b>
</td>
<td>
128Mb
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

Напишите функцию, которая будет выводить по неубыванию все ключи от
L
до
R
включительно в заданном бинарном дереве поиска.
Ключи в дереве могут повторяться. Решение должно иметь сложность
O
(
h +
k
)
, где
h
–— глубина дерева,
k
— число элементов в ответе.
В данной задаче если в узле содержится ключ
x
, то другие ключи, равные
x
, могут быть как в правом, так и в левом поддереве данного узла. (Дерево строил стажёр, так что ничего страшного).

<img src="./pic.png" align="center">

<h2 id="input">Формат ввода</h2>

На вход функции подаётся корень дерева и искомый ключ. Число вершин в дереве не превосходит
1
0
5
. Ключи – натуральные числа, не превосходящие
1
0
9
. Гарантируется, что
L
≤
R
.
В итоговом решении не надо определять свою структуру / свой класс, описывающий вершину дерева.

<h2 id="output">Формат вывода</h2>

Функция должна напечатать по неубыванию все ключи от
L
до
R
по одному в строке.

<h2 id="solution">Решение</h2>

```javascript
function printRange(root, left, right) {
  function getNode(root, left, right, result) {
    if (root.left !== null) getNode(root.left, left, right, result);
    if (root.value >= left && root.value <= right) result.push(root.value);
    if (root.right !== null) getNode(root.right, left, right, result);
  }

  const result = [];
  getNode(root, left, right, result);
  console.log(result.join(' '));
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
<td>1.692s</td>
<td>60.54Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>