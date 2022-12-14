<h1 align="center">B. Удали узел</h1>

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

Дано бинарное дерево поиска, в котором хранятся ключи. Ключи — уникальные целые числа. Найдите вершину с заданным ключом и удалите её из дерева так, чтобы дерево осталось корректным бинарным деревом поиска. Если ключа в дереве нет, то изменять дерево не надо.
На вход вашей функции подаётся корень дерева и ключ, который надо удалить. Функция должна вернуть корень изменённого дерева. Сложность удаления узла должна составлять
O
(
h
)
, где
h
–— высота дерева.
Создавать новые вершины (вдруг очень захочется) нельзя.

<h2 id="input">Формат ввода</h2>

Ключи дерева – натуральные числа, не превышающие
1
0
9
. В итоговом решении не надо определять свою структуру/свой класс, описывающий вершину дерева.

<h2 id="output">Формат вывода</h2>

Функция должна вернуть корень изменённого дерева.

<h2 id="solution">Решение</h2>

```javascript
/*

-- ПРИНЦИП РАБОТЫ --
Алгоритм:
1. Удаляемый элемент находится в левом поддереве (теущий элемент больше искомого):
1.1. Рекурсивно удаляем нужный элемент из левого поддерева (вызываем функцию remove для левого дочернего элемента);

2. Удаляемый элемент находится в правом поддереве (теущий элемент меньше искомого):
2.1. Рекурсивно удаляем нужный элемент из правого поддерева;

3. Удаляемый элемент находится в корне (теущий элемент равен искомому):
3.1. Удаляемый элемент имеет два дочерних узла:
3.1.1. Заменяем удаляемый элемент минимальным элементом из правого поддерева удаляемого элемента;
3.1.2. Рекурсивно удаляем этот минимальный элемент из правого поддерева;

3.2. Удаляемый элемент имеет один дочерний элемент:
3.2.1. Заменяем удаляемый элемент потомком;

3.3. Удаляемый элемент не имеет дочерних элементов:
3.3.1. Удаляем этот элемент (возвращаем null).

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
При удалении узла из двоичного дерева поиска необходимо рассмотреть три случая:
1. У узла два сына.
   Пусть {5} – удаляемый узел. Ищем его последователя (6) – узла с минимальным ключом в правом поддереве удаляемого узла.
   Переносим ключ узла (6) в узел {5} и сводим задачу к удалению узла [X].
   Эта процедура является корректной, потому что после удаления узла {5} его место должен занять как раз его последователь.
   Время поиска последователя, ограничено высотой дерева.

         удаляемый
           узел
            {5}     ->    (6)     ->    (6)
            / \           / \           / \
           /   \         /   \         /   \
          /     \       /     \       /     \
        (3)     (8)   (3)     (8)   (3)     (8)
                /             /
              (6)           [X]

2. У узла только один сын.
   Узел удаляется, и его сын переходит к его родителю

                    (5)   ->   (5)   ->   (5)
                    /          /           |
                   /          /            |
      удаляемый   /          /             |
        узел    {3}        [X]             |
                  \          \             |
                   \          \            |
                    \          \           |
                    (4)        (4)        (4)

3. У узла нет сыновей – узел является листовым.
   В этом случае узел удаляется, и соответствующее поддерево его родителя становится пустым


                    (5)   ->   (5)   ->   (5)
                    /          /
                   /          /
      удаляемый   /          /
        узел    {3}        [X]

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Скорость удаления узла - O(h), где h - высота дерева

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Удаление требует O(1) дополнительной памяти

*/

function getMinimum(node) {
  if (node.left === null) return node;
  return getMinimum(node.left);
}

function remove(node, key) {
  if (node === null) return node;
  if (key < node.value) {
    node.left = remove(node.left, key)
  } else if (key > node.value) {
    node.right = remove(node.right, key)
  } else if (node.left !== null && node.right !== null) {
    node.value = getMinimum(node.right).value;
    node.right = remove(node.right, node.value);
  } else {
    if (node.left !== null) {
      node = node.left;
    } else if (node.right !== null) {
      node = node.right;
    } else {
      node = null;
    }
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
<td>0.643s</td>
<td>58.42Mb</td>
</tr>
  </tbody>
</table>

<p width="100%" align="right"><a href="#">🔝</a></p>