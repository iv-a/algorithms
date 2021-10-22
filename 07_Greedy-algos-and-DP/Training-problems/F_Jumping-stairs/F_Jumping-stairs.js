const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

// function numberOfWays(dp, n , k) {
//   if (dp[n]) {
//     return dp[n];
//   }
//   if (n <= 2) {
//     return dp[n] = 1;
//   }
//   let sum = 0;
//   for (let i = 1; i <= k && n - i > 0; i++) {
//     sum += numberOfWays(dp, n - i, k);
//   }
//   return dp[n] = sum % 1000000007;
// }

function numberOfWays(n , k) {
  const dp = [];
  for (let i = 1; i <= n; i++) {
    let sum = 0;
    for (let j = 1; j <= k && i - j > 0; j++) {
      sum += dp[i - j]
    }
    if (i <= 2) {
      sum = 1;
    }
    dp[i] = sum % 1000000007;
  }
  return dp[n];
}

io_interface.on('line', function (line) {
  const [ n, k ] = line.split(' ').map((item) => parseInt(item, 10));
  // const dp = [];
  // console.log(numberOfWays(dp, n, k));
  console.log(numberOfWays(n, k));
});
