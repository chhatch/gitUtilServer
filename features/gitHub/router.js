const express = require('express')
const gitHubRouter = new express.Router()

gitHubRouter.get('/', async (req, res) => {
    const repoUrl = req.query.url
    const splitUrl = repoUrl.split('/')
    const match = (/\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/).exec(repoUrl)
    const user = match[1]
    const repo = match[2]
    console.log(repoUrl)
    console.log(match)
    res.send(`User: ${user}
Repository: ${repo}`)
})

module.exports = gitHubRouter
