const h = require('../lib/h')
const label = h('label.label')
const control = h('p.control', { style: { marginBottom: '1.75em' } })
const selectWrap = h('span.select')
const checkboxWrap = h('label.checkbox')

const labelWrap = fn => props => [
  label(props.name),
  control(fn(props)),
]

const anyInput = labelWrap(h('input.input'))
const inputs = {
  text: anyInput,
  email: anyInput,
  password: anyInput,
  select: labelWrap(props =>
    selectWrap(h.select(props, props.values
      .map(value => h.option({value}, value))))),
  textarea: labelWrap(h('textarea.textarea')),
  checkbox: props => control(checkboxWrap([
    h.input(props),
    props.name,
  ])),
}

const valueKey = {
  checkbox: (props, obs) => {
    props.checked = obs()
    props.onChange = ev => obs.set(!obs())
  },
  select: (props, obs) => {
    //props.checked = obs()
    props.onInput = ev => {
      //obs.set(!obs())
      console.log(ev.target)
    }
  },
  defaults: (props, obs) => {
    props.value = obs()
    props.onInput = ev => obs.set(ev.target.value)
  }
}

const typeAliases = {
  selection: 'select',
}

module.exports = (props={}, obs) => {
  props.type = (typeAliases[props.type] || props.type) || 'text'
  const input = (inputs[props.type])

  if (obs) {
    (valueKey[props.type] || valueKey.defaults)(props, obs)
  }

  if (!input) return control(`Unknown input ${props.type}`)
  return input(props)
}
