import produce from 'immer'
import airtable from '../src/airtable.js'
import { subs_mock, active_monthly_subs, active_yearly_subs } from './__mocks__/subs.mock.js'

const { RecordsUpdater } = airtable

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
      const { active_subs, past_subs } = rec_updater.split_subs(subs_mock, 'monthly', new Date('2022-10-01 09:00:00'))

      expect(past_subs).toEqual([])
      expect(past_subs.length).toBe(0)
    })
  })
})
