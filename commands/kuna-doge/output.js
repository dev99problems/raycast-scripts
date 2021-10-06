const { colors } = require('./colors')

const outputColors = {
  lastPrice: colors.yellow,
  change24hPercent: colors.blue,
  max24h: colors.green,
  min24h: colors.red,
  error: colors.red,
  default: colors.cyan,
}

const outputFieldsMap = {
  lastPrice: 'last price',
  change24hPercent: 'change 24h',
  vol24h: 'volume 24h',
  max24h: 'MAX PRICE 24h',
  min24h: 'min price 24h',
  sym: 'ticker',
  date: 'update time',
}

const charNumTimes = (num, char = ' ') => Array(num).fill(char).join('')

const leftPad = (str = '') => {
  const values = Object.values(outputFieldsMap)
  const maxLen = Math.max(...values.map(item => item.length))
  const diff = maxLen - str.length
  const numOfSpaces = Math.max(diff, 0)

  return charNumTimes(numOfSpaces);
}

const formatNumber = number => {
  const [integer, fractional] = `${number}`.split('.')

  const formattedInt = integer
    .split('')
    .reverse()
    .reduce((acc, item, idx) => {
      return (idx + 1) % 3 === 0 ? acc + `${item} ` : acc + item
    }, '')
    .split('')
    .reverse()
    .join('')
    .trim()

  return `${formattedInt}.${fractional.slice(0, 2)}`
}

module.exports = {
  outputFieldsMap,
  outputColors,
  formatNumber,
  leftPad,
}
