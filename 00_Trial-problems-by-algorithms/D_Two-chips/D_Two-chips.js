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

function twoChips(numberOfChips, chipScores, requiredAmount) {
  for (let i = 0; i < numberOfChips; i++) {
    for (let j = i + 1; j < numberOfChips; j++) {
      if (chipScores[i] + chipScores[j] === requiredAmount)
        return [chipScores[i], chipScores[j]].join(' ');
    }
  }
  return 'None';
}

function solve() {
  const numberOfChips = readInt();
  const chipScores = readArrayOfNums();
  const requiredAmount = readInt();

  return twoChips(numberOfChips, chipScores, requiredAmount);
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}

function readArrayOfNums() {
  return _inputLines[_curLine++].trim().split(' ').map(num => parseInt(num, DEC));
}
