#!/Users/gene/.nvm/versions/node/v16.11.1/bin/node


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
const { displayPrs, displaySectionName } = require('./output.js')
const ENV = require('./env')

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: ENV.authToken })

const extractPrData = pr => ({
  url: pr.html_url,
  number: pr.number,
  title: pr.title,
  state: pr.state,
})

const getRepoOpenPrs = async ({ owner, repo, state = 'open', creator = ENV.creator }) => {
  const { data } = (await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    state,
    creator,
    is: 'pr',
  })) || { data: [] }

  return data
}

const getSectionProjectsPrs = async (owner, reposList) => {
  let result = {}

  for (const repo of reposList) {
    const openPRs = await getRepoOpenPrs({ owner, repo })
    if (openPRs && openPRs.length) {
      result[repo] = openPRs.map(extractPrData)
    }
  }

  return result
}

;(async () => {
  try {
    const { projects } = ENV
    const keys = Object.keys;

    for (const section of keys(projects)) {
      const { owner, repos } = projects[section]

      const allPRs = await getSectionProjectsPrs(owner, repos)
      const anyPrInSection = !!keys(allPRs)?.length

      anyPrInSection && displaySectionName(section)
      displayPrs(allPRs, owner)
    }
  } catch (err) {
    console.error(err)
  }
})()
