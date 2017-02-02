const  {
  sid,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  author: {
    ref: 'users.id',
    notNull: true,
  },

  taleId: {
    ref: 'tale.id',
  },

  tags: { sql: 'integer[] ELEMENT REFERENCES tags' },

  createdAt: timestamp({ locked: true }),
}
