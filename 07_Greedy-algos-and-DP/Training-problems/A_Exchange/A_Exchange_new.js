const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfDays, sequence;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfDays = getInt(line);
  } else if (_curLine === 1) {
    sequence = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(sequence);
});

function getMaxProfit(numberOfDays, sequence) {
  let sum = 0;
  let isBought = false;
  for (let i = 1; i < numberOfDays - 1; i++) {
  }
}

function removeDuplicates(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {

  }
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}

function getArrayOfInt(str) {
  return str.split(' ').map((item) => getInt(item));
}