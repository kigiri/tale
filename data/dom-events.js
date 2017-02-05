const event = require('../lib/event')
const each = require('izi/collection/each')
const { add } = require('../lib/state')

module.exports = each(key => add(key, event[key]))