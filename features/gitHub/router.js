const express = require('express')
const gitHubRouter = new express.Router()
const GitHub = require('github-api')
const axios = require('axios')

gitHubRouter.get('/', async (req, res) => {
    const gh = new GitHub()
    const repoUrl = req.query.url
    const splitUrl = repoUrl.split('/')
    const match = /\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/.exec(repoUrl)
    const user = match[1]
    const repoName = match[2]

    const repo = gh.getRepo(user, repoName)
    let openPulls = []
    let page = 1
    while (true) {
        const queryRes = await repo.listPullRequests({
            state: 'open',
            page,
            per_page: 100,
        })
        if (queryRes.data.length) {
            openPulls.push(...queryRes.data)
            page++
        } else break
    }
    console.log(openPulls)

    openPulls = Promise.all(
        openPulls.map(async (pull) => {
            const commits = (await axios.get(pull.commits_url)).data.length
        })
    )

    res.json(
        openPulls.map((pull) => ({ commits,title: pull.title, url: pull.html_url }))
    )
})

module.exports = gitHubRouter
