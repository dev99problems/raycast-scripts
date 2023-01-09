import { main_flow } from './main_flow.js'
import { log } from './utils.js'

// eslint-disable-next-line no-unused-vars
async function handleFetchResponse(req, env) {
  const url = new URL(req.url)

  if (url.pathname === '/') {
    await main_flow(env)

    return new Response('JRes: Success request to /')
  }

  return new Response('JRes: Success mock response')
}

// eslint-disable-next-line import/no-unused-modules
export default {
  // NOTE: Usefull for development
  // async fetch(req, env) {    
  //   return handleFetchResponse(req, env)
  // },
  async scheduled(event, env) {
    log('cron processed at ', new Date())
    await main_flow(env)
  }
}
