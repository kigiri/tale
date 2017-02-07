const store = require('izi/collection/store')
const i18n = require('~/i18n')
const db = require('~/data/db')

module.exports = store((s, name) =>
  s[name] = i18n[`TABLENAME_${name.toUpperCase()}`], Object.keys(db))
