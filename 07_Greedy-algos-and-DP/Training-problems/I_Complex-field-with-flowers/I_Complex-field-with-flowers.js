function getRoute(dp, numberOfRows, numberOfColumns) {
  let ans = [];
  let i = numberOfRows - 1;
  let j = numberOfColumns - 1;
  while (true) {
    if (i === 0 && j === 0) break;
    if (i - 1 < 0) {
      ans.push(CONSTANTS.RIGHT);
      j--;
    } else if (j - 1 < 0) {
      ans.push(CONSTANTS.UP);
      i--;
    } else {
      if (dp[i - 1][j] > dp[i][j - 1]) {
        ans.push(CONSTANTS.UP);
        i--;
      } else {
        ans.push(CONSTANTS.RIGHT);
        j--;
      }
    }
  }
  return ans.reverse().join('');
}

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
  return [dp[numberOfRows - 1][numberOfColumns - 1], getRoute(dp, numberOfRows, numberOfColumns)];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfRows, numberOfColumns;
let row;
const flowers = [];

const dex = 10;
const CONSTANTS = {
  UP: 'U',
  RIGHT: 'R',
};

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
  const [ maxFlowers, route] = solution(flowers);
  console.log(maxFlowers);
  console.log(route);
});