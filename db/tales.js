const  {
  sid,
  text,
  char,
  array,
  serial,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  title: char(2, 80, { required: true }),

  author: {
    ref: 'users.id',
    required: true,
  },

  content: text(),

  tags: { sql: 'integer[]' }, //  ELEMENT REFERENCES tags

  updatedAt: timestamp({ auto: true }),

  createdAt: timestamp({ locked: true }),
}
