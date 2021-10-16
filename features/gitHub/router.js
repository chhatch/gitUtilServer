const express = require('express')
const gitHubRouter = new express.Router()

gitHubRouter.get('/', async (req, res) => {
    const repoUrl = req.query.url
    res.send(`${req.query.url} sure looks like a great repo!`)
})

module.exports = gitHubRouter
