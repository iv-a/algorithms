const _readline = require('readline');
const DEC = 10;

const _io_interface = _readline.createInterface({
  input: process.stdin
});

let _curLine = 0;
const _inputLines = [];

_io_interface.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === 1) {
    _io_interface.close();
  }
})

_io_interface.on('close', () => {
  process.stdout.write(solve());
});

function createArray(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function eratosthenesOptimized(n) {
  const numbers = createArray(n);
  numbers[0] = numbers[1] = false;
  for (let num = 2; num < n; num++) {
    if (numbers[num]) {
      for (let j = num * num; j < n + 1; j += num) {
        numbers[j] = false;
      }
    }
  }
  return numbers.join(' ');
}

function solve() {
  const number = readInt();

  return eratosthenesOptimized(number);
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}