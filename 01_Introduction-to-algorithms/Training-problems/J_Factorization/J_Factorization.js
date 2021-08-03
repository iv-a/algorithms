const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONST = {
  RADIX: {
    DEC: 10
  }
}

_rl.on('line', (line) => {
  process.stdout.write(solution(getInt(line)) + '\n');
})

function solution(num) {
  const sqrt = Math.sqrt(num);
  const primes = getPrimes(Math.ceil(sqrt));
  const result = [];
  for (let prime of primes) {
    while (num % prime === 0) {
      result.push(prime);
      num /= prime;
    }
  }
  if (num !== 1) {
    result.push(num);
  }
  return result.join(' ');
}

function getPrimes(num) {
  const dp = Array(num + 1).fill(0);
  const primes = [];

  for (let i = 2; i < num + 1; i++) {
    if (dp[i] === 0) {
      dp[i] = i;
      primes.push(i);
    }
    for (let p of primes) {
      let x = p * i;
      if (p > dp[i] || x > num) {
        break;
      }
      dp[x] = p;
    }
  }
  return primes;
}

function getInt(line) {
  return parseInt(line, CONST.RADIX.DEC);
}