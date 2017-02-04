const select = el => {
  if (!el) return
  if (typeof el.select === "function") return el.select()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)

  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

select.focus = el => {
  (el && el.focus && el.focus())
  select(el)
}

select.clear = () => {
  if (document.selection) {
    document.selection.empty()
  } else {
    window.getSelection().removeAllRanges()
  }
}

module.exports = select
