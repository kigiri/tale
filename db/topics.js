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
    notNull: true,
  },

  title: char(2, 80, {
    exemple: 'Le title de ce topic',
    notNull: true,
  }),

  content: text({
    exemple: `The main idea behind that story is... life, death, love and sea.`,
  }),
  
  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
