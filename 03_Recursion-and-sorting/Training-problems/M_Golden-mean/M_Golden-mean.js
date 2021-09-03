const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let lenA, lenB, arrA, arrB;

_rl.on('line',(line) => {
  if (_curLine === 0) {
    lenA = getInt(line);
  } else if (_curLine === 1) {
    lenB = getInt(line);
  } else if (_curLine === 2) {
    arrA = getArrayOfInt(line);
  } else if (_curLine === 3) {
    arrB = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(getMedian(lenA, arrA, lenB, arrB));
})

function getMedian(lenA, arrA, lenB, arrB) {
  if (lenA > lenB) {
    return getMedian(lenB, arrB, lenA, arrA);
  }

  let l = 0;
  let r = lenA;
  let totalLen = lenA + lenB;

  while (l <= r) {
    let partA = (l + r) >> 1;
    let partB = ((totalLen + 1) >> 1) - partA;

    let maxLeftA = partA === 0 ? Number.MIN_SAFE_INTEGER : arrA[partA - 1];
    let minRightA = partA === lenA ? Number.MAX_SAFE_INTEGER : arrA[partA];

    let maxLeftB = partB === 0 ? Number.MIN_SAFE_INTEGER : arrB[partB - 1];
    let minRightB = partB === lenB ? Number.MAX_SAFE_INTEGER : arrB[partB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      if (totalLen % 2 === 0) {
        return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
      } else {
        return Math.max(maxLeftA, maxLeftB);
      }
    } else if (maxLeftA > minRightB) {
      r = partA - 1;
    } else {
      l = partA + 1;
    }
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.toString() + '\n');
}