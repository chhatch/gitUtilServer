const userRepoFromUrl = (repoUrl) => {
    const match = /\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/.exec(repoUrl)
    const user = match[1]
    const repoName = match[2]
    if (!user) {
        let e = new Error('Invalid GitHub username')
        e.status = 400
        throw e
    }
    if (!repoName) {
        let e = new Error('Invalid GitHub repository name')
        e.status = 400
        throw e
    }
    return { user, repoName }
}

module.exports = userRepoFromUrl
