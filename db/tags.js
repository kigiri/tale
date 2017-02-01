const {
  sid,
  char,
  text,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  title: char(16, {
    exemple: 'babayaga',
    notNull: true,
  }),

  description: text({ notNull: true }),
}
