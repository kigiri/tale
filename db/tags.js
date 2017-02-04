const {
  sid,
  char,
  text,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  title: char(16, {
    exemple: 'babayaga',
    required: true,
  }),

  description: text({ required: true }),
}
