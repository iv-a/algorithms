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

function getPrimes(n) {
  const dp = Array(n + 1).fill(0);
  const primes = [];

  for (let i = 2; i < n + 1; i++) {
    if (dp[i] === 0) {
      dp[i] = i;
      primes.push(i);
    }
    for (let p of primes) {
      let x = p * i;
      if (p > dp[i] || x > n) {
        break;
      }
      dp[x] = p;
    }
  }
  return primes.join(' ');
}

function solve() {
  const number = readInt();

  return getPrimes(number);
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}