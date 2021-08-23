const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  BRACKET: {
    OPENING: '(',
    CLOSING: ')',
  },
};

_rl.on('line', (line) => {
  getBrackets(getInt(line));
});

function getBrackets(n, seq = '', openingBrackets = 0, closingBrackets = 0) {
  if (seq.length ===  2 * n) {
    print(seq);
    return;
  }
  if (openingBrackets < n) {
    getBrackets(n, seq + CONSTANTS.BRACKET.OPENING, openingBrackets + 1, closingBrackets);
  }
  if (openingBrackets > closingBrackets) {
    getBrackets(n, seq + CONSTANTS.BRACKET.CLOSING, openingBrackets, closingBrackets + 1);

  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function print(text) {
  process.stdout.write(text + '\n');
}