# github-prs

## Configuration

This command uses external config file `env.js` file of the next shape
```js
// github-prs/env.js
module.exports = {
    authToken: 'auth_token_goes_here', // your GH auth token
    creator: 'dev99problems', // your GH user name aka author
    projects: {
        work: {
            owner: 'apple', // your organization name goes here
            repos: [
                'project1',
                'project2'
            ]
        },
        personal: {
            owner: 'dev99problems',
            repos: [
                'raycast-scripts',
                'alfred-translayta'
            ]
        }
    }
}
```
