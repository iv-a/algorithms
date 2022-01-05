function getPolynomialHash(base, mod, string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash * base + string.codePointAt(i)) % mod;
  }
  return hash;
}

function getStringWithSameHash() {
  const base = 1000, mod = 123987123;
  let stringA = generateString();
  let stringB = generateString();
  let hashA = getPolynomialHash(base, mod, stringA);
  let hashB = getPolynomialHash(base, mod, stringB);
  while (hashA !== hashB) {
    hashA = getPolynomialHash(base, mod, stringA);
    hashB = getPolynomialHash(base, mod, stringB);
  }
  return [stringA, stringB];
}

function generateString() {
  const alphabet = 'abcdifghijklmnopqrstuvdxyz';
  let newString = '';
  while (newString.length < 7) {
    newString += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
  }
  return newString;
}

console.log(getStringWithSameHash());