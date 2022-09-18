# Synclair — here to sync notes to iCloud

## Preface

Usually I create a lot of notes in `*.md` format,
so the main reason for this script:
* have them synced with iCloud, back & forward
* have those notes avaialbe across multiple devices

## Prerequisites

To have `rsync` installed, usually can be done with
```shell
brew install rsync
```

## Config

There are 2 folders: `LOCAL` and `REMOTE`, that should be configured beforehand.

They should be set without the trailing `/`, it will be handled by script itself, **e.g.**

`LOCAL="/Users/<USER>/Documents/learn/notes"`

`REMOTE="/Users/<USER>/Library/Mobile Documents/com~apple~CloudDocs/"`

