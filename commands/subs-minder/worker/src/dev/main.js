import airtable from '../airtable.js'
import { Sender } from '../sender.js'

const { RecordsUpdater, env: { BASE, TABLE, KEY, TG_AUTH_KEY } } = airtable
const subs_updater = new RecordsUpdater({ base: BASE, table: TABLE, key: KEY })
const sender = new Sender(TG_AUTH_KEY)

!(async function() {
    // await subs_updater.main()
    await sender.send_notification('hey there')
})()
