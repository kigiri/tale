const deburr = require('lodash/deburr')
const rgx = require('../../lib/rgx')
const i18n = require('../i18n')

const list = (values, field = {}) => {
  (field.tests || (field.tests = [])).push({
    msg: i18n.$TEST_ENUM_ONEOF.map(fn => fn(values.join(', '))),
    test: str => roles.indexOf(str) !== -1,
    suggestion: () => roles[0],
  })

  field.sql = `ENUM(${values.map(JSON.stringify).join(', ')})`
  field.type = 'selection'
  field.values = values
  return field
}

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

const id = (size, field) => {
  (field.tests || (field.tests = [])).push(TEST_MIN_LENGHT(size, field),
    TEST_MAX_LENGHT(size, field),
    TEST_A_TO_Z(field))

  return field
}

const getOrInitTests = field => (field.tests || (field.tests = [])).tests

const char = (min, max, field) => {
  if (!field) {
    field = (max || {})
    max = min
  }

  field.sql = `${min === max ? 'CHAR' : 'VARCHAR'}(${max})`

  getOrInitTests(field).push(TEST_MIN_LENGHT(min, field),
    TEST_MAX_LENGHT(max, field))

  return field
}

const base64 = (field = {}) => {
  getOrInitTests(field).test(TEST_A_TO_Z(field))

  field.map || (field.map = val => val.trim())

  return field
}

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

const bool = (field = {}) => {
  field.sql = 'BOOLEAN'

  return field
}

const timestamp = (field = {}) => {
  field.sql = 'TIMESTAMP'
  field.default = 'CURRENT_TIMESTAMP'
}

module.exports = {
  bool,
  base64,
  normalized,
  char,
  id,
  list,
  i18n,
}
