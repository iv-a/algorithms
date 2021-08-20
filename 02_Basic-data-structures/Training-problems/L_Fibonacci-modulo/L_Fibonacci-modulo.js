const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10
  },
}

_rl.on('line', (line) => {
  const [ num, modulo ] = readArrayOfInt(line);
  process.stdout.write(fibonacci(num, modulo).toString() + '\n');
})

function fibonacci(num, modulo) {
  let prePrev = 1, prev = 1;
  for (let  i = 1; i < num; i++) {
    const current = (prev + prePrev) % (10 ** modulo);
    prePrev = prev;
    prev = current;
  }
  return prev;
}

function readInt(line) {
  return parseInt(line, CONST.RADIX.DEC);
}

function readArrayOfInt(line) {
  return line.split(' ').map((item) => readInt(item));
}