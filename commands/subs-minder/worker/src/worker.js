import airtable from './airtable.js'
import { Sender } from './sender.js'
import { log } from './utils.js'

const { RecordsUpdater, env: { BASE, TABLE, KEY, TG_AUTH_KEY }} = airtable
const subs_updater = new RecordsUpdater({ base: BASE, table: TABLE, key: KEY })
const sender = new Sender(TG_AUTH_KEY)

async function handleFetchResponse(req, env) {
  const url = new URL(req.url)

  if (url.pathname === '/') {
    const {active_subs, past_subs} = await subs_updater.split_subs()
    // await subs_updater.main({active_subs, past_subs})
    await sender.send_reminder(active_subs, env)

    return new Response('JMSG: Success request to /')
  }

  return new Response('JMSG: Success mock response')
}

export default {
  // NOTE: Usefull for development
  // async fetch(req, env, ctx) {    
  //   return handleFetchResponse(req, env)
  // },
  async scheduled(event, env, ctx) {
    log('cron processed at ', new Date())
    const {active_subs, past_subs} = await subs_updater.split_subs()
    await subs_updater.main({active_subs, past_subs})
    await sender.send_reminder(active_subs, env)
  }
}
