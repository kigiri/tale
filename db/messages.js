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
    required: true,
  },

  sourceType: list([
    'tales',
    'messages',
    'users',
    'topics',
    'illustrations',
    'analysis',
  ], {
    required: true,
  }),

  sourceId: integer({
    required: true,
  }),

  content: text({
    exemple: `I disagree with whatever you have to say because it is funnier`,
  }),
  
  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
