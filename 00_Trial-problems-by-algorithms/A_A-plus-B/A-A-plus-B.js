const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });
const DEC = 10;

const _inputLines = [];
let _curLine = 0;

io_interface.on('line', (line) => {
  _inputLines.push(line);
  if (_inputLines.length === 2) {
    io_interface.close();
  }
});

io_interface.on('close', () => {
  process.stdout.write(solve());
});

function sum(a, b) {
  return (a + b).toString();
}

function solve() {
  const a = readNumber();
  const b = readNumber();

  return sum(a, b);
}

function readNumber() {
  return parseInt(_inputLines[_curLine++], DEC);
}
