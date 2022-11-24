import airtable from './airtable.js'

const { RecordsUpdater, env: { base, table, key } } = airtable
const subs_updater = new RecordsUpdater({ base, table, key })

!(async () => {
  await subs_updater.main()
})()
