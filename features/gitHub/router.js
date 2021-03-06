const express = require('express')
const gitHubRouter = new express.Router()
const GitHub = require('github-api')
const gitHubApiKey = process.env.GITHUB_API_KEY
const commitsFromPRs = require('./services/commitsFromPRs')
const getOpenPRs = require('./services/getOpenPRs')
const getRepo = require('./services/getRepo')
const userRepoFromUrl = require('./services/userRepoFromUrl')
const validateUrl = require('./services/validateUrl')

const tap = (arg) => {
    console.log(arg)
    return arg
}

gitHubRouter.get('/', async (req, res) => {
    const gh = new GitHub({ token: gitHubApiKey })
    const repoUrl = req.query.url

    //kick things off with a resolved promise
    Promise.resolve(repoUrl)
        .then(validateUrl)
        .then(userRepoFromUrl)
        .then(getRepo(gh))
        .then(getOpenPRs)
        .then(commitsFromPRs)
        .then((openPulls) =>
            openPulls.map((pull) => ({
                numberOfCommits: pull.numberOfCommits,
                title: pull.title,
                url: pull.html_url,
            }))
        )
//    .then(tap)
        .then((resData) => res.json(resData))
        .catch((e) => {
            status = e.status || 500
            res.status(status).send(e.message)
        })
})

module.exports = gitHubRouter
