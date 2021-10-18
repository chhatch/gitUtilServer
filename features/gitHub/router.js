const express = require('express')
const gitHubRouter = new express.Router()
const GitHub = require('github-api')
const axios = require('axios')
const gitHubApiKey = process.env.GITHUB_API_KEY
const commitsFromPRs = require('./services/commitsFromPrs')
const getOpenPrs = require('./services/getOpenPRs')
const getRepo = require('./services/getRepo')
const userRepoFromUrl = require('./services/userRepoFromUrl')
const validateUrl = require('./services/validateUrl')

gitHubRouter.get('/', async (req, res) => {
    const gh = new GitHub({ token: gitHubApiKey })
    const repoUrl = req.query.url

    //kick things off with a resolved promise
    Promise.resolve(repoUrl)
        .then(validateUrl)
        .then(userRepoFromUrl)
        .then(getRepo(gh))
        .then(getOpenPrs)
        .then(commitsFromPRs)
        .then((openPulls) =>
            openPulls.map((pull) => ({
                numberOfCommits: pull.numberOfCommits,
                title: pull.title,
                url: pull.html_url,
            }))
        )
        .then((resData) => res.json(resData))
        .catch((e) => {
            console.log(e)
            res.status = 500
            res.send('Server Error')
        })
})

module.exports = gitHubRouter
