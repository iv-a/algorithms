const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let requiredAmount, numberOfDenominations ;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    requiredAmount = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    numberOfDenominations = parseInt(line, DEX);
  } else if (lineNumber === 2) {
    const denominations = line.split(' ').map((item) => parseInt(item, 10));
    console.log(solution(requiredAmount, numberOfDenominations, denominations));
  }
  lineNumber++;
});

function solution(requiredAmount, numberOfDenominations, denominations) {
  const dp = new Array(requiredAmount + 1).fill(0);
  dp[0] = 1;
  for (let coin of denominations) {
    for (let i = coin; i <= requiredAmount; i++) {
      dp[i] += dp[i - coin];
    }
    console.log(dp)
  }
  return dp[requiredAmount];
}