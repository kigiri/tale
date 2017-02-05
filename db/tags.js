const {
  sid,
  char,
  text,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  title: char(2, 64, { required: true }),
}
