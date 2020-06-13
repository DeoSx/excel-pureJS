import {DomListener} from '@core/DomListenter';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribe = []
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribe.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
  
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
  
  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribe.forEach(unsub => unsub())
  }
}
