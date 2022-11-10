# README

Tiny script for showing all currently active subscriptions to different 
`services` and `digital products` or other activities.
The data stored in `Airtable`


## Development

To start development, go to `Airtable` and grab:
* API key, starting with `keyXXXXXXXXXXX`
* app name, which usually starts with `appXXXXXXXXXX`
* table name

After that fill in `utils/.env.rb` file and generate fresh mocks via
```bash
ruby ./lib/utils/fetch_to_file.rb
```
