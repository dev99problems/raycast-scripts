--------
TODO subsminder
--------

## TODO
`[X]` add worker for updating subs `valid_through` dates
`[X]` add the same functionality for `yearly` subs
`[ ]` consider: adding for the next payment a field like (`in 2 days` or `in 1.5 months`)

## Refactoring

**lib**
`[ ]` shave off the `data` field in `Row` class and rename `Row` -> `Subscription`
`[ ]` get rid of `require_relative` completely???

**worker**
`[ ]` better dev flow bootstrapping
