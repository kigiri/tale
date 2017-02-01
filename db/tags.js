const {
  normalized,
  text,
} = require('../lib/db-test-tools')

module.exports = {
  id: normalized(16, {
    exemple: 'jeanmi',
    notNull: true,
  }),
  description: text({
    notNull: true,
  }),
}
