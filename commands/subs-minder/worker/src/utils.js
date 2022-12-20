const log = console.log
const error = console.error

function logKeys(obj = {}) {
  Object.keys(obj).forEach(key => log(key)) 
}

function toCapitalCase(str) {
  if (typeof str !== 'string') {
    throw new Error('JError: passed param to toCapitalCase should be a string')
  }

  return str[0]?.toUpperCase() + str.slice(1)
}

export { log, error, logKeys, toCapitalCase }
