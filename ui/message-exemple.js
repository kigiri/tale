// je prend les balise HTML qu'on a besoin
const { strong, small, a, br, p, h } = require('../lib/h')

// je cree un element avec la classe 'content'
const content = h('.content')

// ca c'est une librairie pour avoir une date relative
const fuzzyTime = require('../lib/fuzzy-time')

// la je declare la fonction qui va prendre les infos du message et retourner
// le message complet
module.exports = (messageInfo, state) => content(p([ // <div class="content"><p>
  strong(messageInfo.author), // <strong>Barbara Middleton</strong>
  br(), // <br>
  messageInfo.content, // le texte
  br(), // <br>
  small([ // <small>
    a('Like'), // <a>Like</a>
    ' . ', // le text ' . '
    a('Reply'), // <a>Reply</a>
    ' . ', // le text ' . '
    fuzzyTime(messageInfo.createdAt), // l'heure calculee
  ]) // </small>
])) // </p> </div>

/*
<div class="content">
  <p>
    <strong>Barbara Middleton</strong>
    <br>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
    <br>
    <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
  </p>
</div>
*/


// une abstraction interessante possible:
// tu vois que