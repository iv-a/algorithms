const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const ANS = {
  TRUE: 'True',
  FALSE: 'False'
}

_rl.on('line', (line) => {
  process.stdout.write(isPalindrome(line) + '\n');
});

function isPalindrome(line) {
  const regexp = /\w/g;
  const letters = line.toLowerCase().match(regexp);
  const mid = letters.length >> 1;
  for (let i = 0; i < mid; i++) {
    if (letters[i] !== letters[letters.length - 1 - i]) {
      return ANS.FALSE;
    }
  }
  return ANS.TRUE;
}
