const H = Object.create.bind(Object, null)
const reduce = require('lodash/reduce')
const each = require('lodash/each')
const ensurePath = (acc, subKey) => acc[subKey] || (acc[subKey] = H())
const last = list => list[list.length - 1]
const hasBody = method => method === 'PUT' || method === 'POST'
const toJSON = res => {
  if (res.ok) return res.json()
  const err = Error(res.statusText)
  err.code = err.status = res.status
  throw err
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const baseReq = (url, opts) => fetch(url, opts).then(toJSON)
const buildMethod = (baseUrl, m, arg, paramsKeys) => {
  const method = m.toUpperCase()
  const handlers = []
  if (arg) {
    handlers.push((acc, arg) => acc.url = `${acc.url}/${arg}`)
  }

  if (hasBody(method)) {
    handlers.push((acc, body) => acc.opts.body = JSON.stringify(body))
  }

  if (paramsKeys && paramsKeys.length) {
    handlers.push((acc, params) => acc.url += '?'+ paramsKeys
      .map(key => params[key] && `${key}=${encodeURIComponent(params[key])}`)
      .filter(Boolean)
      .join('&'))
  }

  const applyArg = (acc, arg, i) => (handlers[i](acc, arg), acc)
  return (...args) => {
    const { url, opts } = reduce(args, applyArg, {
      url: baseUrl,
      opts: { method, headers },
    })
    return fetch(url, opts).then(toJSON)
  }
}

module.exports = (endpoint, schema) => {
  endpoint = endpoint.replace(/\/+$/, '')
  if (/:\/\//.test(endpoint)) {
    endpoint = `http://${endpoint}`
  }

  return reduce(schema, (acc, routeArgs, path) => {
    const methods = (typeof routeArgs === "string")
      ? ({ [routeArgs]: [] })
      : routeArgs.methods

    const keys = path.split('/').filter(Boolean)
    const lastKey = keys.pop()
    const baseUrl = `${endpoint}/${path}`

    const methodKeys = Object.keys(methods)
    const endPath = reduce(keys, ensurePath, acc)
    const firstMethod = methodKeys.pop()
    const params = methods[firstMethod]
    const methodFn = buildMethod(baseUrl, firstMethod, routeArgs.arg)
    endPath[lastKey] = methodFn
    methodFn[firstMethod] = methodFn

    if (methodKeys.length) {
      each(methodKeys, m => {
        endPath[m] = buildMethod(baseUrl, m, routeArgs.arg, methods[m])
      })
    }

    return acc
  }, H())
}


console.log(module.exports('http://localhost:8500/v1', {
  'catalog/register': 'put',
  'catalog/deregister': 'put',
  'catalog/datacenters': 'get',
  'catalog/nodes': 'get',
  'catalog/services': 'get',
  'catalog/service': { methods: { get: [ 'dc', 'near' ] }, arg: 'service' },
  'catalog/node': { methods: { get: [ 'dc' ] }, arg: 'node' },
  'kv': {
    arg: 'key',
    methods: {
      get: [ 'dc', 'token', 'recurse' ],
      put: [ 'flags', 'cas', 'acquire', 'release' ],
      delete: [ 'recurse', 'cas' ],
    },
  },
}))
  
