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
  process.stdout.write(decimalToBinary(getInt(line)) + '\n');
});

function decimalToBinary(dec) {
  const ans = [];
  while (dec !== 0) {
    ans.push(dec % 2);
    dec = dec >> 1;
  }
  return ans.reverse().join('');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}