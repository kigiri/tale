const  {
  sid,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  author: {
    ref: 'users.id',
    required: true,
  },

  taleId: {
    ref: 'tales.id',
  },

  tags: { sql: 'integer[] ELEMENT REFERENCES tags' },

  createdAt: timestamp({ locked: true }),
}
