const loop = require('izi/loop')
const each = require('izi/collection/each')
const once =  require('lodash/once')
const remove = require('izi/arr').remove

const callAll = each(fn => fn())
const callRequested = each(fn => {
  if (fn.$$requested) {
    fn.$$requested = false
    fn()
  }
})

let request = false
let oneShotListenners = []
const listeners = []

loop(() => {
  if (request) {
    callAll(oneShotListenners)
    request = false
    oneShotListenners = []
  }
  callRequested(listeners)
})

loop.requester = fn => {
  const requester = () => fn.$$requested = true
  listeners.push(fn)
  requester.remove = once(() => remove(listeners, fn))
  return requester
}

loop.next = fn => {
  request = true
  oneShotListenners.push(fn)
}

module.exports = loop
