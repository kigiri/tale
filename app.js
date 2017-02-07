// define some usefull globals
const global = require('global/window')
global.global = global
global.noOp = () => {}
global.wesh = (...args) => (console.log(...args), args[args.length - 1])

// init data
require('~/data/route')
require('~/data/dom-events')([
  'focus',
  'hover',
//  'lbtn',
//  'mbtn',
//  'rbtn',
//  'mouseX',
//  'mouseY',
//  'domWidth',
//  'domHeight',
//  'viewWidth',
//  'viewHeight',
//  'scrollTop',
//  'scrollBottom',
])

// init CSS
const inject = require('~/lib/inject')
inject.css('./node_modules/bulma/css/bulma.css')

// start 
const { onChange } = require('~/lib/state')
const { render } = require('~/lib/h')
const main = require('~/ui/main')
const id = '_root'

if (document.getElementById(id)) {
  document.getElementById(id).remove()
}

const _root = document.createElement('div')

_root.id = id

onChange(state => render(main(state), _root))

document.body.appendChild(_root)

// init state persistence
require('~/data/persistence')
