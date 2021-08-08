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
  const primes = [];
  for (let number = 2; number <= n; number++) {
    if (isPrimeOptimized(number)) {
      primes.push(number);
    }
  }
  return primes.join(' ');
}

function isPrimeOptimized(number) {
  if (number === 1) {
    return false;
  }
  let i = 2;
  while (i * i <=number) {
    if (number % i === 0) {
      return false;
    }
    i++;
  }
  return true;
}

function solve() {
  const number = readInt();

  return getPrimes(number);
}

function readInt() {
  return parseInt(_inputLines[_curLine++], DEC);
}