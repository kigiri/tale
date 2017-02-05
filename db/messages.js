const  {
  sid,
  list,
  text,
  int,
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

  sourceId: int({
    required: true,
  }),

  content: text({
    exemple: `I disagree with whatever you have to say because it is funnier`,
  }),
  
  modifiedAt: timestamp(),

  createdAt: timestamp({ locked: true }),
}
