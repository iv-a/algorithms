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
    GET: 'get',
    PUT: 'put',
    SIZE: 'size',
  }
};


let numberOfCommands, queue;
const result = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfCommands = readInt(line);
    queue = new ListQueue(readInt(line));
  } else if (_curLine < numberOfCommands) {
    doCommand(line);
  } else if (_curLine === numberOfCommands) {
    doCommand(line);
    process.stdout.write(result.join('\n'));
  }
  _curLine++;
});

class Node {
  constructor(value = null, next = null) {
    this.next = next;
    this.value = value;
  }
}

class ListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.queueSize = 0;
  }

  get() {
    if (this._isEmpty()) {
      result.push(CONSTANTS.MESSAGE.ERROR);
    } else {
      result.push(this.head.value);
      this.head = this.head.next;
      this.queueSize--;
    }
  }

  put(value) {
    let currentTail = this.tail;
    this.tail = new Node(value, null);
    if (this._isEmpty()) {
      this.head = this.tail;
    } else {
      currentTail.next = this.tail;
    }
    this.queueSize++;
  }

  size() {
    result.push(this.queueSize);
  }

  _isEmpty() {
    return this.queueSize === 0;
  }
}

function doCommand(line) {
  const [ command, item ] = line.split(' ');
  switch (command) {
    case CONSTANTS.COMMAND.PUT: {
      queue.put(item);
      break;
    }
    case CONSTANTS.COMMAND.GET: {
      queue.get();
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
  process.stdout.write(message + '\n');
}