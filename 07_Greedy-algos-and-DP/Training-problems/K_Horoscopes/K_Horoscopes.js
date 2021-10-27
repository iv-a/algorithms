const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n, m;
let arrA, arrB;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    arrA = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 2) {
    m = parseInt(line, DEX);
  } else if (lineNumber === 3) {
    arrB = line.split(' ').map((item) => parseInt(item, 10));
    const [ sizeOfLCS, [ aLCS, bLCS ] ] = findLCS(n, arrA, m, arrB);
    console.log(sizeOfLCS);
    if (sizeOfLCS) {
      console.log(aLCS.join(' '));
      console.log(bLCS.join(' '));
    }
  }
  lineNumber++;
});

function findLCS(n, arrA, m, arrB) {
  const dp = [...Array(n + 1)].map(() => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (arrA[i - 1] === arrB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  // console.log(getLCS(dp, n, arrA, m, arrB));
  return [dp[n][m], getLCS(dp, n, arrA, m, arrB)]
}

function getLCS(dp, n, arrA, m, arrB) {
  const ansA = [];
  const ansB = [];
  let i = n;
  let j = m;
  while (dp[i][j] !== 0) {
    if (arrA[i - 1] === arrB[j - 1]) {
      ansA.push(i);
      ansB.push(j);
      i--;
      j--;
    } else {
      if (dp[i][j] === dp[i - 1][j]) {
        i--;
      } else if (dp[i][j] === dp[i][j - 1]){
        j--;
      }
    }
  }
  return [ansA.reverse(), ansB.reverse()];
}