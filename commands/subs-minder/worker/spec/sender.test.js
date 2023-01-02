import produce from 'immer'
import { Sender } from '../src/sender.js'
import { active_monthly_subs } from './__mocks__/subs.mock.js'

const sender = new Sender('TG_KEY_GOES_HERE')

describe('Sender', () => {
  describe.only('get_subs_to_renew_in_x_days', () => {
    it('should filter active subs that will be renewed in X days', () => {
      const renew_tomorrow = sender.get_subs_to_renew_in_x_days({
        subs: active_monthly_subs,
        days_to_renewal: 1,
        today_date: new Date('2022-12-14'),
      })

      expect(renew_tomorrow.length).toBe(1)
      expect(renew_tomorrow[0].name).toBe('Spotify')
    })

    it('should order subs desc. by "price" if there are more than 1', () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[2].fields['Payment date'] = '2022-12-10'
      })
      const renewals = sender.get_subs_to_renew_in_x_days({
        subs: updated_subs,
        days_to_renewal: 6,
        today_date: new Date('2022-12-4'),
      })

      expect(renewals.length).toBe(2)
      expect(renewals[0].price).toBeGreaterThan(renewals[1].price)
      expect(renewals[0].name).toBe('Netflix')
      expect(renewals[1].name).toBe('Apple TV+')
    })

    it('should transform subscription fields properly', () => {
      const updated_subs = produce(active_monthly_subs, draft => {
        draft[2].fields['Payment date'] = '2022-12-10'
      })
      const renewals = sender.get_subs_to_renew_in_x_days({
        subs: updated_subs,
        days_to_renewal: 6,
        today_date: new Date('2022-12-4'),
      })

      expect(renewals).toMatchInlineSnapshot(`
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
      const renew_tomorrow = sender.get_subs_to_renew_in_x_days({
        subs: active_monthly_subs,
        days_to_renewal: 1,
        today_date: new Date('2022-12-01'),
      })

      expect(renew_tomorrow.length).toBe(0)
      expect(renew_tomorrow).toEqual([])
    })
  })

  describe.skip('convert_to_message', () => {

  })
})
