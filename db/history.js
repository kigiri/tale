const  {
  sid,
  bool,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  taleId: {
    ref: 'tales.id',
    required: true,
  },

  liked: bool({ default: 'FALSE' }),
}
