const _readline = require('readline');
const DEC = 10;

const _io_interface = _readline.createInterface({
  input: process.stdin
});

let _curLine = 0;
const _inputLines = [];

_io_interface.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === 3) {
    _io_interface.close();
  }
})

_io_interface.on('close', () => {
  process.stdout.write(solve());
});

function zip(arrayA, arrayB, length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(arrayA[i]);
    result.push(arrayB[i]);
  }
  return result;
}

function solve() {
  const length = readInt();
  const arrayA = readArrayOfNums();
  const arrayB = readArrayOfNums();

  return zip(arrayA, arrayB, length).join(' ');
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}

function readArrayOfNums() {
  return _inputLines[_curLine++].trim().split(' ').map(num => parseInt(num, DEC));
}

