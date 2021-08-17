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
    PEEK: 'peek',
    SIZE: 'size',
  }
}


let numberOfCommands, maxSize, queue;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
  } else if (_curLine === 1) {
    maxSize = readInt(line);
    queue = new LimitedQueue(readInt(line));
  } else if (_curLine < numberOfCommands + 2) {
    doCommand(line);
  }
  _curLine++;
});

class LimitedQueue {
  constructor(maxSize) {
    this.queue = new Array(maxSize);
    this.maxSize = maxSize;
    this.head = 0;
    this.tail = 0;
    this.queueSize = 0;
  }

  _isEmpty() {
    return this.queueSize === 0;
  }

  push(item) {
    if (this.queueSize !== this.maxSize) {
      this.queue[this.tail] = item;
      this.tail = (this.tail + 1) % this.maxSize;
      this.queueSize += 1;
    } else {
      print(CONSTANTS.MESSAGE.ERROR);
    }
  }

  pop() {
    if (this._isEmpty()) {
      print(CONSTANTS.MESSAGE.NONE);
    } else {
      const item = this.queue[this.head];
      this.head = (this.head + 1) % this.maxSize;
      this.queueSize--;
      print(item);
    }
  }

  peek() {
    if (this._isEmpty()) {
      print(CONSTANTS.MESSAGE.NONE);
    } else {
      print(this.queue[this.head]);
    }
  }

  size() {
    print(this.queueSize);
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUSH: {
      queue.push(readInt(item));
      break;
    }
    case CONSTANTS.COMMAND.POP: {
      queue.pop();
      break;
    }
    case CONSTANTS.COMMAND.PEEK: {
      queue.peek();
      break;
    }
    case CONSTANTS.COMMAND.SIZE: {
      queue.size();
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