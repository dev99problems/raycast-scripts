# TODO for subsminder
<br>

## NeXT

* `[*]` release sending notifications for `yearly` subs
<br>

## Backlog

### General

* `[ ]` consider: adding for the next payment a field like (`in 2 days` or `in 1.5 months`)

### Refactoring

**lib**
* `[ ]` shave off the `data` field in `Row` class and rename `Row` -> `Subscription`
* `[ ]` get rid of `require_relative` completely???

**worker**
* `[*]` release sending notifications for `yearly` subs
* `[ ]` better dev flow bootstrapping
<br>

## Done

**lib**
* `[X]` add worker for updating subs `valid_through` dates
* `[X]` add the same functionality for `yearly` subs
