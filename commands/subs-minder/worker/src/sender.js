// import fetch from 'node-fetch';
import { error, log, toCapitalCase, format_date } from './utils.js';

const url = '<YOUR_JEREMY_URL>'

class Sender {
  constructor(auth_key) {
    this.auth_key = auth_key
  }

  async send(msg, env) {
    try {
      // const res = await fetch(url, {
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

  /**
    💲 <b>Dec 21</b> next <b>Monthly</b> payments:
    👉 <b>Dec 22</b> First sub | <b>5$</b>
    👉 <b>Dec 22</b> Second sub | <b>7.5$</b>
  */
  convert_to_message(subs) {
    const MESSAGE_LEN = 42
    const period_duration = subs?.[0]?.duration
    const prefix = subs?.length > 1 ? 's' : ''

    if (subs?.length) {
      const today = format_date(new Date())
      const header = `💲 <b>${today}</b> next <b>${toCapitalCase(period_duration)}</b> payment${prefix}:\n`
      const separator = new Array(MESSAGE_LEN).join('-')

      const rows = subs?.map(({ payment_date, name, price }) => {
        const date = format_date(new Date(payment_date))

        return `\n👉 <b>${date}</b> ${name}` + `  |  <b>${price}$</b>`
      })

      return header + separator + rows.join('')
    }

    return ''
  }

  get_subs_to_renew_in_x_days({subs, renew_in = 1}) {
    return subs
      ?.filter(({ fields }) => {
        const { 'Payment date': payment_date } = fields
        const today = new Date();
        const day_in_ms = 86400000 // 24*60*60*1000

        const diff = new Date(payment_date) - today
        const is_before_x_days = 0 < diff && diff <= (day_in_ms * renew_in)
        return is_before_x_days
      })
      // normalize fields
      ?.map(({ fields }) => ({
        name: fields.Name,
        duration: fields.Duration,
        payment_date: fields['Payment date'],
        price: fields.Price
      }))
      // sorted asc by payment_date
      ?.sort((a, b) => {
        const date_a = new Date(a.payment_date)
        const date_b = new Date(b.payment_date)
        if (date_a > date_b) {
          return 1
        } else if (date_a === date_b) {
          return 0
        } else {
          return -1
        }
      })
  }

  async send_reminder(active_subs, env) {
    const tomorrow_subs = this.get_subs_to_renew_in_x_days({subs: active_subs, renew_in: 1})
    const message_text = this.convert_to_message(tomorrow_subs)

    const res = await this.send(message_text, env)
    log(`status = ${res.status}`)
    return res
  }
}

export { Sender }
