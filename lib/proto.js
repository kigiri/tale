const rgx = require('./rgx')
const { isFn } = require('izi/is')
const capitalize = require('lodash/capitalize')
const trycatch = require('./trycatch')
const getMethods = obj => Object.getOwnPropertyNames(obj)
  .filter(key =>
    isFn(trycatch(() => obj[key])) && !isFn(Object.prototype[key]))

module.exports = [ Date, RegExp, Function, Array, Number, String ]
  .reduce((result, constructor) => {
    const key = constructor.name
    const proto = constructor.prototype

    if (!proto) return result

    const methods = getMethods(proto)

    if (!methods.length) return result

    result[key] = Object.create(null)

    methods.forEach(method =>
      result[`${key.toLowerCase()}${capitalize(method)}`] =
      result[key][method] = proto[method].call.bind(proto[method]))
    return result
  }, Object.create(null))


