const each = require('izi/each')

const CREATEDAT = [
  'Creation date',
  'Date de creation',
]

module.exports = each((values, key, src) => {
  if (key.length === 1) {
    key.push(key[0])
  }
  if (key[0] !== '$') return
  src[key] = values.map(val => {
    const args = Array.from(new Set(val.match(/(\$[0-9])/g)))
    const fnBody = val.replace(/(\$[0-9])/g, '${$1}')

    return Function(args, `return \`${fnBody}\``)
  })
  src[key].from = args => src[key].map((fn, i) => fn(args[i]))
}, {
  TABLE_USER_ID: [
    `Username`,
    `Nom d'Utilisateur`,
  ],
  TABLE_USER_SESSION: [
    `User's session token`,
    `Token de la session de l'utilisateur`,
  ],
  TABLE_USER_IP: [
    `User's IP Adress`,
    `Adresse IP de l'utilisateur`,
  ],
  TABLE_USER_MAIL: [
    'Email',
  ],
  TABLE_USER_PASSWORD: [
    'Password',
    `Mot de passe`,
  ],
  TABLE_USER_STATUS: [
    `User status`,
    `Status de l'utilisateur`,
  ],
  TABLE_USER_FACEBOOK: [
    'Facebook Oauth ID',
    'Facebook Oauth ID',
  ],
  TABLE_USER_TWITTER: [
    'Twitter Oauth ID',
    'Twitter Oauth ID',
  ],
  TABLE_USER_GOOGLE: [
    'Google Oauth ID',
    'Google Oauth ID',
  ],
  TABLE_USER_VERIFIED:  [
    'Email check status',
    'Etat de la verification par email',
  ],
  TABLE_USER_CREATEDAT: CREATEDAT,
  SIGN_OUT: [
    'Sign out',
    'Deconnexion',
  ],
  SIGN_IN: [
    'Sign in',
    'Connexion',
  ],
  $DATE_TODAY: [
    `Today at $0`,
    `Aujourd'hui a $0`,
  ],
  $DATE_YESTERDAY: [
    `Yesterday at $0`,
    `Hier a $0`,
  ],
  TEST_MAIL: [
    'Your email is missing an @',
    `Il faut une @ dans un email`,
  ],
  TEST_PWD: [
    `It seems a bit short for a password doesn't it ? try a longer one`,
    `Un peu court comme mot de passe, essayez-en un plus long`,
  ],
  TEST_MESSAGE_TOO_LONG: [
    `Senpai, it's too big ! Such a message will never fit...`,
    `Votre message est trop long, ca ne rentrera jamais !`,
  ],
  $TEST_A_TO_Z: [
    `$0 can contain only characteres between A and Z or numbers`,
    `$0 ne peu contenir uniquement des lettres de A a Z ou des chiffres`,
  ],
  $TEST_MIN_LENGHT: [
    `$0 must be at least $1 characters`,
    `$0 doit faire au moins $1 lettres`,
  ],
  $TEST_MAX_LENGHT: [
    `$0 can't use more than $1 characters`,
    `$0 ne doit pas faire plus de $1 lettres`,
  ],
  $TEST_DASH_POSITION: [
    `$0 can not start or end with a dash`,
    `$0 ne peu pas commencer ou ce terminer par un tiret`,
  ],
  $TEST_DASH_COUNT: [
    `$0 can contain only one dash`,
    `$0 ne peu contenir qu'un seul tiret`,
  ],
  $TEST_ENUM_ONEOF: [
    `Must be one of: $0.`,
    `Doit etre un de ses choix: $0.`,
  ],
})


module.exports.apply = str => [ str, str ]
// must be the size of the language count
