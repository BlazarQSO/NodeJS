class EventEmitter {
  listeners = {};

  addListener(eventName, cb) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(cb);

    return this;
  }

  on(eventName, cb) {
    return this.addListener(eventName, cb);
  }

  removeListener(eventName, cb) {
    const changeListeners = this.listeners[eventName];

    if (!changeListeners) {
      return this;
    }

    const removeElementByIndex = changeListeners.findLastIndex((listener) => listener === cb);
    if (removeElementByIndex >= 0) {
      changeListeners.splice(removeElementByIndex, 1);
    }

    return this;
  }

  off(eventName, cb) {
    return this.removeListener(eventName, cb);
  }

  once(eventName, cb) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceListener = () => {
      cb();
      this.off(eventName, onceListener);
    }

    this.listeners[eventName].push(onceListener);

    return this;
  }

  emit(eventName, ...args) {
    const emitListeners = this.listeners[eventName];

    if (!emitListeners) {
      return false;
    }

    emitListeners.forEach((listener) => listener(args));

    return true;
  }

  listenerCount(eventName) {
    return (this.listeners[eventName] || []).length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

module.exports = EventEmitter;
