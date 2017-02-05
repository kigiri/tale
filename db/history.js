const  {
  sid,
  bool,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  userId: {
    ref:'users.id',
    required: true,
  },

  taleId: {
    ref: 'tales.id',
    required: true,
  },

  liked: bool({ default: 'FALSE' }),
}
