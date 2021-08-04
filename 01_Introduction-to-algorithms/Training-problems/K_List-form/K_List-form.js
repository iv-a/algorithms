const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  SEPARATOR: {
    SPACE: ' ',
    NONE: '',
  }
}

let length, listForm, num;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    listForm = getArrayOfInt(line);
  } else if (_curLine === 2) {
    num = getArrayOfInt(line, CONSTANTS.SEPARATOR.NONE);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getListForm(length, listForm, num));
});

function getListForm(length, listForm, num) {
  let numA = listForm.reverse();
  let numB = num.reverse();

  if (numA.length > numB.length) {
    addZero(numA, numB);
  } else if (numB.length > numA.length) {
    addZero(numB, numA);
  }
  const result = [];
  let temp = 0;
  for (let i = 0; i < numA.length; i++) {
    let sum = numA[i] + numB[i] + temp
    result.push(sum % 10);
    temp = Math.floor(sum / 10);
  }
  if (temp !== 0) {
    result.push(temp);
  }
  return result.reverse().join(' ');
}

function addZero(longest, shortest) {
  while (longest.length > shortest.length) {
    shortest.push(0);
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line, separator = CONSTANTS.SEPARATOR.SPACE) {
  return line.trim().split(separator).map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}
