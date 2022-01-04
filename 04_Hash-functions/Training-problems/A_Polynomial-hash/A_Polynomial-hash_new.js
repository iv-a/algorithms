const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

let base, mod, string;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    base = getInt(line);
  } else if (_curLine === 1) {
    mod = getInt(line);
  } else if (_curLine === 2) {
    string = line;
    _rl.close()
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getPolynomialHash(base, mod, string));
})

function getPolynomialHash(base, mod, string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash * base + string.codePointAt(i)) % mod;
  }
  return hash;
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}