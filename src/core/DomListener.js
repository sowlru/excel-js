import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners=[]) {
    if (!$root) {
      throw new Error('No root...')
    }
    this.$root = $root
    this.listeners = listeners
  }
  initDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name || ''} C`
        )
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }
  removeDOMListener() { }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
