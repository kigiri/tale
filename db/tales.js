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

  title: char(2, 80, {
    exemple: 'The boy who liked apples',
    required: true,
  }),

  author: {
    ref: 'users.id',
    required: true,
  },

  content: text({
    exemple: `Once upon a time in far far east land,
      bla bla bla and bla bla bla...
      and they divorced.`,
  }),

  tags: { sql: 'integer[] ELEMENT REFERENCES tags' },

  modifiedAt: timestamp({ auto: true }),

  createdAt: timestamp({ locked: true }),
}
