const qs = require('../lib/query-string')
const route = require('../lib/router')
const state = require('../lib/state')

state.add('route', route)

// load state from url
state.retrieve(qs())

// clean url
window.location.hash = `/${route()}`
