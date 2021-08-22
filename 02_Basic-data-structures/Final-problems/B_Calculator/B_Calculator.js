/*

-- ПРИНЦИП РАБОТЫ --
Задача решена с использованием стека на основе динамического массива.
Функция calculator принимает на вход массив операндов и операторов.
Далее в цикле проходимся по этому массиву и сравниваем каждый элемент с операторами.
Если текущий элемент является операндом, то он попадает на вершину стека.
Если же текущий элемент является оператором, то функция getOperands возвращает из
стека два верхних элемента. При этом верхний из них будет вторым операндом, а нижний - первым.
Далее над этими операндами выполняется соответствующая операция,
результат которой попадает на вершину стека.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В реализации учтено, что под делением подразумевается математическое целочисленное деление,
поэтому деление оприцательных чисел выполняется корректно.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Операции чтения и записи значений в массив стоят O(1),
Поскольку мы в цикле проходимся по каждому элементу входного массива expression,
то временная сложность алгоритма O(n);

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Поскольку массив динамический и при считываниии строки в исходный массив expression
записываются все элементы строки, то пространственная сложность алгоритма O(n).

*/

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

const additionOperator = '+',
  subtractionOperator = '-',
  divisionOperator = '/',
  multiplicationOperator = '*';

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}

function getOperands(stack) {
  return [stack.pop(), stack.pop()];
}

function calculator(expression) {
  const stack = new Stack();

  for (let element of expression) {
    if (element === additionOperator) {
      const [ secondOperand, firstOperand ] = getOperands(stack);
      stack.push(firstOperand + secondOperand);
    } else if (element === subtractionOperator) {
      const [ secondOperand, firstOperand ] = getOperands(stack);
      stack.push(firstOperand - secondOperand);
    } else if (element === multiplicationOperator) {
      const [ secondOperand, firstOperand ] = getOperands(stack);
      stack.push(firstOperand * secondOperand);
    } else if (element === divisionOperator) {
      const [ secondOperand, firstOperand ] = getOperands(stack);
      stack.push(Math.floor(firstOperand / secondOperand));
    } else {
      stack.push(Number(element));
    }
  }
  return stack.pop();
}

io_interface.on('line', function (line) {
  const inputArray = line.split(' ');
  console.log(calculator(inputArray));
});