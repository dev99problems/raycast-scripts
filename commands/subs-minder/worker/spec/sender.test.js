import produce from 'immer'
import { Sender } from '../src/sender.js'
import { active_monthly_subs } from './__mocks__/subs.mock.js'

const sender = new Sender('TG_KEY_GOES_HERE')

describe('Sender', () => {
  describe('get_subs_to_renew_in_x_days', () => {
    it('should filter active subs that will be renewed in X days', () => {
      const renew_tomorrow = sender.get_subs_to_renew_in_x_days({
        subs: active_monthly_subs,
        days_to_renewal: 1,
        today_date: new Date('2022-12-14'),
      })

      expect(renew_tomorrow.length).toBe(1)
      expect(renew_tomorrow[0].name).toBe('Spotify')
    })

    it('should ignore passed HH:MM:SS in "today_date" arg. while calculating next renewals', () => {
      const renew_in_10_days = sender.get_subs_to_renew_in_x_days({
        subs: active_monthly_subs,
        days_to_renewal: 10,
        today_date: new Date('2022-12-05 22:43:11'),
      })

      expect(renew_in_10_days.length).toBe(1)
      expect(renew_in_10_days[0].name).toBe('Spotify')
    })

    it('should order subs desc. by "price" if there are more than 1', () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[2].fields['Payment date'] = '2022-12-10'
      })
      const renew_in_a_week = sender.get_subs_to_renew_in_x_days({
        subs: updated_subs,
        days_to_renewal: 7,
        today_date: new Date('2022-12-3'),
      })

      expect(renew_in_a_week.length).toBe(2)
      expect(renew_in_a_week[0].price).toBeGreaterThan(renew_in_a_week[1].price)
      expect(renew_in_a_week[0].name).toBe('Netflix')
      expect(renew_in_a_week[1].name).toBe('Apple TV+')
    })

    it('should transform subscription fields properly', () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[2].fields['Payment date'] = '2022-12-10'
      })
      const renew_in_a_week = sender.get_subs_to_renew_in_x_days({
        subs: updated_subs,
        days_to_renewal: 7,
        today_date: new Date('2022-12-3'),
      })

      expect(renew_in_a_week).toMatchInlineSnapshot(`
        [
          {
            "duration": "monthly",
            "name": "Netflix",
            "payment_date": "2022-12-10",
            "price": 15,
          },
          {
            "duration": "monthly",
            "name": "Apple TV+",
            "payment_date": "2022-12-10",
            "price": 2,
          },
        ]
      `)
    })

    it('should return [] when there are no renewals in X days', () => {
      const renew_in_2_days = sender.get_subs_to_renew_in_x_days({
        subs: active_monthly_subs,
        days_to_renewal: 2,
        today_date: new Date('2022-12-01'),
      })

      expect(renew_in_2_days.length).toBe(0)
      expect(renew_in_2_days).toEqual([])
    })
  })

  describe.skip('convert_to_message', () => {

  })
})
