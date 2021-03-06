const { isFn, isStr, isObj } = require('izi/is')
const htmlTags = require('./html-tags')
const equal = require('izi/collection/equal')
const each = require('izi/collection/each')
const map = require('izi/collection/map')
const parseTag = require('./parse-tag')
const createElement = require('inferno-create-element')
const render = require('inferno').render
const noOp = () => {}

const isChildren = child => {
  if (!child) return false
  switch (child.constructor) {
    case String:
    case Function:
    case Array: return true
    default: return child.flags
  }
}

const isPrimitive = prim => {
  if (prim === null) return false
  switch (prim.constructor) {
    case String:
    case Number:
    case Boolean: return true
    default: return false
  }
}

const getTagAndParseProps = (cssPath, props) => isStr(cssPath)
  ? parseTag(cssPath, props).toLowerCase()
  : cssPath

const mergePropsBody = map.toArr((value, key) => {
  if (value === undefined) return ''
  const k = JSON.stringify(key)
  const v = isPrimitive(value) ? JSON.stringify(value) : `base[${k}]`

  return `props[${k}] === undefined && (props[${k}] = ${v});\n`
})

const mergeProps = props => Function(['props', 'base'],
  `${mergePropsBody(props).join('')}return props`)

const fastCloneBody = map.toArr((value, key) => {
  if (value === undefined) return ''
  const k = JSON.stringify(key)
  const v = isPrimitive(value) ? JSON.stringify(value) : `base[${k}]`

  return `  ${k}: ${v},\n`
})

const fastClone = props => Function(['base'],
  `return {\n${fastCloneBody(props).join('')}}`)

const getClassAppender = className => {
  const appClass = ' '+ className
  return className
    ? (props => props.className && (props.className += appClass))
    : noOp
}
const tagCache = Object.create(null)

const inCache = (tag, props) => {
  const cache = tagCache[tag]
  if (!cache) return
  for (let [create, test] of cache) {
    if (test(props)) return create
  }
}

const setCache = (tag, props, create) =>
  (tagCache[tag] || (tagCache[tag] = new Map()))
    .set(create, equal(props))

const prepareArgs = (tagName, props) => {
  if (isObj(tagName)) {
    props = tagName
    tagName = 'div'
  }

  if (!isObj(props)) {
    props = Object.create(null)
  }

  const tag = getTagAndParseProps(tagName, props)

  return { tag, props }
}

const h = (t, p) => {
  const { tag, props: baseProps } = prepareArgs(t, p)
  const cacheHit = inCache(tag, baseProps)
  if (cacheHit) return cacheHit

  let merge, clone, appendCssClass

  if (!Object.keys(baseProps).length) {
    merge = clone = Object
    appendCssClass = noOp
  } else {
    merge = mergeProps(baseProps)
    clone = fastClone(baseProps)
    appendCssClass = getClassAppender(baseProps.className)
  }

  const create = (props, children) => {
    if (!props) {
      props = clone(baseProps)
    } else if (isChildren(props)) {
      children = props
      props = clone(baseProps)
    } else {
      appendCssClass(props)
      merge(props, baseProps)
    }
    return createElement(tag, props, children)
  }

  create.style = (style, children) => {
    const props = clone(baseProps)
    props.style = style
    return createElement(tag, props, children)
  }

  create.extend = (t, p) => {
    const { props } = prepareArgs(t, p)

    appendCssClass(props)
    merge(props, baseProps)

    return h(tag, props)
  }

  setCache(tag, baseProps, create)

  return create
}

const deprecated = [
  'replaceState',
  'isMounted',
  'getDOMNode',
  'replaceProps',
  'setProps',
]

each(tag => h[tag] = h(tag), htmlTags)

h.class = Object.create(null)
h.h = h
h.render = render

module.exports = h
