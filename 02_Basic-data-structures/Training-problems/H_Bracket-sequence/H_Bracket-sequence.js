const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  ANS: {
    TRUE: 'True',
    FALSE: 'False',
  }
}

_rl.on('line', (line) => {
  process.stdout.write(isCorrectBracketSeq(line) + '\n');
})

function isCorrectBracketSeq(seq) {
  const brackets = new Map([['(', ')'],['[', ']'],['{', '}']]);
  const stack = [];

  for (let bracket of seq) {
    if (brackets.has(bracket)) {
      stack.push(bracket);
    } else if (brackets.get(stack[stack.length - 1]) === bracket) {
      stack.pop();
    } else {
      return CONST.ANS.FALSE;
    }
  }
  if (stack.length) {
    return CONST.ANS.FALSE;
  }
  return CONST.ANS.TRUE;
}