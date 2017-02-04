const i18n = require('../api/i18n')
const iziDate = require('./izi-date')

const date = iziDate('M/DD/YYYY')
const time = iziDate('h:mm A')
const time24 = iziDate('H:mm')

const i18nTimes = [ time, time24 ]

const day = 24 * 60 * 60 * 1000
const yesterday = day * 2
const week = day * 7

module.exports = d => {
  const delta = Date.now() - d.getTime()
  if (delta < day) return i18n.$DATE_TODAY.map((fn, i) => fn(i18nTimes[i](d)))
  return delta < yesterday
    ? i18n.$DATE_YESTERDAY.map((fn, i) => fn(i18nTimes[i](d)))
    : i18n.apply(date(d))
}
