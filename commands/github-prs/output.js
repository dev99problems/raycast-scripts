const colors = {
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
}

const { FgGreen, FgYellow, FgBlue, FgRed, FgCyan } = colors

const prepareForOutput = (pr, idx) => {
  const { url, title, number } = pr
  const numPart = FgGreen + `# ${idx + 1}: `  // # 1:
  const titlePart = FgYellow + title + ` | ${FgRed}PR # ${FgCyan}${number}` + '\n' // pr title | PR # number
  const urlPart = '     ' + url + '\n\n'

  const row = numPart + titlePart + urlPart

  return row
}

const displayPrs = allPRs => {
  Object.keys(allPRs).forEach(repoName => {
    const repoPRs = allPRs[repoName]
    const repositoryName = `${FgBlue}${repoName}:\n`
    console.log(repositoryName)

    const prsList = repoPRs.map(prepareForOutput).join('')

    console.log(prsList)
  })
}

const displaySectionName = section => {
  const colorMap = {
    work: FgRed,
    personal: FgGreen,
  }
  
  console.log(colorMap[section] + section.toUpperCase() + ':')
}

exports.displayPrs = displayPrs
exports.displaySectionName = displaySectionName
