import airtable from './airtable.js'

const { RecordsUpdater, env: { base, table, key }} = airtable
const subs_updater = new RecordsUpdater({ base, table, key })

async function handleFetchResponse(req) {
  const url = new URL(req.url)

  if (url.pathname === '/') {
    await subs_updater.main()

    return new Response('If this is not a success, then what?')
  }

  return new Response()
}

export default {
  // NOTE: Usefull for development
  // async fetch(req, env, ctx) {
  //   return handleFetchResponse(req)
  // },
  async scheduled(controller, env, ctx) {
    console.log('cron processed at ', new Date())
    await subs_updater.main()
  }
}