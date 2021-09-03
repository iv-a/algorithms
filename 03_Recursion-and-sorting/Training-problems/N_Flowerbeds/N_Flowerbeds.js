const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfGardeners;
const flowerbeds = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfGardeners = getInt(line);
  } else if (_curLine < numberOfGardeners) {
    flowerbeds.push(getArrayOfInt(line));
  } else if (_curLine === numberOfGardeners) {
    flowerbeds.push(getArrayOfInt(line));
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  const result = getFlowerbeds(flowerbeds);
  for (let flowerbed of result) {
    print(flowerbed);
  }
});

function getFlowerbeds(flowerbeds) {
  flowerbeds.sort(([startA], [startB]) => startA - startB);
  const result = [];
  for (let flowerbed of flowerbeds) {
    const [ start, end ] = flowerbed;
    const prevFlowerbed = result.pop();
    if (!prevFlowerbed) {
      result.push(flowerbed);
    } else {
      const [ prevStart, prevEnd ] = prevFlowerbed;
      if (start > prevEnd) {
        result.push(prevFlowerbed);
        result.push(flowerbed);
      } else {
        if (end > prevEnd) {
          result.push([prevStart, end]);
        } else {
          result.push(prevFlowerbed);
        }
      }
    }
  }
  return result;
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.join(' ') + '\n');
}