import airtable from '../airtable.js'

const { RecordsUpdater, env: { BASE, TABLE, KEY, TG_AUTH_KEY } } = airtable
const subs_updater = new RecordsUpdater({ base: BASE, table: TABLE, key: KEY })

!(async function() {
    await subs_updater.main()
})()
