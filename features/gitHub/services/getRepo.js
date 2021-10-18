const getRepo = (gh) => (repoInfo) => gh.getRepo(repoInfo.user, repoInfo.repoName)

module.exports = getRepo
