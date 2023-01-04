import { main_flow } from './main_flow.js'
import { log } from './utils.js'

async function handleFetchResponse(req, env) {
  const url = new URL(req.url)

  if (url.pathname === '/') {
    await main_flow(env)

    return new Response('JRes: Success request to /')
  }

  return new Response('JRes: Success mock response')
}

export default {
  // NOTE: Usefull for development
  // async fetch(req, env, ctx) {    
  //   return handleFetchResponse(req, env)
  // },
  async scheduled(event, env, ctx) {
    log('cron processed at ', new Date())
    await main_flow(env)
  }
}
