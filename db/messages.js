const  {
  sid,
  list,
  text,
  integer,
  timestamp,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  author: {
    ref: 'users.id',
    notNull: true,
  },

  sourceType: list([
    'tale',
    'message',
    'user',
    'topic',
    'illustration',
    'analysis',
  ], {
    notNull: true,
  }),

  sourceId: integer({
    notNull: true,
  }),

  content: text({
    exemple: `I disagree with whatever you have to say because it is funnier`,
  }),
  
  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
