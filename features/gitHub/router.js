const express = require('express')
const gitHubRouter = new express.Router()
const GitHub = require('github-api')
const axios = require('axios')
const gitHubApiKey = process.env.GITHUB_API_KEY

const sleep = (ms) => {
    console.log('Sleep!', ms)
    return new Promise((resolve, _) => setTimeout(() => resolve(), ms))
}

gitHubRouter.get('/', async (req, res) => {
    const gh = new GitHub({ token: gitHubApiKey })
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
            await sleep(20)
        } else break
    }

    for (let i = 0, len = openPulls.length; i < len; i++) {
        const pull = openPulls[i]
        const commits = (
            await axios.get(pull.commits_url, {
                headers: { Authorization: `token ${gitHubApiKey}` },
            })
        ).data
        pull.numberOfCommits = commits.length
        sleep(20)
    }

    res.json(
        openPulls.map((pull) => ({
            numberOfCommits: pull.numberOfCommits,
            title: pull.title,
            url: pull.html_url,
        }))
    )
})

module.exports = gitHubRouter
