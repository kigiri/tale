const {
  timestamp,
  list,
  normalized,
  char,
  bool,
} = require('../lib/db-test-tools')

const form = {
  id: normalized(16, {
    exemple: 'jeanmi',
    notNull: true,
  }),
  session: char(32, { exemple: '0000aaaa1111bbbb0000aaaa1111bbbb' }),
  ip: char(7, 45, { exemple: '0.0.0.1' }),
  mail: {
    tests: [ {
      test: /^.+@.+$/,
      i18n: 'MAIL',
      suggestion: val => `${val}@gmail.com`,
    } ],
    map: val => val.trim().toLowerCase(),
    exemple: 'jeanmi@gmail.com',
    type: 'email',
  },
  password: {
    exemple: 'Super pa$$W0RD :)',
    tests: [ {
      test: str => str && str.length > 5,
      i18n: 'PWD',
      suggestion: (val='') =>
        val + Math.random().toString(36).slice(2, 14 - val.length),
    } ],
    type: 'password',
  },
  status: list(['banned', 'normal' ], { default: 'normal' }),
  facebook: char(32, { exemple: '605430316' }),
  twitter: char(32, { exemple: '605430316' }),
  google: char(32, { exemple: '605430316' }),
  verified: bool({
    notNull: true,
    default: 'FALSE',
  }),
  createdAt: timestamp({ locked: true }),
}

module.exports = form


console.log(form)