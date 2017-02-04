// define some usefull globals
const global = require('global/window')
global.noOp = () => {}
global.wesh = (...args) => (console.log(...args), args[args.length - 1])

// require the good stuff
const each = require('izi/collection/each')
const state = require('../data/state')
const { render } = require('../lib/h')
const app = require('../ui/app')
const id = '_root'

if (document.getElementById(id)) {
  document.getElementById(id).remove()
}

const _root = document.createElement('div')

_root.id = id

state.onChange(state => render(app(state), _root))

document.body.appendChild(_root)
