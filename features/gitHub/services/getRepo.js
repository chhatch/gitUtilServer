//it would be nice if we could confirm the repo exists here
const getRepo = (gh) => (repoInfo) => gh.getRepo(repoInfo.user, repoInfo.repoName)

module.exports = getRepo
