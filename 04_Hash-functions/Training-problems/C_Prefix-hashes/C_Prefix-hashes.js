const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function div2(value) {
  return ~~(value / 2);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function modExp(a, b, n) {
  a = a % n;
  let result = 1;
  let x = a;

  while (b > 0) {
    let leastSignificantBit = b % 2;
    b = div2(b);

    if (leastSignificantBit === 1) {
      result = result * x;
      result = result % n;
    }
    x = x * x;
    x = x % n;
  }
  return result;
}

function getHashes(line, a, m) {
  let sum = 0;
  const hashes = new Array(line.length + 1);
  for (let i = 0; i < line.length; i++) {
    sum = sum * a + line[i].charCodeAt(0);
    sum = sum % m;
    hashes[i + 1] = sum;
  }
  return hashes;
}

function prefixHash(hashes, l, r, a, m) {
  if (l === 1) {
    return hashes[r];
  }
  let hr = hashes[r];
  let hl = (hashes[l - 1] * modExp(a, r - l + 1, m)) % m;
  return mod(hr - hl, m);
}

let lineNumber = 0;
let a, m, numberOfReq;
let hashes;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    a = Number(line);
  } else if (lineNumber === 1) {
    m = Number(line);
  } else if (lineNumber === 2) {
    hashes = getHashes(line, a, m);
  } else if (lineNumber === 3) {
    numberOfReq = Number(line);
  } else {
    const [ left, right ] = line.split(' ');
    console.log(prefixHash(hashes, Number(left), Number(right), a, m));
  }
  lineNumber++;
});
