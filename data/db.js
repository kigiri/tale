const each = require('izi/collection/each')
const i18n = require('~/i18n')
const state = require('~/lib/state')

const db = {
  users: require('~/db/users'),
  tales: require('~/db/tales'),
  analysis: require('~/db/analysis'),
  history: require('~/db/history'),
  illustrations: require('~/db/illustrations'),
  messages: require('~/db/messages'),
  tags: require('~/db/tags'),
  topics: require('~/db/topics'),
}

// merge with locale
each((table, tname) => each((field, fname) => {
  const id = field.id = [ 'table', tname, fname ].join('_').toUpperCase()
  field.exemple = i18n[`${id}_EXEMPLE`]
  field.locale = i18n[id]
  field.obs = state.add(id, field.default)
}, table), db)

// second pass to link refs
each((table, tname) => each((field, fname) => {
  if (field.locale) return
  if (field.ref) {
    const refKey = `TABLE_${field.ref.replace('.', '_').toUpperCase()}`
    field.locale = i18n[refKey]
    field.exemple = i18n[`${refKey}_EXEMPLE`]
  } else {
    // TODO : set a default exemple for each types
    //field.exemple = i18n[`${refKey}_EXEMPLE`]
  }
}, table), db)

module.exports = db