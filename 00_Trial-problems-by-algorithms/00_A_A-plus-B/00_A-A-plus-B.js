const readline = require('readline');
const io_interface = readline.createInterface({ input: process.stdin });

const _inputLines = [];
let _curLine = 0;


io_interface.on('line', (line) => {
  _inputLines.push(line);
});

io_interface.on('close', () => {
  process.stdout.write(solve().toString() + '\n');
});

function readNumber() {
  return parseInt(_inputLines[_curLine++], 10);
}

function solve() {
  const a = readNumber();
  const b = readNumber();

  return a + b;
}