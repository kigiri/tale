const getType = (field, name) => {
  if (field.sql) return field.sql
}

const indent = str => `\n  ${str}`

const generateTable = (fields, tableName) => {
  const refs = []

  const addRefs = (name, definition) => {
    if (!definition) return

    const [ table, field ] = definition.split('.')

    refs.push(`FOREIGN KEY (${name}) REFERENCES ${table}(${field})`)
  }

  const fieldNames = Object.keys(fields)
  const first = fieldNames[0]

  const content = fieldNames.map(name => {
    const field = fields[name]

    addRefs(name, field.ref)

    return [
      name,
      field.sql ? field.sql : 'TEXT',
      field.required && 'NOT NULL',
      field.default && `DEFAULT ${field.default}`,
    ]
    .filter(Boolean)
    .join(' ')
  })
  .concat([
    `PRIMARY KEY (${first})` // 1st key
  ])
  .concat(refs)
  .map(indent)
  .join()

  return `CREATE TABLE IF NOT EXISTS ${tableName} (${content}\n);`
}
