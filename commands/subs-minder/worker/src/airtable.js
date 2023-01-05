import fetch from 'node-fetch'
import data_mock from './dev/data.json' assert { type: 'json' }
import env from './env.js'
import { log, error } from './utils.js'

// NOTE: had to write this wrapper myself, because Airtable JS package
// doesn't work properly in CF Worker runtime
// https://github.com/Airtable/airtable.js/issues/323
class Airtable {
  base_url = 'https://api.airtable.com/v0/'

  constructor({ base, table, key }) {
    this.base = base
    this.table = table
    this.key = key
    this.url = new URL(`${this.base_url}${base}/${table}`)
  }

  async get_records() {
    try {
      const res = await fetch(this.url.href, {
        headers: {
          Authorization: `Bearer ${this.key}`,
          'Content-type': `application/json`
        }
      })
      const json = await res.json()
      const records = json.records

      return records
    } catch (err) {
      error(`JError: Airtable.get_records Records request failed: ${err.message}, ${err.stack}`)
      return []
    }
  }

  async update_records(body) {
    return fetch(this.url.href, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${this.key}`,
        'Content-type': `application/json`
      }
    })
  }
}

class RecordsUpdater extends Airtable {
  select_active_subs_by_duration(subs, duration) {
    return subs?.filter(({ fields: sub }) => sub['Active'] && sub['Duration'] === duration)
  }

  get_past_subs(active_subs, today_date = new Date()) {
    return active_subs?.filter(({ fields: sub}) => {
      const payment_date = sub['Payment date']

      return new Date(payment_date) < today_date
    })
  }

  async update_valid_until_field(subs = []) {
    const subs_updates = []
    subs.forEach(sub => {
      const should_be_renewed = sub.fields['Renew']
      const payment_date = sub.fields['Payment date']
      const new_date = this.calc_next_payment_date(payment_date)

      if (should_be_renewed) {
        subs_updates.push({
          id: sub.id,
          fields: {
            'Valid until': new_date
          }
        })
      }
    })

    try {
      const res = await this.update_records({
        records: subs_updates
      })
      return res
    } catch (err) {
      error(`Records update failed: ${err}`)
    }
  }

  async update_next_payment_field(subs = []) {
    const subs_updates = subs.map(sub => {
      const date = sub.fields['Payment date']
      const new_date = this.calc_next_payment_date(date)
      return {
        id: sub.id,
        fields: {
          'Payment date': new_date
        }
      }
    })

    try {
      const res = await this.update_records({
        records: subs_updates
      })
      return res
    } catch (err) {
      error(`Records update failed: ${err}`)
    }
  }

  is_first_day_of_month() {
    return new Date().getDate() === 1
  }

  // NOTE: this doesn't seem to work correct for updating dates,
  // on year change, like 2022-12-10 -> 2023-01-10 | last time it did 2022-02-10 instead
  calc_next_payment_date(curr_payment_date) {
    const d = new Date(curr_payment_date)
    const date = d.getDate()
    const year = d.getFullYear()

    const current_month = new Date().getMonth()
    const next_payment_month = current_month + 1 <= 11 ? current_month + 1 : 0
    const next_payment_year = next_payment_month === 0 ? year + 1 : year
    const last_date_of_next_month = new Date(next_payment_year, next_payment_month + 1, 0).getDate()
    const next_payment_date = Math.min(date, last_date_of_next_month)

    // in human readable form the JS month should be +1,
    // because of the nature of months in JS and other langs is usually 0..11
    return `${next_payment_year}-${next_payment_month + 1}-${next_payment_date}` //e.g. 2022-12-28
  }

  split_subs(subs, duration, today_date = new Date()) {
    // const active_subs = this.select_active_subs_by_duration(data_mock, duration)
    const active_subs = this.select_active_subs_by_duration(subs, duration)
    const past_subs = this.get_past_subs(active_subs, today_date)

    return { active_subs, past_subs }
  }

  async update_airtable_records({ active_subs, past_subs, duration }) {
    log(`Amount of ${duration} subscriptions to update: ${past_subs?.length}`)
    past_subs?.length && await this.update_valid_until_field(past_subs)

    // Update payment dates on 1-st day of Month
    this.is_first_day_of_month() && await this.update_next_payment_field(active_subs)
  }
}

export default {
  Airtable,
  RecordsUpdater,
  env,
}
