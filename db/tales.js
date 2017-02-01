const  {
  text,
  char,
  serial,
  timestamp,
} = require('../lib/db-test-tools')

module.exports = {
  
  id: serial({
    locked: true,
    notNull: true,
  }),

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
  
  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
