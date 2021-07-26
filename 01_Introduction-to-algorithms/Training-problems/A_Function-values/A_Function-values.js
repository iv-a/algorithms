const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const _inputLines = [];

const CONSTANTS = {
  INPUT_LINES_NUMBER: 1,
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

function calc([ a, x, b, c ]) {
  return (a * x ** 2 + b * x + c).toString();
}

function solve() {
  const coefficients = readArrayOfNumbers();
  return calc(coefficients);
}

function readArrayOfNumbers() {
  return _inputLines[_curLine++].trim().split(' ').map((num) => parseFloat(num));
}