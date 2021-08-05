const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

let lineA, lineB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    lineA = line;
  } else if (_curLine === 1) {
    lineB = line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(findExtraLetter(lineA, lineB));
});

function findExtraLetter(lineA, lineB) {
  const line = lineA + lineB;
  let result = 0;
  for (let i = 0; i < line.length; i++) {
    result ^= line.charCodeAt(i);
  }
  return String.fromCharCode(result);
}