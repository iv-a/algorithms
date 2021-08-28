const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfNumbers, numbers;

let _curLine = 0;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfNumbers = getInt(line);
  } else if (_curLine === 1) {
    numbers = getArray(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  print(getBiggestNumber(numberOfNumbers, numbers));
});

function getBiggestNumber(numberOfNumbers, numbers) {
  numbers.sort(comparator);
  return numbers.join('');
}

function comparator(a, b) {
  return (b + a) - (a + b);
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
}

function print(text) {
  process.stdout.write(text + '\n');
}