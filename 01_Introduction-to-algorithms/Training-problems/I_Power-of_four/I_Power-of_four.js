const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  ANS: {
    TRUE: 'True',
    FALSE: 'False'
  },
  RADIX: {
    DEC: 10
  },
}

_rl.on('line', (line) => {
  process.stdout.write(isPowerOfFour(getInt(line)) + '\n');
});

function isPowerOfFour(num) {
  while (num !== 1) {
    if (num % 4 !== 0) {
      return CONSTANTS.ANS.FALSE;
    }
    num = num >> 2;
  }
  return CONSTANTS.ANS.TRUE;
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}