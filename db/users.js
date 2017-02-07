const {
  sid,
  timestamp,
  list,
  normalized,
  char,
  bool,
} = require('../lib/db-types')

module.exports = {
  id: sid(),

  username: normalized(16, {
    required: true,
  }),

  session: char(32, { auto: true }),

  ip: char(7, 45, { auto: true }),

  mail: {
    tests: [ {
      test: /^.+@.+$/,
      i18n: 'MAIL',
      suggestion: val => `${val}@gmail.com`,
    } ],
    map: val => val.trim().toLowerCase(),
    type: 'email',
  },

  password: {
    tests: [ {
      test: str => str && str.length > 5,
      i18n: 'PWD',
      suggestion: (val='') =>
        val + Math.random().toString(36).slice(2, 14 - val.length),
    } ],
    type: 'password',
  },

  status: list([ 'normal', 'banned' ]),

  facebook: char(32, { auto: true }),

  twitter: char(32, { auto: true }),

  google: char(32, { auto: true }),

  verified: bool({
    required: true,
    default: 'FALSE',
  }),

  createdAt: timestamp({ locked: true }),
}
