#!/Users/gene/.nvm/versions/node/v15.11.0/bin/node
// NOTE: this node setup️ is my current setup and will definitely differ
// on your machine

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title kuna-doge
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 💴

// Documentation:
// @raycast.author Eugene Chulkov
// @raycast.authorURL https://github.com/dev99problems
// TODO: @genechulkov get rid of axios
const axios = require('axios')
const { outputColors, outputFieldsMap, formatNumber, leftPad} = require('./output')

const ENV = {
  // API docs: https://docs.kuna.io/docs/последние-данные-по-рынку-тикеры
  tickerUrl: 'https://api.kuna.io/v3/tickers?symbols=',
}

const getLatestInfo = async tickersList => {
  try {
    const res = await axios.get(`${ENV.tickerUrl}${tickersList}`)

    const firstTickerInfo = res.data[0]

    const [sym, , , , , , change24hPercent, lastPrice, vol24h, max24h, min24h] = firstTickerInfo
    const date = new Date().toLocaleTimeString()

    return {
      lastPrice: `${lastPrice} UAH`,
      change24hPercent: `${change24hPercent} %`,
      vol24h: formatNumber(vol24h),
      max24h: `${max24h} UAH`,
      min24h: `${min24h} UAH`,
      sym,
      date,
    }
  } catch (err) {
    return {
      error: `It's not possible to request market data`,
    }
  }
}

;(async function () {
  const res = await getLatestInfo('dogeuah')

  for (item in res) {
    const color = outputColors[item] ?? outputColors.default
    item === 'sym' && console.log('-------------------------')

    const fieldDescription = outputFieldsMap[item]
    console.log(`${color}${fieldDescription}${leftPad(fieldDescription)} = `, res[item])
  }
})()
