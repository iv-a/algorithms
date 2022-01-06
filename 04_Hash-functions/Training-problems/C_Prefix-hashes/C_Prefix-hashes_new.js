const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONST = {
  RADIX: {
    DEC: 10,
  }
};

let base, mod, requests, precalculatedHashes;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    base = getInt(line);
  } else if (_curLine === 1) {
    mod = getInt(line);
  } else if (_curLine === 2) {
    precalculatedHashes = getPolynomialHashes(base, mod, line);
  } else if (_curLine === 3) {
    requests = getInt(line);
  } else if (_curLine < requests + 4) {

  }
  _curLine++;
});

_rl.on('close', () => {

});

function getPolynomialHashes(base, mod, string) {
  const hashes = new Array(string.length + 1);
  hashes[0] = 0;
  for (let i = 1; i <= string.length; i++) {
    hashes[i] = (hashes[i - 1] * base + string.codePointAt(i)) % mod;
  }
  return hashes;
}

function getPrefixHash(left, right, precalculatedHashes, base) {

}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}