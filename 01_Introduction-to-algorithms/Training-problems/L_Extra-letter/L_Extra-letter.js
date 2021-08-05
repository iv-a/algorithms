const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

let lineA, lineB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    lineA = getArray(line);
  } else if (_curLine === 1) {
    lineB = getArray(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(findExtraLetter(lineA, lineB));
});

function findExtraLetter(lineA, lineB) {
  lineA.sort();
  lineB.sort();

  let longestLine, shortestLine;
  if (lineA.length > lineB.length) {
    longestLine = lineA;
    shortestLine = lineB;
  } else {
    longestLine = lineB;
    shortestLine = lineA;
  }
  for (let i = 0; i < shortestLine.length; i++) {
    if (longestLine[i] !== shortestLine[i]) {
      return longestLine[i];
    }
  }
  return longestLine[longestLine.length - 1];
}


function getArray(line) {
  return line.split('');
}