const log = console.log
const error = console.error

function log_keys(obj = {}) {
  Object.keys(obj).forEach(key => log(key)) 
}

function to_capital_case(str) {
  if (typeof str !== 'string') {
    throw new Error('JError: to_capital_case passed param to should be a string')
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


function reset_HMS (date) {
  date?.setHours('0')
  date?.setMinutes('0')
  date?.setSeconds('0')

  return date
}

export { 
  log,
  error,
  log_keys,
  to_capital_case,
  format_date,
  fill_with_spaces,
  reset_HMS,
}
