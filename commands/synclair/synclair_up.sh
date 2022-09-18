#!/usr/bin/env zsh
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title synclair:up
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🛫
# @raycast.description Upstream sync of your notes

# Documentation:
# @raycast.author Eugene Chulkov
# @raycast.authorURL https://github.com/dev99problems

LOCAL="/Users/<USER>/<SOME_PATH>/notes"
REMOTE="/Users/<USER>/Library/Mobile Documents/com~apple~CloudDocs/notes"

# for debugging
# rsync -vran --exclude={".DS_Store",".idea"} "${LOCAL}/" $REMOTE

# for doing stuff
rsync -ra --exclude={".DS_Store",".idea"} "${LOCAL}/" $REMOTE

