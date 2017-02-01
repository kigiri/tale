const  {
  text,
  char,
  array,
  serial,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  title: char(2, 80, {
    exemple: 'The boy who liked apples',
    notNull: true,
  }),

  author: {
    ref: 'users.id',
    notNull: true,
  },

  content: text({
    exemple: `Once upon a time in far far east land,
      bla bla bla and bla bla bla...
      and they divorced.`,
  }),

  tags: { sql: 'integer[] ELEMENT REFERENCES tags' },

  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
