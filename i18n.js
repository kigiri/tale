const i18n = require('~/lib/i18n')
const iziDate = require('~/lib/izi-date')

const UPDATEDAT = [
  'Last modified date',
  'Date de la derniere modification',
]

const CREATEDAT = [
  'Creation date',
  'Date de creation',
]

module.exports = i18n({

  LOCALE: [
    'English',
    'Français',
  ],

  /////////////////
  /* Date format */
  /////////////////

  DATE_FORMAT: [
    'M/DD/YYYY',
    'DD/MM/YYYY',
  ].map(iziDate),

  TIME_FORMAT: [
    'h:mm A',
    'H:mm',
  ].map(iziDate),


  ////////////////////
  /* DB definitions */
  ////////////////////

  /* USERS */
  TABLENAME_USERS: [
    'User',
    'Utilisateur'
  ],
  TABLE_USERS_ID: [
    `User's ID`,
    `ID de l'utilisateur`,
  ],
  TABLE_USERS_USERNAME: [
    `Username`,
    `Nom d'utilisateur`,
  ],
  TABLE_USERS_USERNAME_EXEMPLE: [
    'Slamtimbanque',
    `Honorable-scarabe`,
   ],
  TABLE_USERS_SESSION: [
    `User's session token`,
    `Token de session de l'utilisateur`,
  ],
  TABLE_USERS_IP: [
    `User's IP Adress`,
    `Adresse IP de l'utilisateur`,
  ],
  TABLE_USERS_MAIL: [
    'Email',
  ],
  TABLE_USERS_MAIL_EXEMPLE: [
    'boulga@boulgi.com',
  ],
  TABLE_USERS_PASSWORD: [
    'Password',
    `Mot de passe`,
  ],
  TABLE_USERS_PASSWORD_DESC: [
    'A hashed user password',
    `Mot de passe`,
  ],
  TABLE_USERS_STATUS: [
    `User status`,
    `Status de l'utilisateur`,
  ],
  TABLE_USERS_FACEBOOK: [
    'Facebook Oauth ID',
  ],
  TABLE_USERS_TWITTER: [
    'Twitter Oauth ID',
  ],
  TABLE_USERS_GOOGLE: [
    'Google Oauth ID',
  ],
  TABLE_USERS_VERIFIED:  [
    'Email checked',
    'Vérifié par email',
  ],
  TABLE_USERS_CREATEDAT: CREATEDAT,

  /* ANALYSIS  */
  TABLENAME_ANALYSIS: [
    'Analysis',
    'Analyse'
  ],
  TABLE_ANALYSIS_ID: [
    `ID of the analysis`,
    `ID de l'analyse`,
  ],
  TABLE_ANALYSIS_AUTHOR: [
    `Author of the analysis`,
    `Auteur de l'analyse`,
  ],
  TABLE_ANALYSIS_AUTHOR_EXEMPLE: [
    `Papyrus_Scribe`,
    `Analyste_trolleur`,
  ],
  TABLE_ANALYSIS_TITLE: [
    `Analysis's title`,
    `Titre de l'analyse`,
  ],
  TABLE_ANALYSIS_TITLE_EXEMPLE: [ 
    `Shrek: A post modern analysis`,
    'Pinnochio et ses nveaux de lecture',
   ],
  TABLE_ANALYSIS_CONTENT: [
    `Analysis's content`,
    `Contenu de l'analyse`,
  ],
  TABLE_ANALYSIS_CONTENT_EXEMPLE: [
    `Let's analyse this story ... bla bla bla. What do you think about this interpretation ?`,
    `Analysons cette histoire ... bla bla bla. Que pensez vous de mon analayse ?`,
  ],
  TABLE_ANALYSIS_UPDATEDAT: UPDATEDAT,
  TABLE_ANALYSIS_CREATEDAT: CREATEDAT,


  /* HISTORY  */
  TABLENAME_HISTORY: [
    'History',
    'Historique'
  ],

  TABLE_HISTORY_ID: [
    `History's ID`,
    `ID de l'historique`,
  ],

  TABLE_HISTORY_LIKED: [
    `Liked`,
    `J'aime`,
  ],

  /* ILLUSTRATION  */
  TABLENAME_ILLUSTRATIONS: [
    'Illustration',
  ],
  TABLE_ILLUSTRATIONS_ID: [
    `ID of the illustration`,
    `ID de l'illustration`,
  ],
  TABLE_ILLUSTRATIONS_AUTHOR: [
    `Illustration's author`,
    `Auteur de l'illustration`,
  ],
  TABLE_ILLUSTRATIONS_AUTHOR_EXEMPLE: [
    `Donald_Drawer`,
    `Modigliani_Da_Vinci`,
  ],
    TABLE_ILLUSTRATIONS_TITLE: [ 
    `Illustration's title`,
    'Titre de l\'illustration',
   ],
  TABLE_ILLUSTRATIONS_TITLE_EXEMPLE: [ 
    `"The princess and the witch" by Ladessinatrice`,
    '"La fourmie qui parlait aux poissons" par Kekro le rigolo',
   ],
  TABLE_ILLUSTRATIONS_TAGS: [
    `Illustration's tag`,
    `Tag de l'illustration`,
  ],
  TABLE_ILLUSTRATIONS_CREATEDAT: CREATEDAT,

  /* MESSAGES  */
  TABLENAME_MESSAGES: [
    'Message',
  ],
  TABLE_MESSAGES_ID: [
    `ID of the message`,
    `ID du message`,
  ],
  TABLE_MESSAGES_AUTHOR: [
    `Author`,
    `Auteur`,
  ],
  TABLE_MESSAGES_AUTHOR_EXEMPLE: [
    `Honorable-scarabe`,
    `Slamtimbanque`,
  ],

  TABLE_MESSAGES_SOURCETYPE: [
    `Sourcetype of the message`,
    `Type de message`,
  ],

  TABLE_MESSAGES_SOURCEID: [
    `Message's sourcetype ID`,
    `ID du sourcetype du message`,
  ],

  TABLE_MESSAGES_CONTENT: [
    `Message's content`,
    `Contenu du message`,
  ],
  TABLE_MESSAGES_CONTENT_EXEMPLE: [
    `Hey ! Where are you ? It's been a while we haven't seen you.`,
    `Coucou camarade! Y a Maupassant et Victor Hugo qui demandent aprés toi. Tu reviens quand ?`,
  ],
  TABLE_MESSAGES_UPDATEDAT: UPDATEDAT,
  TABLE_MESSAGES_CREATEDAT: CREATEDAT,

  /* TAGS  */
  TABLENAME_TAGS: [
    'Tags',
  ],
  TABLE_TAGS_ID: [
    `ID of the tag`,
    `ID du tag`,
  ],
  TABLE_TAGS_TITLE: [ 
    `Tag's title`,
    `Intitulé du tag`,
   ],

  TABLE_TAGS_EXEMPLE: [ 
    'fairy universe',
    `africain`,
   ],

  /* TALES  */
  TABLENAME_TALES: [
    'Tale',
    'Conte',
  ],
    TABLE_TALES_ID: [
    `Tale's ID`,
    `ID du conte`,
  ],
  TABLE_TALES_AUTHOR: [
    `Tale's author`,
    `Auteur du conte`,
  ],
  TABLE_TALES_AUTHOR_EXEMPLE: [
    `Honorable-scarabe`,
    `Slamtimbanque`,
  ],
  TABLE_TALES_TITLE: [
    `Tale's title`,
    `Titre du conte`,
  ],
  TABLE_TALES_TITLE_EXEMPLE: [ 
    'The strawberry in Japan\'s emperor plate',
    `La maçon et la jardinière`,
   ],
  TABLE_TALES_CONTENT: [
    `Tale's content`,
    `Contenu du conte`,
  ],
  TABLE_TALES_CONTENT_EXEMPLE: [
    `Once upon a time in a very far place ...stories about us were told.`,
    `Il y a bien longtemps sur des terres lointaines ... des histoires à notre sujet fûrent racontés`,
  ], 
  TABLE_TALES_TAGS: [
    `Tale's tags`,
    `Tags du conte`,
  ],
  TABLE_TALES_UPDATEDAT: UPDATEDAT,
  TABLE_TALES_CREATEDAT: CREATEDAT,

  /* TOPICS  */
  TABLENAME_TOPICS: [
    'Topics',
  ],
  TABLE_TOPICS_ID: [
    `ID of the topic`,
    `ID du sujet`,
  ],
  TABLE_TOPICS_AUTHOR: [
    `Topic's author`,
    `Auteur du sujet`,
  ],
  TABLE_TOPICS_AUTHOR_EXEMPLE: [
    `Slamtimbanque`,
    `Honorable-scarabe`,
  ],
  TABLE_TOPICS_TITLE: [
    `Topic's title`,
    `Titre du sujet`,
  ],
  TABLE_TOPICS_TITLE_EXEMPLE: [ 
    'The meaning of "the Princess and the frog" story',
    `Pourquoi créér des mondes merveilleux ?`,
  ],
  TABLE_TOPICS_CONTENT: [
    `Topic's content`,
    `Contenu du sujet`,
  ],
  TABLE_TOPICS_CONTENT_EXEMPLE: [
    `The whole meaning of that story is about the appearance and the true value of oneself by ...`,
    `Le monde des contes est riche et celui ci bien souvent se passe sur des contrées merveilleuse bla bla bla...`,
  ],
  TABLE_TOPICS_UPDATEDAT: UPDATEDAT,
  TABLE_TOPICS_CREATEDAT: CREATEDAT, 

  
  //////////////////////
  /* UI Elements Text */
  //////////////////////

  SIGN_OUT: [
    'Sign out',
    'Deconnexion',
  ],
  SIGN_IN: [
    'Sign in',
    'Connexion',
  ],
  DATE_TODAY: [
    `Today at $0`,
    `Aujourd'hui a $0`,
  ],
  DATE_YESTERDAY: [
    `Yesterday at $0`,
    `Hier a $0`,
  ],


  ////////////////////
  /* Error messages */
  ////////////////////

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
  TEST_A_TO_Z: [
    `$0 can contain only characteres between A and Z or numbers`,
    `$0 ne peu contenir uniquement des lettres de A a Z ou des chiffres`,
  ],
  TEST_MIN_LENGHT: [
    `$0 must be at least $1 characters`,
    `$0 doit faire au moins $1 lettres`,
  ],
  TEST_MAX_LENGHT: [
    `$0 can't be longer than $1 characters`,
    `$0 ne doit pas faire plus de $1 lettres`,
  ],
  TEST_DASH_POSITION: [
    `$0 can not start or end with a dash`,
    `$0 ne peu pas commencer ou ce terminer par un tiret`,
  ],
  TEST_DASH_COUNT: [
    `$0 can contain only one dash`,
    `$0 ne peu contenir qu'un seul tiret`,
  ],
  TEST_ENUM_ONEOF: [
    `Must be one of: $0.`,
    `Doit etre un de ses choix: $0.`,
  ],
})
