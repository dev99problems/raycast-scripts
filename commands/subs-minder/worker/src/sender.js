import { error, log } from './utils.js';

const url = '<YOUR_JEREMY_URL>'

class Sender {
  constructor(auth_key) {
    this.auth_key = auth_key
  }

  async send(msg, env) {
    try {
      const res = await env.jeremy.fetch(url, {
        method: 'POST',
        headers: {
          'X-Custom-JKey': this.auth_key,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          message: {
            text: msg
          }
        }),
      })

      // log(`url: ${res.url}`)
      // log(`statusText: ${res.statusText}`)
      // log(`status: ${res?.status}`)
      return res
    } catch (err) {
      error(`JError: Sender.send_message failed to send request: ${err?.message}`)
      log(err)
    }
  }

  prepare_text(msg) {
    // NOTE: there must be passed fields:
    // * Name, Price, Payment date   
    const text = `Tomorrow's payment: 
👉 <b>20 Dec 22</b>: Apple TV+              5$`

    return text
  }

  async send_notification(msg, env) {
    const text = this.prepare_text(msg)
    const res = await this.send(text, env)
    log(`status = ${res.status}`)
    return res
  }
}

export { Sender }
