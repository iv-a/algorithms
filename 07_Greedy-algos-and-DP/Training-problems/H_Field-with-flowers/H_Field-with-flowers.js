function solution(flowers) {
  const dp = [...Array(numberOfRows)].map(() => Array(numberOfColumns));
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = flowers[i][j];
      } else {
        if (i - 1 < 0) {
          dp[i][j] = dp[i][j - 1] + flowers[i][j];
        } else if (j - 1 < 0) {
          dp[i][j] = dp[i - 1][j] + flowers[i][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + flowers[i][j];
        }
      }
    }
  }
  return dp[numberOfRows - 1][numberOfColumns - 1];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfRows, numberOfColumns;
const dex = 10;
const flowers = [];
let row;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfRows, numberOfColumns ] = line.split(' ').map((item) => parseInt(item, dex));
    row = numberOfRows - 1;
  } else if (lineNumber <= numberOfRows) {
    flowers[row] = line.split('').map((item) => parseInt(item, dex));
    row--;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(flowers));
});