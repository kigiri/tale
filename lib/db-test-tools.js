const deburr = require('lodash/deburr')
const rgx = require('../../lib/rgx')
const i18n = require('../i18n')

const toType = fn => (...args) => {
  const field = args[fn.length - 1] || (args[fn.length - 1] = {})

  fn(...args)

  return field
}

const flattener = (a, r) => Array.isArray(r) ? a.concat(r) : (a.push(r), a)
const flatten = arr => arr.reduce(flattener)

const pushTest = (field, ...args) => (field.tests || (field.tests = []))
  .tests.push(...flatten(args))

const list = toType((values, field) => {
  pushTest(field, {
    msg: i18n.$TEST_ENUM_ONEOF.map(fn => fn(values.join(', '))),
    test: str => roles.indexOf(str) !== -1,
    suggestion: () => roles[0],
  })

  field.sql = `ENUM(${values.map(JSON.stringify).join(', ')})`
  field.type = 'selection'
  field.values = values
})

const TEST_A_TO_Z = field => ({
  test: rgx(/^[a-zA-Z0-9_-]+$/),
  msg: i18n.$TEST_A_TO_Z.from(field.label),
  suggestion: val => deburr(val)
    .replace(' ', '-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ''),
})

const TEST_MIN_LENGHT = (min, field) => ({
  test: val => val && val.length >= min,
  msg: i18n.$TEST_MIN_LENGHT.map((fn, i) => fn(field.label[i], min)),
  suggestion: val => (val + Math.random().toString().slice(2)).slice(-min),
})

const TEST_MAX_LENGHT = (max, field) => ({
  test: val => val.length <= max,
  msg: i18n.$TEST_MAX_LENGHT.map((fn, i) => fn(field.label[i], max)),
  suggestion: val => val.slice(0, max),
})

const id = toType((size, field) => pushTest(field, [
  TEST_MIN_LENGHT(size, field),
  TEST_MAX_LENGHT(size, field),
  TEST_A_TO_Z(field),
]))


const char = (min, max, field) => {
  if (!field) {
    field = (max || {})
    max = min
  }

  field.sql = `${min === max ? 'CHAR' : 'VARCHAR'}(${max})`

  pushTest(field, [
    TEST_MIN_LENGHT(min, field),
    TEST_MAX_LENGHT(max, field),
  ])

  return field
}

const base64 = toType(field => {
  pushTest(field, TEST_A_TO_Z(field))
  field.map || (field.map = val => val.trim())
})

const normalized = (min, max, field) => {
  field = char(min, max, field)
  field.map || (field.map = val => val.trim().toLowerCase())

  base64(field)

  getOrInitTests(field).push({
    test: rgx(/^[^-_].*[^-_]$/),
    msg: i18n.$TEST_DASH_POSITION.from(field.label),
    suggestion: val => val.replace(/[-_]/g, ''),
  }, {
    test: rgx(/^[a-zA-Z0-9]+[-_]?[a-zA-Z0-9]+$/),
    msg: i18n.$TEST_DASH_COUNT.from(field.label),
    suggestion: val => {
      const [ base, ...rest ] = val.split(/[-_]/).filter(Boolean)
      const separator = val.indexOf('-') ===  -1 ? '_' : '-'

      return `${base}${separator}${rest.join('')}`
    },
  })

  return field
}

const bool = toType(field => field.sql = 'BOOLEAN')
const text = toType(field => field.sql = 'TEXT')
const serial = toType(field => {
  field.exemple || (field.exemple = 1337)
  field.sql = 'SERIAL'
})

const timestamp = toType(field => {
  field.sql = 'TIMESTAMP'
  field.default = 'CURRENT_TIMESTAMP'
  field.notNull = true
})

module.exports = {
  bool,
  serial,
  base64,
  normalized,
  char,
  text,
  id,
  list,
  i18n,
}
