const  {
  sid,
  bool,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  taleId: {
    ref: 'tale.id',
    notNull: true,
  },

  liked: bool({ default: 'FALSE' }),
}
