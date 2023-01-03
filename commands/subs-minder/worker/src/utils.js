const log = console.log
const error = console.error

function logKeys(obj = {}) {
  Object.keys(obj).forEach(key => log(key)) 
}

function toCapitalCase(str) {
  if (typeof str !== 'string') {
    throw new Error('JError: toCapitalCase passed param to toCapitalCase should be a string')
  }

  return str[0]?.toUpperCase() + str.slice(1)
}

// formats dates like: Dec 22
function format_date(date) {
  const formatted_date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
  return formatted_date?.split(',')?.[0]
}

function fill_with_spaces(count) {
  return Array.new(count + 1).join(' ')
}


function resetHMS (date) {
  date?.setHours('0')
  date?.setMinutes('0')
  date?.setSeconds('0')

  return date
}

export { 
  log,
  error,
  logKeys,
  toCapitalCase,
  format_date,
  fill_with_spaces,
  resetHMS,
}
