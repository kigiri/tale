const locale = require('~/lib/state').add('locale', 1)
const i18n = require('~/i18n')

locale(i18n.set)

module.exports = locale
