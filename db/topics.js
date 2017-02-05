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

  title: char(2, 80, {
    exemple: 'Le title de ce topic',
    required: true,
  }),

  content: text({
    exemple: `The main idea behind that story is... life, death, love and sea.`,
  }),
  
  modifiedAt: timestamp({ auto: true }),

  createdAt: timestamp({ locked: true }),
}
