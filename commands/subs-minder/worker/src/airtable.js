import fetch from 'node-fetch'
// import data_mock from './dev/data.json' assert { type: 'json' }
import env from './env.js'
import { log, error, format_as_ISO } from './utils.js'

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
    return active_subs?.filter(({ fields: sub }) => {
      const payment_date = sub['Payment date']

      return new Date(payment_date) < today_date
    })
  }

  async update_valid_until_field(past_subs = [], duration, current_date) {
    const subs_updates = []
    past_subs.forEach(sub => {
      const should_be_renewed = sub.fields['Renew']
      const payment_date = sub.fields['Payment date']
      const new_date = this.calc_next_payment_date(payment_date, duration, current_date)

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
      const res = subs_updates.length && await this.update_records({
        records: subs_updates
      })
      return res
    } catch (err) {
      error(`Records update failed: ${err}`)
    }
  }

  async update_next_payment_field(subs = [], duration) {
    const subs_updates = subs.map(sub => {
      const payment_date = sub.fields['Payment date']
      const new_date = this.calc_next_payment_date(payment_date, duration)
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

  _calc_next_monthly_date(payment_date, current_month = new Date().getMonth()) {
    const d = new Date(payment_date)
    const date = d.getDate()
    const year = d.getFullYear()

    const next_payment_month = current_month + 1 <= 11 ? current_month + 1 : 0
    const next_payment_year = next_payment_month === 0 ? year + 1 : year
    const last_date_of_next_month = new Date(next_payment_year, next_payment_month + 1, 0).getDate()
    const next_payment_date = Math.min(date, last_date_of_next_month)

    // in human readable form the JS month should be +1,
    // because of the nature of months in JS and other langs is usually 0..11
    const new_date = `${next_payment_year}-${next_payment_month + 1}-${next_payment_date}` //e.g. 2022-12-28

    return format_as_ISO(new_date)
  }

  _calc_next_yearly_date(payment_date, current_year = new Date().getFullYear()) {
    const d = new Date(payment_date)
    const date = d.getDate()
    const month = d.getMonth()

    const next_payment_year = current_year + 1
    const next_year_last_date_of_month = new Date(next_payment_year, month + 1, 0).getDate()
    const next_payment_date = Math.min(next_year_last_date_of_month, date)

    const new_date = `${next_payment_year}-${month + 1}-${next_payment_date}`

    return format_as_ISO(new_date) //e.g. 2022-12-28
  }

  calc_next_payment_date(payment_date, duration, current_date = {}) {
    const { month, year } = current_date
    if (duration === 'monthly') {
      return this._calc_next_monthly_date(payment_date, month)
    } else if (duration === 'yearly') {
      return this._calc_next_yearly_date(payment_date, year)
    }
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

// eslint-disable-next-line import/no-unused-modules
export default {
  Airtable,
  RecordsUpdater,
  env,
}
