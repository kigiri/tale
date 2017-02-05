const each = require('izi/collection/each')
const apply = value => [ value, value ]


const CREATEDAT = [
  'Creation date',
  'Date de creation',
]

module.exports = each((values, key, src) => {
  if (values.length === 1) {
    values = apply(values[0])
  }
  if (key[0] !== '$') return
  src[key] = values.map(val => {
    const args = Array.from(new Set(val.match(/(\$[0-9])/g)))
    const fnBody = val.replace(/(\$[0-9])/g, '${$1}')

    return Function(args, `return \`${fnBody}\``)
  })
  src[key].from = args => src[key].map((fn, i) => fn(args[i]))
}, {

  TABLENAME_USERS: [
    'User',
    'Utilisateur'
  ],

  TABLE_TITLE_EXEMPLE: [ 
    `Honorable scarabé`,
    'The wanderer monk'
   ],

  TABLE_USER_ID: [
    `ID of the user`,
    `ID de l'utilisateur`,
  ],
  TABLE_USER_NAME: [
    `Username`,
    `Nom d'Utilisateur`,
  ],
  TABLE_USER_SESSION: [
    `User's session token`,
    `Token de session de l'utilisateur`,
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
  TABLE_USER_PASSWORD_DESC: [
    'A hashed user password',
    `Mot de passe`,
  ],
  TABLE_USER_STATUS: [
    `User status`,
    `Status de l'utilisateur`,
  ],
  TABLE_USER_FACEBOOK: [
    'Facebook Oauth ID',
  ],
  TABLE_USER_TWITTER: [
    'Twitter Oauth ID',
  ],
  TABLE_USER_GOOGLE: [
    'Google Oauth ID',
  ],
  TABLE_USER_VERIFIED:  [
    'Email check status',
    'Etat de la verification par email',
  ],
  TABLE_USER_CREATEDAT: CREATEDAT,

  /* ANALYSIS  */

  TABLENAME_ANALYSIS: [
    'Analysis',
    'Analyse'
  ],

  TABLE_TITLE_EXEMPLE: [ 
    `Shrek: A post modern analysis`,
    'Pinnochio et ses niveaux de lecture',
   ],

  TABLE_ANALYSIS_ID: [
    `ID of the analysis`,
    `ID de l'analyse`,
  ],
  TABLE_ANALYSIS_AUTHOR: [
    `Author of the analysis`,
    `Auteur de l'analyse`,
  ],
  TABLE_TALE_ID: [
    `ID of the tale`,
    `ID du conte`,
  ],
  TABLE_ANALYSIS_TITLE: [
    `Title of the analysis`,
    `Titre de l'analyse`,
  ],
  TABLE_ANALYSIS_CONTENT: [
    `Content analysis`,
    `Contenu de l'analyse`,
  ],
  TABLE_ANALYSIS_MODIFIED: [
    `Modification of the analysis`,
    `Modification de l'analyse`,
  ],
  TABLE_ANALYSIS_CREATEDAT: CREATEDAT,


  /* HISTORY  */
  TABLENAME_HISTORY: [
    'History',
    'Historique'
  ],

  /*TABLE_TITLE_EXEMPLE: [ 
    `XXXXXXXXXXXXX`,
    'XXXXXXXXXXXXX',
   ],*/

  TABLE_USER_ID: [
    `ID of the user`,
    `ID de l'utilisateur`,
  ],
  TABLE_TALE_ID: [
    `ID of the tale`,
    `ID du conte`,
  ],
  TABLE_HISTORY_LIKED: [
    `Like of the history`,
    `Like de l'historique`,
  ],

  /* ILLUSTRATION  */
  TABLENAME_ILLUSTRATIONS: [
    'Illustration',
  ],

  TABLE_TITLE_EXEMPLE: [ 
    `"The princess and the witch" by Ladessinatrice`,
    '"La fourmie qui parlait aux poissons" par Kekro le rigolo',
   ],

  TABLE_ILLUSTRATIONS_ID: [
    `ID of the illustration`,
    `ID de l'illustration`,
  ],
  TABLE_ILLUSTRATIONS_AUTHOR: [
    `Illustration's author`,
    `Auteur de l'illustration`,
  ],
  TABLE_TALES_ID: [
    `ID of the tale`,
    `ID du conte`,
  ],
  TABLE_ILLUSTRATIONS_TAGS: [
    `Illustration's tag`,
    `Tag de l'illustration`,
  ],
  TABLE_ILLUSTRATION_CREATEDAT: CREATEDAT,

  /* MESSAGES  */
  TABLENAME_MESSAGES: [
    'Message',
  ],

  TABLE_TITLE_EXEMPLE: [ 
    '"Would you like collaborate on writing a story together ?',
    `"La morale de ta derniere histoire ?`,
   ],


  TABLE_MESSAGES_ID: [
    `ID of the message`,
    `ID du message`,
  ],
  TABLE_USER_AUTHOR: [
    `Author`,
    `Auteur`,
  ],
  TABLE_MESSAGES_SOURCETYPE: [
    `Sourcetype of the messages`,
    `Type de la source des messages`,
  ],
  TABLE_MESSAGES_SOURCEID: [
    `Sourcetype of the messages`,
    `Type de la source des messages`,
  ],
  TABLE_MESSAGES_CONTENT: [
    `Content analysis`,
    `Contenu de l'analyse`,
  ],
  TABLE_MESSAGES_MODIFIED: [
    `Modification of the messages`,
    `Modification du messages`,
  ],
  TABLE_MESSAGES_CREATEDAT: CREATEDAT,

  /* TAGS  */
  TABLENAME_TAGS: [
    'Tag',
  ],

  TABLE_TITLE_EXEMPLE: [ 
    'fairy universe',
    `africain`,
   ],

  TABLE_TAGS_ID: [
    `ID of the tag`,
    `ID du tag`,
  ],
  TABLE_TITLE: [
    `ID of the tale`,
    `ID du conte`,
  ],
  TABLE_TITLE_EXEMPLE: [ `babayaga` ],

  /* TALES  */
  TABLENAME_TALES: [
    'Tale',
    'Conte',
  ],

  TABLE_TITLE_EXEMPLE: [ 
    'The strawberry in Japan\'s emperor plate',
    `La maçon et la jardinière`,
   ],

  TABLE_TALES_ID: [
    `ID of the tale`,
    `ID du conte`,
  ],
  TABLE_TALES_TITLE: [
    `Title of tale`,
    `Titre du conte`,
  ],
  TABLE_TALES_AUTHOR: [
    `Tale's author`,
    `Auteur du conte`,
  ],
  TABLE_TALES_CONTENT: [
    `Tale's content`,
    `Contenu du conte`,
  ],
  TABLE_TALES_CONTENT: [
    `Tale's content`,
    `Contenu du conte`,
  ], 
  TABLE_TALES_TAGS: [
    `Tale's tags`,
    `Tags du conte`,
  ],
  TABLE_TALES_MODIFIED: [
    `Modification of the tale`,
    `Modification du conte`,
  ],
  TABLE_TALES_CREATEDAT: CREATEDAT,

  /* TOPICS  */
  TABLENAME_TOPICS: [
    'Topics',
  ],

  TABLE_TITLE_EXEMPLE: [ 
    'The meaning of "the Princess and the frog" story',
    `Pourquoi créér des mondes merveilleux ?`,
   ],

  TABLE_TOPICS_ID: [
    `ID of the topic`,
    `ID du sujet`,
  ],
  TABLE_TOPICS_AUTHOR: [
    `Topic's author`,
    `Auteur du sujet`,
  ],
  TABLE_TOPICS_TITLE: [
    `Title of topic`,
    `Titre du sujet`,
  ],
  TABLE_TOPICS_CONTENT: [
    `Topic's content`,
    `Contenu du sujet`,
  ],
  TABLE_TOPICS_MODIFIED: [
    `Modification of the topic`,
    `Modification du sujet`,
  ],
  TABLE_TOPICS_CREATEDAT: CREATEDAT, 


  
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

module.exports.apply = apply
// must be the size of the language count
