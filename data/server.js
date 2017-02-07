const state = require('~/data/state')
const formatFields = require('~/lib/format-field')
const wsRoutes = require('~/api/ws-routes')
const each = require('izi/collection/each')

//init weso
const weso = require('~/lib/weso-browser')
const server = weso({
  url: 'dev.houst.fr/ws/',
  secure: true,
  retryDelay: 10000,
  publish: wsRoutes.client,
  subscribe: wsRoutes.server,
})

const user = state.add('user')

const newDate = v => v && (new Date(v))
const parseFields = formatFields({
  createdAt: newDate,
  editedAt: newDate,
  requestedAt: newDate,
  deliveredAt: newDate,
  removedAt: newDate,
  max: Number,
})

const parseEachFields = each(parseFields)
const addStatus = each(msg => msg.status = 'success')

server.on.open(() => {
  server.user(({ data }) =>
    state.user.set(data))

  server.messages(({ data }) =>
    state.messages.set(addStatus(parseEachFields(data))))

  server.chatSuccess(({ data }) =>
    state.messages.merge(data, { status: 'success' }))

  server.chatFail(({ data }) => {
    console.error('post message failed, error code:', data.error)
    state.messages.merge(data.id, { status: 'fail' })
  })
})

server.on.close(err => {
  if (err.code === 1999) {
  } else console.error(err)
})

module.exports = server
