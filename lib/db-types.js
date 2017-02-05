const deburr = require('lodash/deburr')
const is = require('izi/is')
const rgx = require('./rgx')
const i18n = require('../i18n')

const toType = fn => (...args) => {
  const field = args[fn.length - 1] || (args[fn.length - 1] = {})

  fn(...args)

  return field
}

const flattener = (a, r) => Array.isArray(r) ? a.concat(r) : (a.push(r), a)
const flatten = arr => arr.reduce(flattener, [])

const pushTest = (field, ...args) => (field.tests || (field.tests = []))
  .push(...flatten(args))

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
  buildMsg: i18n.$TEST_A_TO_Z,
  suggestion: val => deburr(val)
    .replace(' ', '-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ''),
})

const TEST_MIN_LENGHT = (min, field) => ({
  test: val => val && val.length >= min,
  buildMsg: labels => i18n.$TEST_MIN_LENGHT.map((fn, i) => fn(labels[i], min)),
  suggestion: val => (val + Math.random().toString().slice(2)).slice(-min),
})

const TEST_MAX_LENGHT = (max, field) => ({
  test: val => val.length <= max,
  buildMsg: labels => i18n.$TEST_MAX_LENGHT.map((fn, i) => fn(labels[i], max)),
  suggestion: val => val.slice(0, max),
})

const uid = toType((size, field) => pushTest(field, [
  TEST_MIN_LENGHT(size, field),
  TEST_MAX_LENGHT(size, field),
  TEST_A_TO_Z(field),
]))


const char = (min, max, field) => {
  if (!max) {
    field = {}
    max = min
  } else if (is.obj(max)) {
    field = max
    max = min
  } else if (!field) {
    field = {}
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

  pushTest(field, {
    test: rgx(/^[^-_].*[^-_]$/),
    buildMsg: i18n.$TEST_DASH_POSITION.from,
    suggestion: val => val.replace(/[-_]/g, ''),
  }, {
    test: rgx(/^[a-zA-Z0-9]+[-_]?[a-zA-Z0-9]+$/),
    buildMsg: i18n.$TEST_DASH_COUNT.from,
    suggestion: val => {
      const [ base, ...rest ] = val.split(/[-_]/).filter(Boolean)
      const separator = val.indexOf('-') ===  -1 ? '_' : '-'

      return `${base}${separator}${rest.join('')}`
    },
  })

  return field
}

const bool = toType(field => {
  field.sql = 'BOOLEAN'
  field.type = 'checkbox'
})
const int = toType(field => field.sql = 'INTEGER')
const text = toType(field => field.sql = 'TEXT')
const serial = toType(field => {
  field.exemple || (field.exemple = 1337)
  field.sql = 'SERIAL'
})

const timestamp = toType(field => {
  field.sql = 'TIMESTAMP'
  field.default = 'CURRENT_TIMESTAMP'
  field.required = true
})

const sid = toType(field => {
  serial(field)
  field.locked = true
})

const array = {
  integer: toType(fields => fields.sql = 'integer[]'),
}

module.exports = {
  int,
  bool,
  array,
  serial,
  base64,
  timestamp,
  normalized,
  char,
  text,
  sid, // serial id
  uid, // unique id
  list,
  i18n,
}
