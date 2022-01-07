const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

let logLength;
const sections = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    logLength = getInt(line);
  } else if (_curLine <= logLength) {
    sections.push(line);
    if (_curLine === logLength) {
      _rl.close();
    }
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getUniqueSections(sections));
})

function getUniqueSections(sections) {
  return Array.from(new Set(sections)).join('\n');
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}