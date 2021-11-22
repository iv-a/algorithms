const BUTTON = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}

function getCombinations(seq) {
  const res = new Array(seq.length).fill('');
  let i = 0;
  for (let button of seq) {
    for (let letter of BUTTON[button]) {
      res[i] += letter;
    }
    i++;
  }
  return res;
}

let ans = getCombinations('23');
console.log(ans);