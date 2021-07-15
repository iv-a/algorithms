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

function movingAverage(numberOfSeconds, timeSeries, period) {
  const result = [];
  let localSum = 0;

  for (let i = 0; i < period; i++) {
    localSum += timeSeries[i];
  }

  result.push(localSum / period);

  for (let i = 0; i < numberOfSeconds - period; i++) {
    localSum -= timeSeries[i];
    localSum += timeSeries[i + period];
    result.push(localSum/ period);
  }
  return result;
}

function solve() {
  const numberOfSeconds = readInt();
  const timeSeries = readArrayOfNums();
  const period = readInt();

  return movingAverage(numberOfSeconds, timeSeries, period).join(' ');
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}

function readArrayOfNums() {
  return _inputLines[_curLine++].trim().split(' ').map(num => parseInt(num, DEC));
}
