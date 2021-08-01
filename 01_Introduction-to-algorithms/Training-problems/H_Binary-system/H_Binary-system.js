const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let numA, numB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numA = getArrayOfInt(line);
  } else if (_curLine === 1) {
    numB = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(binarySum(numA, numB));
});

function binarySum(numA, numB) {
  const result = [];
  numA.reverse();
  numB.reverse();

  if (numA.length > numB.length) {
    addZero(numA, numB);
  } else if (numB.length > numA.length) {
    addZero(numB, numA);
  }
  let temp = 0;
  for (let i = 0; i < numA.length; i++) {
    const sum = numA[i] + numB[i] + temp;
    result.push(sum % 2);
    if (sum >> 1 !== 0) {
      temp = 1;
    } else {
      temp = 0;
    }
  }
  if (temp) {
    result.push(1);
  }
  return result.reverse().join('');
}

function addZero (longest, shortest) {
  while (longest.length !== shortest.length) {
    shortest.push(0);
  }
}

function getArrayOfInt(line) {
  return line.trim().split('').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}