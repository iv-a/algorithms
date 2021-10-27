function solution(M, W) {
  const dp = new Array(M + 1);
  W.forEach((item) => {
    const w = parseInt(item, 10);
    const buffer = [];
    for (let i = 1; i <= M; i++) {
      if (!dp[i]) {
        if (i - w > 0) {
          if (dp[i - w]) {
            buffer.push(i);
          }
        }
      }
    }
    dp[w] = true;
    while (buffer.length > 0) {
      dp[buffer.pop()] = true;
    }
  });

  for (let i = M; i > 0; i--) {
    if (dp[i] === true) return i;
  }
  return 0;
}

// const W = [3, 8, 1, 2, 5];
// console.log(solution(15, W));
// const W = [10, 10, 7, 7, 4];
// console.log(solution(19, W));

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n, M;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ n, M ] = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 1) {
    console.log(solution(M, line.split(' ')));
  }
  lineNumber++;
});