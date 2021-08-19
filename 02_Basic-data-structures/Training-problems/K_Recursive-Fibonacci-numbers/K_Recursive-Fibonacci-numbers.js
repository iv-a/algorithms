const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10
  },
}

_rl.on('line', (line) => {
  process.stdout.write(fibonacci(readInt(line)).toString() + '\n');
})

function fibonacci(n) {
  if (n < 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function readInt(line) {
  return parseInt(line, CONST.RADIX.DEC);
}