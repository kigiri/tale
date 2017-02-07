const db = require('~/data/db')
const reduce = require('izi/collection/reduce')
const fs = require('fs')
const path = require('path')

const getType = (field, name) => {
  if (field.sql) return field.sql
}

const indent = str => `\n  ${str}`

const createTable = (tableName, content) =>
  `CREATE TABLE IF NOT EXISTS ${tableName} (${content}\n);`

const createUpdateTrigger = tableName => `
CREATE TRIGGER ${tableName}_updated_at BEFORE UPDATE ON ${tableName}
  FOR EACH ROW EXECUTE PROCEDURE updated_at();`

const quote = str => `'${str}'`
const generateTable = reduce((sql, fields, tableName) => {
  const refs = []
  const types = []

  const fieldNames = Object.keys(fields)
  const first = fieldNames[0]

  const content = fieldNames.map(name => {
    const field = fields[name]

    if (field.ref) {
      const [ t, f ] = field.ref.split('.')

      refs.push(`FOREIGN KEY (${name}) REFERENCES ${t}(${f})`)
      field.sql = db[t][f].sql
    }

    if (field.type === 'selection') {
      const type = field.sql = `${tableName}_${name}`

      types.push(`CREATE TYPE ${type} AS ENUM('${field.values.join("', '")}');`)
      if (!field.default) {
        field.default = `'${field.values[0]}'`
      }
    }

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

  return [
    sql,
    `\n\n-- ${tableName}`,
    types.join('\n'),
    createTable(tableName, content),
    (fieldNames.indexOf('updatedAt') !== -1) && createUpdateTrigger(tableName),
  ]
  .filter(Boolean)
  .join('\n')
})


const filePath = path.join(__dirname, '../ressources/schema.sql')
const sqlContent = generateTable(db, `
CREATE OR REPLACE FUNCTION updated_at() 
RETURNS TRIGGER AS 'BEGIN NEW.updatedAt = now(); RETURN NEW; END;'
language 'plpgsql';`)
/*
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';
*/



fs.writeFile(filePath, sqlContent, err => err
  ? (console.error(err), process.exit(err.code || 1))
  : process.exit(0))
