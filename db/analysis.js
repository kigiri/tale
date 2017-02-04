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

  title: char(2, 80, {
    exemple: 'Analysis of: The boy who liked apples',
    required: true,
  }),

  content: text({
    required: true,
    exemple: `The main idea behind that story is... life, death, love and sea.`,
  }),

  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
