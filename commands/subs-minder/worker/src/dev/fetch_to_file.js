import fs from 'fs'
import airtable from '../airtable.js'

const { Airtable, env: { BASE, TABLE, KEY } } = airtable
const airt = new Airtable({ base: BASE, table: TABLE, key: KEY })

!(async() => {
  const records = await airt.get_records()
  fs.writeFileSync('./src/dev/data.json', JSON.stringify(records))
})()
