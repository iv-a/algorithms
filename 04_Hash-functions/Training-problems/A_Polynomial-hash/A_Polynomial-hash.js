const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function polynomialHash(line, a, m) {
  let sum = 0;
  for (let sym of line) {
    sum = sum * a + sym.charCodeAt(0);
    sum = sum % m;
  }
  return sum;
}

let lineNumber = 0;
let a, m;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    a = Number(line);
  } else if (lineNumber === 1) {
    m = Number(line);
  } else if (lineNumber === 2) {
    console.log(polynomialHash(line, a, m));
  }
  lineNumber++;
});