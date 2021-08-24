function combinations() {
  const readline = require('readline');
  const io_interface = readline.createInterface({input: process.stdin});

  const LETTERS = {
    TWO: 'abc',
    THREE: 'def',
    FOUR: 'ghi',
    FIVE: 'jkl',
    SIX: 'mno',
    SEVEN: 'pqrs',
    EIGHT: 'tuv',
    NINE: 'wxyz',
  };

  const KEY = {
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
  };

  function getLetters(string) {
    const letters = [];
    for (let key of string) {
      switch (key) {
        case KEY.TWO:
          letters.push(LETTERS.TWO);
          break;
        case KEY.THREE:
          letters.push(LETTERS.THREE);
          break;
        case KEY.FOUR:
          letters.push(LETTERS.FOUR);
          break;
        case KEY.FIVE:
          letters.push(LETTERS.FIVE);
          break;
        case KEY.SIX:
          letters.push(LETTERS.SIX);
          break;
        case KEY.SEVEN:
          letters.push(LETTERS.SEVEN);
          break;
        case KEY.EIGHT:
          letters.push(LETTERS.EIGHT);
          break;
        case KEY.NINE:
          letters.push(LETTERS.NINE);
          break;
      }
    }
    return letters;
  }

  function getCombinations(letters, ans, button, letter) {
    if (button < letters.length) {
      for (let sym of letters[button]) {
        getCombinations(letters, ans + sym, button + 1, letter);
      }
    } else {
      letter.push(ans);
    }
  }

  io_interface.on('line', function (line) {
    const result = [];
    getCombinations(getLetters(line), '', 0, result);
    console.log(result.join(' '));
  });
}

combinations();