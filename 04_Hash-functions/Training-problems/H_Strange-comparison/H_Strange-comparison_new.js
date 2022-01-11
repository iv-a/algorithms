const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  },
  ANS: {
    TRUE: 'YES',
    FALSE: 'NO',
  },
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
  console.log(areStringsEqual(stringA, stringB));
})

function areStringsEqual(stringA, stringB) {
  if (stringA.length !== stringB.length) {
    return CONST.ANS.FALSE;
  }
  const alphaBetA = new Map();
  const alphaBetB = new Map();
  let idxA = 0, idxB = 0;

  for (let i = 0; i < stringA.length; i++) {
    const symbolA = stringA[i]
    const codeA = alphaBetA.get(symbolA);
    if (codeA === undefined) {
      alphaBetA.set(symbolA, idxA);
      idxA++;
    }

    const symbolB = stringB[i]
    const codeB = alphaBetB.get(symbolB);
    if (codeB === undefined) {
      alphaBetB.set(symbolB, idxB);
      idxB++;
    }

    if (codeA !== codeB || idxA !== idxB) {
      return CONST.ANS.FALSE;
    }
  }
  return CONST.ANS.TRUE;
}