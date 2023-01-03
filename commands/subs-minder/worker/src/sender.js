import fetch from 'node-fetch';
import { error, log, toCapitalCase, format_date, resetHMS } from './utils.js';
import env from './env.js'

const url = env.JEREMY_API_URL

class Sender {
  constructor(auth_key) {
    this.auth_key = auth_key
  }

  async send_to_jeremy(msg, env) {
    if (msg?.length) {
      try {
        const jeremy_fetch = env ? env.jeremy.fetch : fetch
        const res = await jeremy_fetch(url, {
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
        error(`JError: Sender.send_message failed to send request: ${err.message}, ${err.stack}`)
      }
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
    const suffix = subs?.length > 1 ? 's' : ''

    if (subs?.length) {
      const today = format_date(new Date())
      const header = `💲 <b>${today}</b> next <b>${toCapitalCase(period_duration)}</b> payment${suffix}:\n`
      const separator = new Array(MESSAGE_LEN).join('-')

      const rows = subs?.map(({ payment_date, name, price }) => {
        const date = format_date(new Date(payment_date))

        return `\n👉 <b>${date}</b> ${name}` + `  |  <b>${price}$</b>`
      })

      return header + separator + rows.join('')
    }

    return ''
  }

  get_subs_to_renew_in_x_days({ subs, days_to_renewal = 1, today_date = new Date() }) {
    return subs
      ?.filter(({ fields }) => {
        const { 'Payment date': payment_date } = fields
        const day_in_ms = 86400000 // 24*60*60*1000

        const diff = (new Date(payment_date) - resetHMS(today_date)) / day_in_ms
        const renewal_in_x_days = diff === days_to_renewal
        return renewal_in_x_days
      })
      // normalize fields
      ?.map(({ fields }) => ({
        name: fields.Name,
        duration: fields.Duration,
        payment_date: fields['Payment date'],
        price: fields.Price
      }))
      ?.sort((a, b) => b.price - a.price)
  }

  async send_reminder({ active_subs, env, duration, days_to_renewal }) {
    const subs_to_renew = this.get_subs_to_renew_in_x_days({ subs: active_subs, days_to_renewal })
    const message_text = this.convert_to_message(subs_to_renew)

    if (message_text) {
      const res = await this.send_to_jeremy(message_text, env)
      log(`JLog: ${duration} reminders sent to Jeremy with status = ${res?.status}`)
      return res
    }
  }

  async send_monthly_subs_reminders(active_subs, env) {
    await this.send_reminder({
      active_subs,
      env,
      duration: 'monthly',
      days_to_renewal: 1
    })
  }

  async send_yearly_subs_reminders(yearly_active_subs, env) {
    for (let days_to_renewal of [7, 3, 1]) {
      await this.send_reminder({
        active_subs: yearly_active_subs,
        env,
        duration: 'yearly',
        days_to_renewal
      })
    }
  }
}

export { Sender }
