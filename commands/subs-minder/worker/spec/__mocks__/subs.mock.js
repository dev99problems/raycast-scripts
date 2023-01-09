const active_monthly_subs = [
  {
    id: 'rec4',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Apple TV+',
      Active: true,
      Price: 2,
      Duration: 'monthly',
      'Valid until': '2023-01-10',
      Type: [
        'Content',
        'Services'
      ],
      Renew: true,
      'Payment date': '2022-12-10'
    }
  },
  {
    id: 'rec5',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Spotify',
      Active: true,
      Price: 2.5,
      Duration: 'monthly',
      'Valid until': '2023-01-15',
      Type: [
        'Services',
        'Content'
      ],
      Renew: true,
      'Payment date': '2022-12-15'
    }
  },
  {
    id: 'rec7',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Netflix',
      Active: true,
      Price: 15,
      Duration: 'monthly',
      'Valid until': '2023-01-05',
      Type: [
        'Content',
        'Services'
      ],
      Renew: true,
      'Payment date': '2022-12-05'
    }
  },
]

const active_yearly_subs = [
  {
    id: 'recI',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'YouTube Premium (Family)',
      Active: true,
      Price: 100,
      Duration: 'yearly',
      'Valid until': '2022-12-29',
      Type: [
        'Services',
        'Content'
      ],
      Renew: true,
      'Payment date': '2022-12-29'
    }
  },
  {
    id: 'recL',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Chess.com',
      Active: true,
      Price: 25,
      Duration: 'yearly',
      'Valid until': '2022-12-19',
      Type: [
        'Services'
      ],
      'Payment date': '2022-12-19'
    }
  },
  {
    id: 'recN',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'PSN',
      Active: true,
      Price: 44,
      Duration: 'yearly',
      'Valid until': '2022-12-09',
      Type: [
        'Services'
      ],
      'Payment date': '2022-12-09'
    }
  },
]

const random_inacitve_subs = [
  {
    id: 'recO',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Front-End Masters',
      Price: 39,
      Type: [
        'Education'
      ]
    }
  },
  {
    id: 'recS',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Apple iCloud',
      Price: 110,
      Duration: 'yearly',
      'Valid until': '2023-01-18',
      Type: [
        'Services'
      ],
      'Payment date': '2022-12-18'
    }
  },
  {
    id: 'recS',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Sketch',
      Price: 90,
      Duration: 'yearly',
      'Valid until': '2022-06-02',
      Type: [
        'Apps'
      ],
      'Payment date': '2022-06-02'
    }
  },
  {
    id: 'recj',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'Taxer',
      Price: 20,
      Duration: 'yearly',
      'Valid until': '2023-04-21',
      Type: [
        'Services'
      ],
      'Payment date': '2023-04-21'
    }
  },
  {
    id: 'recu',
    createdTime: '2021-12-26T12:47:46.000Z',
    fields: {
      Name: 'RealPython',
      Price: 20,
      Duration: 'monthly',
      'Valid until': '2022-05-05',
      Type: [
        'Education'
      ],
      'Payment date': '2021-05-05'
    }
  },
]

const subs_mock = [
  ...active_monthly_subs,
  ...active_yearly_subs,
  ...random_inacitve_subs,
]

export {
  active_monthly_subs,
  active_yearly_subs,
  random_inacitve_subs,
  subs_mock,
}
