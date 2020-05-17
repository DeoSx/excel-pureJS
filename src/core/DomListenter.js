import {capitalize} from '@/core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided from DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getListenerName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getListenerName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getListenerName(listener) {
  return 'on' + capitalize(listener);
}
