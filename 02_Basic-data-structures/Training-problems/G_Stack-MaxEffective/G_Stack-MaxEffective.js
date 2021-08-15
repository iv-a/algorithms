const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  MESSAGE: {
    ERROR: 'error',
    NONE: 'None',
  },
  COMMAND: {
    PUSH: 'push',
    POP: 'pop',
    GET_MAX: 'get_max',
  }
}


let numberOfCommands;
let stack;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
    stack = new StackMax();
  } else if (_curLine <= numberOfCommands) {
    doCommand(line);
  }
  _curLine++;
});

class StackMax {
  constructor() {
    this.stack = [];
    this.stackMax = [];
  }

  push(item) {
    if (this.stackMax.length) {
      if (this.stackMax[this.stackMax.length - 1] <= item) {
        this.stackMax.push(item);
      }
    } else {
      this.stackMax.push(item);
    }
    this.stack.push(item);
  }

  pop() {
    if (this.stack.length) {
      const res = this.stack.pop();
      if (res === this.stackMax[this.stackMax.length - 1]) {
        this.stackMax.pop();
      }
    } else {
      return print(CONSTANTS.MESSAGE.ERROR);
    }
  }

  getMax() {
    if (this.stackMax.length) {
      print(this.stackMax[this.stackMax.length - 1]);
    } else {
      return print(CONSTANTS.MESSAGE.NONE);
    }
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUSH: {
      stack.push(readInt(item));
      break;
    }
    case CONSTANTS.COMMAND.POP: {
      stack.pop();
      break;
    }
    case CONSTANTS.COMMAND.GET_MAX: {
      stack.getMax();
      break;
    }
  }
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function print(message) {
  process.stdout.write(message.toString() + '\n');
}