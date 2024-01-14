<div align="center">
    <img alt="Raycast Logo" src="images/raycast-logo.svg" height="100"/>
    <h1>raycast-scripts</h1>
</div>

Home of **dev99problems'** self-written `Raycast` scripts

## Raycast
[raycastapp](https://www.raycast.com/)  is ~~Spotlight on steroids~~ is a blazingly fast, extendable MacOS app launcher and way more!

Most of these **raycast scripts** are used on daily basis. Nothing major, 
just small simple things, which **make my life easier**.

<br/>

## List of commands

### 📹 video:convert

Scales down all `today` created videos (screencasts), using `ffmpeg` into 1920:1024 format.
Usually such scale down helps to lost up to **75% of the initial file size** and after that — such files
are super easy and fast to share.

https://user-images.githubusercontent.com/6503508/187051414-5b14293a-d74d-4f36-b29f-8276fc06a126.mov

<br/>


### 💲 subsminder

Displays current active `monthly/yearly` subscriptions I have (stored at `Airtable`)
in a form of a table view with `total` field, info about `paid` subs this month/year,
`next` closest payment and auto cron updater of payment dates while `subs` remain marked as `renewed`.
The same `cron` job sends messages one day before the next `monthly` subscription payment.

**Yearly subs**
![subsminder_yearly](https://user-images.githubusercontent.com/6503508/205745717-4aa20bc1-7bcf-4ccb-9a87-d2417c5c686f.jpg)

**Monthly subs**
![latest_subsmidner_screen](https://user-images.githubusercontent.com/6503508/204893478-3d6232c5-cf3c-4a6d-a998-90824db6e72e.jpg)

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

**`So to avoid these`** restrictions and additional access requests, this little fellow was implemented.

<br/>


### ✂️ trim:link

Trims the meta data from [Great Suspender](https://chrome.google.com/webstore/detail/the-great-suspender/jaekigmcljkkalnicnjoafgfjoefkpeg?hl=en) links.
Works pretty much the same as [great-suspender-link-trimmer](https://github.com/dev99problems/great-suspender-link-trimmer)

https://user-images.githubusercontent.com/6503508/137031968-ce1e2837-5a70-4e11-939f-97150e248289.mov

<br/>

## Related Links 
Here is `repo` of [community driven scripts](https://github.com/raycast/script-commands) for `Raycast`
