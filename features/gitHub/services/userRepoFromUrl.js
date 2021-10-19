const userRepoFromUrl = (repoUrl) => {
    const match = /\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)/.exec(repoUrl)
    //allowed characters are alphanumeric plus hyphen
    //there are additional restrictions
    //username cannot have consecutive hyphen and cannot begin or end with a hyphen
    const user = match[1]
    //allowed characters are alphanumeric plus hyphen, underscore, and period
    //there may be additional restrictions
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
