const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const _inputLines = [];

const CONSTANTS = {
  INPUT_LINES_NUMBER: 1,
  RADIX: {
    DEC: 10,
  },
  ANS: {
    WIN: 'WIN',
    FAIL: 'FAIL',
  }
}

_rl.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === CONSTANTS.INPUT_LINES_NUMBER) {
    _rl.close();
  }
});

_rl.on('close', () => {
  process.stdout.write(solve());
});

function calc([ a, b, c ]) {
  return (!((a | b | c) & 1) || (a & b & c & 1)) ? CONSTANTS.ANS.WIN : CONSTANTS.ANS.FAIL;
}

function solve() {
  const numbers = readArrayOfIntNumbers();
  return calc(numbers);
}

function readArrayOfIntNumbers() {
  return _inputLines[_curLine++].trim().split(' ').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}