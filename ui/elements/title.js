const { h, h1, h2, h3, h4, h5, h6 } = require('../../lib/h')
const title = h('.title')
title.large = title.extend('.is-1')
title.big = title.extend('.is-2')
title.med = title.extend('.is-3')
title.small = title.extend('.is-4')
title.xs = title.extend('.is-5')
title.xxs = title.extend('.is-6')
const subtitle = h('.subtitle')
subtitle.large = title.extend('.is-1')
subtitle.big = title.extend('.is-2')
subtitle.medium = title.extend('.is-3')
subtitle.small = title.extend('.is-4')
subtitle.xs = title.extend('.is-5')
subtitle.xxs = title.extend('.is-6')

module.exports= contenu => title.small(contenu)
//http://bulma.io/documentation/elements/title/