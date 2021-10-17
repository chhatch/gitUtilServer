const express = require('express')
const gitHubRouter = new express.Router()
const GitHub = require('github-api')

gitHubRouter.get('/', async (req, res) => {
    const gh = new GitHub()
    const repoUrl = req.query.url
    const splitUrl = repoUrl.split('/')
    const match = (/\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/).exec(repoUrl)
    const user = match[1]
    const repoName = match[2]

    const repo = gh.getRepo(user, repoName)
    const queryRes = await repo.listPullRequests({state: 'open'})
    const openPulls = queryRes.data
    
    res.send(`${openPulls.length} open pull requests`)
})

module.exports = gitHubRouter
