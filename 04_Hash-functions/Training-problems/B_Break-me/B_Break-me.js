function polynomialHash(line, a, m) {
  let sum = 0;
  for (let sym of line) {
    sum = sum * a + sym.charCodeAt(0);
    sum = sum % m;
  }
  return sum;
}

let a = 1000;
let m = 123987123;
let n = 123987124;

// let lineA = 'dddddddddddddddddddddddddddddd';
// let lineB = 'xxxxxxxxxxxxxxxxxxxxxxxxx';

let lineA = 'zwnvuwqvp';
let lineB = 'illgnqrv';



function generator() {
  let abc = "abcdefghijklmnopqrstuvwxyz";
  let rs = "";
  while (rs.length < 6) {
    rs += abc[Math.floor(Math.random() * abc.length)];
  }
  return rs;
}

function get() {
  let first = 0;
  let second = 1;
  let firstLine;
  let secondLine;
  while (first !== second) {
    firstLine = generator();
    secondLine = generator();
    first = polynomialHash(firstLine, a, m);
    second = polynomialHash(secondLine, a, m);
  }
  console.log(firstLine);
  console.log(secondLine);
}

get();

// console.log(polynomialHash(lineA, a, m));
// console.log(polynomialHash(lineB, a, m));

// console.log(m * 2)