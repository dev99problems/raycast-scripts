#!/Users/gene/.nvm/versions/node/v15.11.0/bin/node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title trim:link
// @raycast.mode compact

// Optional parameters:
// @raycast.icon ✂️
// @raycast.argument1 { "type": "text", "placeholder": "link" }

// Documentation:
// @raycast.author Eugene Chulkov
// @raycast.authorURL https://github.com/dev99problems

/*
* This little fellow can easily trim the extra meta data
* out of Great Suspender link, e.g.
*
* Before:
* chrome-extension://ahmkjjgdligadogjedmnogbpbcpofeeo/suspended.html#ttl=About%20SmartBear%20%7C%20Who%20is%20SmartBear%20Software%3F&pos=161&uri=https://www.infoq.com/news/2021/10/api-design-principles-slack/
*
* After:
* https://www.infoq.com/news/2021/10/api-design-principles-slack/
* */
const input = process.argv[2] || '';

const trimResult = input.replace(/^(\w|\W)*uri=/gi, '') || ''

const isValidLink = trimResult.startsWith('https://') || trimResult.startsWith('http://')
const output = isValidLink ? trimResult : 'Seems like corrupted link was provided'

console.log(output)
