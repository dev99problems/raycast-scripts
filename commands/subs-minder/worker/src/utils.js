const log = console.log
const error = console.error

function logKeys(obj = {}) {
  Object.keys(obj).forEach(key => log(key)) 
}

export { log, error, logKeys }
