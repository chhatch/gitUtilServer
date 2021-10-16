const express = require('express')
const gitHubRouter = new express.Router()

gitHubRouter.get('/', async (req, res) => {
    res.send('Good job, buddy!')
})

module.exports = gitHubRouter
