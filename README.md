<div align="center">
    <img alt="Raycast Logo" src="images/raycast-logo.svg" height="100"/>
    <h1>raycast-scripts</h1>
</div>

Home of **dev99problems'** `Raycast` daily routine scripts

## Raycast
[raycastapp](https://www.raycast.com/) is a kind of tool, that can be described as `Spotlight` on steroids. 
It is **simple**, **flexible**, does not require any **~~paid subscription~~** at the moment, and provides a great functionality
of interacting with a lot of apps on your MacOS, not opening directly.

Another **killer feature** — the ability to run scripts at `the fingertips `.
So `this repo` is a home for my personal `scripts`, which I use pretty often. Nothing major, no rocket science,
just the small simple things, which `make my life easier`.

<br/>

## List of commands

### 📹 video:convert

Scales down all `today` created videos (screencasts), using `ffmpeg` into 1920:1024 format.
Usually such scale down helps to lost up to **75% of the initial file size** and after that — such files
are super easy and fast to share.

https://user-images.githubusercontent.com/6503508/187051414-5b14293a-d74d-4f36-b29f-8276fc06a126.mov

<br/>


### 💲 subsminder

Displays current active `monthly` subscriptions I have (stored at `Airtable`)
in a form table view with a `monthly total`.

![subsminder](https://user-images.githubusercontent.com/6503508/201231535-5c93c0fc-f5d0-4e0e-ad29-bc2a2e197f63.png)

<br/>

### 🛫 synclair:(up & down)

Simply configured `rsync` command to sync local folder, full of `*.md` notes to iCloud.

<img width="1084" alt="synclair_dry_run" src="https://user-images.githubusercontent.com/6503508/190903826-73410d90-0156-4616-9ebf-43bd7c8aa44d.png">

<br/>

### 🤖 pulls:open

Gets all open `Github pull-requests` of author, from a `list of projects`, grouped by the `section`.

<img src="./images/pulls-open.jpg" alt="drawing" width="570" />

#### Rationale
Even though, `Raycast` has this functionality `out of the box`, if you use your `personal` Github account for both **personal**
projects and **private** projects of your work `organization`, you often need to request the broader list of `access` in your 
organization for this integration to be able to get your `work pull-requests` and it may be a problem.

**`So to avoid those`** restrictions and additional access requests, this little fellow was implemented.

<br/>

### ✂️ trim:link

Trims the meta data from [Great Suspender](https://chrome.google.com/webstore/detail/the-great-suspender/jaekigmcljkkalnicnjoafgfjoefkpeg?hl=en) links.
Works pretty the same as [great-suspender-link-trimmer](https://github.com/dev99problems/great-suspender-link-trimmer)

https://user-images.githubusercontent.com/6503508/137031968-ce1e2837-5a70-4e11-939f-97150e248289.mov

<br/>

### 📈 kuna:doge

Gets the latest **DOGE/UAH** information from [kuna.io](https://kuna.io/markets/dogeuah)

<img src="./images/kuna-doge.png" alt="drawing" width="570" />

<br/>

## Related Links 
Here is `repo` of [community driven scripts](https://github.com/raycast/script-commands) for `Raycast`
