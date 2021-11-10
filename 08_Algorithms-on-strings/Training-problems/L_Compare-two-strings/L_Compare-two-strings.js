function solution(stringA, stringB) {
  const arrayA = [];
  const arrayB = [];
  for (let i = 0; i < stringA.length; i++) {
    if (stringA.charCodeAt(i) % 2 === 0) {
      arrayA.push(stringA[i]);
    }
  }
  for (let i = 0; i < stringB.length; i++) {
    if (stringB.charCodeAt(i) % 2 === 0) {
      arrayB.push(stringB[i]);
    }
  }
  stringA = arrayA.join('');
  stringB = arrayB.join('');
  if (stringA === stringB) {
    return 0;
  } else if (stringA > stringB) {
    return 1;
  } else {
    return -1;
  }
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let stringA, stringB;
const ANS = {
  OK: 'OK',
  FAIL: 'FAIL',
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
  console.log(solution(stringA, stringB));
});
