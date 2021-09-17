#!/Users/gene/.nvm/versions/node/v15.11.0/bin/node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title pulls:open
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🤖

// Documentation:// @raycast.description Show open Pull-Requests authored by user
// in a list of repositories
// @raycast.author Eugene Chulkov
// @raycast.authorURL https://github.com/dev99problems

const { Octokit } = require('octokit')
const { displayOutput, colors } = require('./output.js')
const ENV = require('./env')

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: ENV.authToken })

const extractPrData = pr => ({
  url: pr.html_url,
  number: pr.number,
  title: pr.title,
  state: pr.state,
})

const getRepoOpenPRs = async ({ owner, repo, state = 'open', creator = ENV.creator }) => {
  const { data } = (await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    state,
    creator,
    is: 'pr',
  })) || { data: [] }

  return data
}

const getAllPRs = async (owner, reposList) => {
  let result = {}

  for (const repo of reposList) {
    const openPRs = await getRepoOpenPRs({ owner, repo })
    if (openPRs && openPRs.length) {
      result[repo] = openPRs.map(extractPrData)
    }
  }

  return result
}

;(async () => {
  try {
    const { projects } = ENV
    for (const project of Object.keys(projects)) {
      const color = project === 'personal' ? colors.FgGreen : colors.FgRed
      console.log(color + project.toUpperCase() + ':')
      
      const { owner, repos } = projects[project]

      const allPRs = await getAllPRs(owner, repos)
      displayOutput(allPRs)
    }
  } catch (err) {
    console.error(err)
  }
})()
