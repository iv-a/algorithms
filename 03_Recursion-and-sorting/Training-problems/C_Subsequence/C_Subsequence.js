const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  ANS: {
    TRUE: 'True',
    FALSE: 'False',
  }
};

let stringA, stringB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    stringA = line;
  } else if (_curLine === 1) {
    stringB = line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  print(isSubsequence(stringA, stringB));
});

function isSubsequence(stringA, stringB) {
  let i = 0;
  for (let charB of stringB) {
    const charA = stringA[i];
    if (charA === charB) {
      i++;
    }
    if (i === stringA.length) {
      return CONSTANTS.ANS.TRUE;
    }
  }
  return CONSTANTS.ANS.FALSE;
}

function print(text) {
  process.stdout.write(text + '\n');
}