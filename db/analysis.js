const  {
  sid,
  char,
  text,
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
    required: true,
  },

  title: char(2, 80, { required: true }),

  content: text({ required: true }),

  updatedAt: timestamp({ auto: true }),

  createdAt: timestamp({ locked: true }),
}
