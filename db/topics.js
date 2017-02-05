const  {
  text,
  char,
  sid,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  author: {
    ref: 'users.id',
    required: true,
  },

  title: char(2, 80, { required: true }),

  content: text(),
  
  modifiedAt: timestamp({ auto: true }),

  createdAt: timestamp({ locked: true }),
}
