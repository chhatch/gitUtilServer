const userRepoFromUrl = (repoUrl) => {
    const match = /\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/.exec(repoUrl)
    const user = match[1]
    const repoName = match[2]
    return {user, repoName}
}

module.exports = userRepoFromUrl
