const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let requiredAmount, numberOfDenominations ;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    requiredAmount = parseInt(line, DEX);
    // [ n, M ] = line.split(' ').map((item) => parseInt(item, 10));
  } else if (lineNumber === 1) {
    numberOfDenominations = parseInt(line, DEX);
    // console.log(solution(M, line.split(' ')));
  } else if (lineNumber === 2) {
    const denominations = line.split(' ').map((item) => parseInt(item, 10));
    console.log(solution(requiredAmount, numberOfDenominations, denominations));
  }
  lineNumber++;
});

// function solution(requiredAmount, numberOfDenominations, denominations) {
//   const dp = [...Array(numberOfDenominations + 1)].map(() => Array(requiredAmount + 1).fill(Infinity));
//   for (let i = 1; i <= numberOfDenominations; i++) {
//     for (let j = 1; j <= requiredAmount; j++) {
//
//       if (j - denominations[i - 1] > 0) {
//         dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - denominations[i - 1]] + 1);
//       } else if (j - denominations[i - 1] === 0) {
//         dp[i][j] = 1;
//       } else {
//         dp[i][j] = dp[i-1][j];
//       }
//       // dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - denominations[i - 1]] + 1);
//       // console.log(denominations[i - 1]);
//     }
//   }
//   return dp[numberOfDenominations][requiredAmount];
// return dp;
// }

function solution(requiredAmount, numberOfDenominations, denominations) {
  const dp = new Array(requiredAmount + 1).fill(Infinity);
  // denominations.forEach((item, i) => {
  //
  // });
  for (let i = 1; i <= numberOfDenominations; i++) {
    for (let j = 1; j <= requiredAmount; j++) {
      if (j - denominations[i - 1] > 0) {
        dp[j] = Math.min(dp[j], dp[j - denominations[i - 1]] + 1);
      } else if (j - denominations[i - 1] === 0) {
        dp[j] = 1;
      }
    }
  }
  return dp[requiredAmount];
  // return dp;
}