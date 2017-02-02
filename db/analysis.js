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
    notNull: true,
  },

  taleId: {
    ref: 'tale.id',
    notNull: true,
  },

  title: char(2, 80, {
    exemple: 'Analysis of: The boy who liked apples',
    notNull: true,
  }),

  content: text({
    notNull: true,
    exemple: `The main idea behind that story is... life, death, love and sea.`,
  }),

  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
