const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

_rl.on('line', (line) => {

});

function getMaxSubstringLength(string) {
  let curLength = 0;
  const substrings = new Map();
  for (let i = 0; i < string.length; i++) {
    const sym = string[i];

  }
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}