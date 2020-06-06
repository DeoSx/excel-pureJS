export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
  
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('damir', data => console.log(data))
// emitter.emit('damir', 23243)
// unsub()
// emitter.emit('damir', '23')