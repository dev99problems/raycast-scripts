import produce from 'immer'
import jest from 'jest-mock'
import airtable from '../src/airtable.js'
import { subs_mock, active_monthly_subs, active_yearly_subs } from './__mocks__/subs.mock.js'

const { RecordsUpdater } = airtable
const m = {
  'Nov': 9,
  'Dec': 11,
  'Jan': 0,
  'Feb': 1,
}

const rec_updater = new RecordsUpdater({
  base: 'airt_base',
  table: 'airt_table',
  key: 'airt_api_key'
})

describe('RecordsUpdater', () => {
  describe('split_subs', () => {
    it('should return "active_subs" by duration properly', () => {
      const { active_subs: active_subs_m } = rec_updater.split_subs(subs_mock, 'monthly')

      expect(active_subs_m.length).toBe(3)
      expect(active_subs_m[0].fields.Name).toBe('Apple TV+')
      expect(active_subs_m).toEqual(active_monthly_subs)

      const { active_subs: active_subs_y } = rec_updater.split_subs(subs_mock, 'yearly')

      expect(active_subs_y.length).toBe(3)
      expect(active_subs_y[0].fields.Name).toBe('YouTube Premium (Family)')
      expect(active_subs_y).toEqual(active_yearly_subs)
    })

    it('should return "active_subs: undefined" if no "subs" argument provided', () => {
      const { active_subs } = rec_updater.split_subs(undefined, 'monthly')

      expect(active_subs).toBe(undefined)
    })

    it('should return "active_subs: []" if no "subs" argument is empty array', () => {
      const { active_subs } = rec_updater.split_subs([], 'monthly')

      expect(active_subs).toEqual([])
    })

    it('should return "past_subs" if sub\'s "payment_date" passed', () => {
      const { active_subs, past_subs } = rec_updater.split_subs(subs_mock, 'monthly', new Date('2022-12-14 09:00:00'))

      expect(active_subs.length).toBe(3)
      expect(past_subs.length).toBe(2)
      expect(past_subs[0].fields.Name).toEqual('Apple TV+')
      expect(past_subs[1].fields.Name).toEqual('Netflix')
    })

    it('should return "past_subs: []" if none sub\'s "payment_date" passed', () => {
      const { past_subs } = rec_updater.split_subs(subs_mock, 'monthly', new Date('2022-10-01 09:00:00'))

      expect(past_subs).toEqual([])
      expect(past_subs.length).toBe(0)
    })
  })

  // NOTE: Now it doesn't accept any "duration" to determine monthly from yearly
  describe('calc_next_payment_date', () => {
    const duration = 'monthly'

    it('should correctly switch to next monthly date in regular cases', () => {
      expect(rec_updater.calc_next_payment_date('2022-10-01', duration, {month: m.Nov})).toBe('2022-11-1')
    })

    it('should correctly switch through new year', () => {
      expect(rec_updater.calc_next_payment_date('2022-12-03', duration, {month: m.Dec})).toBe('2023-1-3')
    })

    it('should correctly select proper last day of the month', () => {
      expect(rec_updater.calc_next_payment_date('2023-01-31', duration, {month: m.Jan})).toBe('2023-2-28')
    })

    it('should correctly select proper last day of the month during leap year', () => {
      expect(rec_updater.calc_next_payment_date('2020-01-31', duration, {month: m.Jan})).toBe('2020-2-29')
    })
  })

  describe.only('update_valid_until_field', () => {
    let update_records
    const original_update_records = rec_updater.update_records
    beforeEach(() => {
      update_records = jest.fn()
      rec_updater.update_records = update_records
    })
    afterEach(() => {
      rec_updater.update_records = original_update_records
    })    

    it('should calc properly next "valid until" date for renewed subs', async () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[0].fields['Payment date'] = '2023-1-10'
        draft[0].fields['Renew'] = true
        draft[1].fields['Payment date'] = '2023-1-15'
        draft[1].fields['Renew'] = true
        draft[2].fields['Payment date'] = '2023-1-5'
        draft[2].fields['Renew'] = true
      })
      const { past_subs } = rec_updater.split_subs(updated_subs, 'monthly', new Date('2023-1-11'))
      expect(past_subs.length).toBe(2)

      expect(past_subs[0].fields['Valid until']).toBe('2023-01-10')
      expect(past_subs[0].fields['Name']).toBe('Apple TV+')
      expect(past_subs[1].fields['Valid until']).toBe('2023-01-05')
      expect(past_subs[1].fields['Name']).toBe('Netflix')

      await rec_updater.update_valid_until_field(past_subs, 'monthly', {month: m.Jan})
      expect(update_records).toHaveBeenCalledTimes(1)
      expect(update_records).toHaveBeenCalledWith({
        records: [
          {
            id: 'rec4',
            fields: { 'Valid until': '2023-2-10' }
          },
          {
            id: 'rec7',
            fields: { 'Valid until': '2023-2-5' }
          },
        ]
      })
    })

    it('should not call "update_records" when no past subs which should be renewed', async () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[0].fields['Payment date'] = '2023-1-10'
        draft[0].fields['Renew'] = false
        draft[1].fields['Payment date'] = '2023-1-15'
        draft[1].fields['Renew'] = false
        draft[2].fields['Payment date'] = '2023-1-5'
        draft[2].fields['Renew'] = false
      })

      const { past_subs } = rec_updater.split_subs(updated_subs, 'monthly', new Date('2023-1-11'))
      expect(past_subs.length).toBe(2)

      await rec_updater.update_valid_until_field(past_subs, 'monthly', {month: m.Jan})
      expect(rec_updater.update_records).not.toHaveBeenCalled()
    })
  })
})
