const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10,
  },
}

let _curLine = 0;
let sequenceLength, sequence;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    sequenceLength = getInt(line);
  } else if (_curLine === 1) {
    sequence = line.split(' ');
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  console.log(getMaxLengthDrawSequence(sequenceLength, sequence))
});

function getMaxLengthDrawSequence(sequenceLength, sequence) {
  let curScore = 0;
  const scoresMap = new Map();

  scoresMap.set(curScore, [0]);

  for (let i = 0; i < sequenceLength; i++) {
    if (sequence[i] === '0') {
      curScore--;
    } else if (sequence[i] === '1') {
      curScore++;
    }

    const curScoreSeq = scoresMap.get(curScore);

    if (!curScoreSeq) {
      scoresMap.set(curScore, [i + 1]);
    } else {
      curScoreSeq[1] = i + 1;
    }
  }

  let maxSeqLength = 0;
  for (let seq of scoresMap.values()) {
    const [ start, end ] = seq;
    const seqLength = end - start;
    if (seqLength > maxSeqLength) {
      maxSeqLength = seqLength;
    }
  }
  return maxSeqLength;
}

function getInt(str) {
  return parseInt(str, CONST.RADIX.DEC);
}
