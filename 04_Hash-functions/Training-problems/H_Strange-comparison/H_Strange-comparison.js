const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function compare(a, b) {
  if (a.length !== b.length) {
    return 'NO'
  }
  let indA = 0;
  let indB = 0;
  const mapA = new Map();
  const mapB = new Map();
  for (let i = 0; i < a.length; i++) {
    let resA;
    if (!mapA.has(a[i])) {
      mapA.set(a[i], indA);
      indA++;
    } else {
      resA = mapA.get(a[i]);
    }
    let resB;
    if (!mapB.has(b[i])) {
      mapB.set(b[i], indB);
      indB++;
    } else {
      resB = mapB.get(b[i]);
    }
    if (resA !== resB) {
      return 'NO';
    }
  }
  return 'YES';
}

let lineNumber = 0;
let a;
let b;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    a = line;
  } else if (lineNumber === 1) {
    b = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(compare(a, b));
});