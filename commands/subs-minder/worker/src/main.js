import airtable from './airtable.js'

const { RecordsUpdater, env: { BASE, TABLE, KEY } } = airtable
const subs_updater = new RecordsUpdater({ base: BASE, table: TABLE, key: KEY })

!(async () => {
  await subs_updater.main()
})()
