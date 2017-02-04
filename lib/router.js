const observ = require('izi/emiter/observ')
const loc = window.location
const parseRoute = () => loc.hash.split('?')[0].slice(2)
const route = observ.check(parseRoute())

//handle navigation
//handle url arguments

route(hash => loc.hash = `/${hash}`)
const getHashFromLocation = () => route.set(parseRoute())

let hash = window.location.hash
window.addEventListener('hashchange', getHashFromLocation)

const getRoute = () => hash
const setRoute = route =>
  route.set(route.split('/').filter(Boolean).join('/'))

module.exports = route
