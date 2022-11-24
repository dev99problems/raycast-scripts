// NOTE: Usefull for development
// import fetch from 'node-fetch'
import data_mock from './data.json' assert { type: 'json' }
import env from './env.js'

const log = console.log

// NOTE: had to write this wrapper myself, because Airtable JS package
// doesn't work properly in CF Worker runtime
// https://github.com/Airtable/airtable.js/issues/323
class Airtable {
  base_url = 'https://api.airtable.com/v0/'

  constructor({ base, table, key }) {
    this.base = base; 
    this.table = table; 
    this.key = key; 
    this.url = new URL(`${this.base_url}${base}/${table}`)
  }

  async get_records() {
    const res = await fetch(this.url.href, {
      headers: {
         Authorization: `Bearer ${this.key}`,
        'Content-type': `application/json`
      }
    })
    const json = await res.json()
    const records = json.records

    return records
  }

  async update_records(body){
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
  async get_active_monthly_subs() {
    try {
      const subs = await this.get_records()
      const active_subs = subs?.filter(({fields: sub}) => sub['Status'] && sub['Duration'] === 'monthly')
      return active_subs
    } catch (err) {
      console.error(`Records request failed: ${err}`)
    }
  }

  async get_active_monthly_subs_mock() {
    return data_mock
  }

  get_past_subs(subs) {
    return subs?.filter(sub => {
      const date = sub.fields['Valid through']
      return new Date(date) < new Date()
    })
  }

  async data_update(subs = []){
    const subscriptions_updates = subs.map(sub => {
      const new_date = this.calc_next_payment_date(sub.fields['Valid through'])
      return {
        id: sub.id,
        fields: {
          'Valid through': new_date
        } 
      }
    })

    try {
      const res = await this.update_records({
        records: subscriptions_updates 
      })  
      return res
    } catch (err) {
      console.error(`Records update failed: ${err}`) 
    }
  }

  calc_next_payment_date(curr_payment_date) {
    const d = new Date(curr_payment_date)
    const date = d.getDate()
    const year = d.getFullYear()
    
    const next_payment_month = new Date().getMonth() + 1
    const next_payment_year = next_payment_month <= 11 ? year : year + 1
    const last_date_of_next_month = new Date(next_payment_year, next_payment_month + 1, 0).getDate()
    const next_payment_date = Math.min(date, last_date_of_next_month) 

    // in human readable notation the month should be +1,
    // because of the nature of months in JS, 0..11
    return `${next_payment_year}-${next_payment_month + 1}-${next_payment_date}` //e.g. 2022-12-28
  }      

  async main() {
    const active_subs = await this.get_active_monthly_subs()
    const past_subs = this.get_past_subs(active_subs)

    log(`Amount of subscriptions to update: ${past_subs?.length}`)
    past_subs?.length && await this.data_update(past_subs)
  }
}

export default {
  Airtable,
  RecordsUpdater,
  env,
}
