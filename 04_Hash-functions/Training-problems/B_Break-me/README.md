<h1 align="center">B. Сломай меня</h1>

<h5 align="center">
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

<h2 id="task">Условие задачи</h2>

Гоша написал программу, которая сравнивает строки исключительно по их хешам. Если хеш равен, то и строки равны. Тимофей увидел это безобразие и поручил вам сломать программу Гоши, чтобы остальным неповадно было.

В этой задаче вам надо будет лишь найти две различные строки, которые для заданной хеш-функции будут давать одинаковое значение.

Гоша использует следующую хеш-функцию:
<img src="./pic.png">

для <i>a = 1000</i> и <i>m = 123 987 123</i>.

В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

<h2 id="input">Формат ввода</h2>

В задаче единственный тест без ввода

<h2 id="output">Формат вывода</h2>

Отправьте две строки, по одной в строке. Строки могут состоять только из маленьких латинских букв и не должны превышать в длину 1000 знаков каждая. Код отправлять не требуется. Строки из примера использовать нельзя.

<h2 id="examples">Примеры</h2>

<h4>Пример 1</h4>
<ul>
<h6>Ввод</h6>
<pre>
ezhgeljkablzwnvuwqvp
gbpdcvkumyfxillgnqrv
</pre>
</ul>

<h2 id="solution">Решение</h2>

```javascript
// cxxyzx
// avmaec

function getPolynomialHash(base, mod, string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash * base + string.codePointAt(i)) % mod;
  }
  return hash;
}

function getStringWithSameHash() {
  const base = 1000, mod = 123987123;
  let stringA = generateString();
  let stringB = generateString();
  let hashA = getPolynomialHash(base, mod, stringA);
  let hashB = getPolynomialHash(base, mod, stringB);
  while (hashA !== hashB) {
    hashA = getPolynomialHash(base, mod, stringA);
    hashB = getPolynomialHash(base, mod, stringB);
  }
  return [stringA, stringB];
}

function generateString() {
  const alphabet = 'abcdifghijklmnopqrstuvdxyz';
  let newString = '';
  while (newString.length < 7) {
    newString += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
  }
  return newString;
}

console.log(getStringWithSameHash());
```

<p width="100%" align="right"><a href="#">🔝</a></p>