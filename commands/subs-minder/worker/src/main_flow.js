import airtable from './airtable.js'
import { Sender } from './sender.js'

const { RecordsUpdater, env: { BASE, TABLE, KEY, TG_AUTH_KEY } } = airtable
const subs_updater = new RecordsUpdater({ base: BASE, table: TABLE, key: KEY })
const sender = new Sender(TG_AUTH_KEY)

const process_monthly_subs = async (subs, env) => {
  const duration = 'monthly'

  const { active_subs, past_subs, } = subs_updater.split_subs(subs, duration)
  await sender.send_monthly_subs_reminders(active_subs, env)
  await subs_updater.update_airtable_records({ active_subs, past_subs, duration })
}

const process_yearly_subs = async (subs, env) => {
  const duration = 'yearly'

  const { active_subs, past_subs, } = subs_updater.split_subs(subs, duration)
  await sender.send_yearly_subs_reminders(active_subs, env)
  await subs_updater.update_airtable_records({ active_subs, past_subs, duration })
}

const main_flow = async (env) => {
  const subs = await subs_updater.get_records()

  await process_monthly_subs(subs, env)
  await process_yearly_subs(subs, env)
}

export {
  process_monthly_subs,
  process_yearly_subs,
  main_flow,
  subs_updater,
  sender,
}
