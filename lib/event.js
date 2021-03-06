const document = require('global/document')
const window = require('global/window')
const observ = require('izi/emiter/observ')
const each = require('izi/collection/each')
const loop = require('izi/loop')

const base = document.documentElement

const mouseState = {
  hover: document.body,
  x: 0,
  y: 0,
  m: false,
  r: false,
  l: false,
}

const mouseKeys = {
  1:'l',
  2:'m',
  3:'r',
}

const domState = {
  top: 0,
  width: 0,
  height: 0,
}

const updates = []

const linker = getter => {
  let prev = getter()
  const val = observ(prev)

  updates.push(() => {
    const next = getter()

    if (next !== prev) {
      val.set(prev = next)
    }
  })

  return val
}

const scrollTop = observ(0)
const scrollBottom = observ(0)
const setIfChanged = (obs, val) => obs() !== val && obs.set(val)

const calcScroll = top => {
  setIfChanged(scrollTop, top)
  setIfChanged(scrollBottom, top + window.innerHeight)
}

const exec = each(fn => fn())

const updateDom = () => {
  const { width, height, top } = base.getBoundingClientRect()

  const activeElement = document.activeElement
  if (activeElement.__update_observable__) {
    activeElement.__update_observable__(activeElement.textContent)
  }

  domState.width = width
  domState.height = height
  if (domState.top !== top) {
    calcScroll(Math.abs(domState.top = top))
  }
  exec(updates)
}

const clearButtons = () => mouseState.m = mouseState.r = mouseState.l = false

if (window.addEventListener) {
  window.addEventListener('mousedown',
    event => mouseState[mouseKeys[event.which]] = true)

  window.addEventListener('mouseup',
    event => mouseState[mouseKeys[event.which]] = false)

  window.addEventListener('mousemove', event => {
    mouseState.x = event.pageX
    mouseState.y = event.pageY
    mouseState.hover = event.target
    if (!event.which) {
      clearButtons()
    }
  })
  updateDom()
  loop(updateDom)
}

module.exports = {
  scrollTop,
  scrollBottom,
  mbtn: linker(() => mouseState.m),
  rbtn: linker(() => mouseState.r),
  lbtn: linker(() => mouseState.l),
  mouseX: linker(() => mouseState.x),
  mouseY: linker(() => mouseState.y),
  hover: linker(() => mouseState.hover),
  focus: linker(() => document.activeElement),
  domWidth: linker(() => domState.width),
  domHeight: linker(() => domState.height),
  viewWidth: linker(() => window.innerWidth),
  viewHeight: linker(() => window.innerHeight),
  // add touch watchers
}
