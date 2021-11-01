const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function compare(stringA, stringB) {
  if (stringA.length !== stringB.length) return ANS.NO;
  const mapA = new Map();
  const mapB = new Map();
  for (let i = 0; i < stringA.length; i++) {
    let symA = mapA.get(stringA[i]);
    let symB = mapB.get(stringB[i]);
    if (!symA) {
      mapA.set(stringA[i], 1);
    } else {
      mapA.set(stringA[i], ++symA);
    }
    if (!symB) {
      mapB.set(stringB[i], 1);
    } else {
      mapB.set(stringB[i], ++symB);
    }
    symA = mapA.get(stringA[i]);
    symB = mapB.get(stringB[i]);
    if (symA !== symB) {
      return ANS.NO;
    }
  }
  return ANS.YES;
}

let lineNumber = 0;
let stringA, stringB;
const ANS = {
  YES: 'YES',
  NO: 'NO',
};

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    stringA = line;
  } else if (lineNumber === 1) {
    stringB = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(compare(stringA, stringB));
});