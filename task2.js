const { EventEmitter } = require('./task1');

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    const emitListeners = this.listeners[asyncFunc];

    if (!emitListeners) {
      return false;
    }

    this.emit('begin');
    console.time('time taken by async function');

    await Promise.all(emitListeners.map(async (listener) => await listener(args)));

    this.emit('end');
    console.timeEnd('time taken by async function');

    return true;
  }
}

const URL1 = 'https://jsonplaceholder.typicode.com/posts/1';
const URL2 = 'https://jsonplaceholder.typicode.com/posts/2';

const getPost = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    console.log('data :', result);
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('getPost', () => getPost(URL1));
withTime.on('getPost', () => getPost(URL2));

withTime.execute('getPost');
