const axios = require('axios')
const gitHubApiKey = process.env.GITHUB_API_KEY

const sleep = (ms) =>
    new Promise((resolve, _) => setTimeout(() => resolve(), ms))

const commitsFromPRs = async (pulls) => {
    try {
        for (let i = 0, len = pulls.length; i < len; i++) {
            const pull = pulls[i]
            const commits = (
                await axios.get(pull.commits_url, {
                    headers: { Authorization: `token ${gitHubApiKey}` },
                })
            ).data
            pull.numberOfCommits = commits.length
            sleep(20)
        }
        return pulls
    } catch (e) {
        console.log(e)
        throw new Error('Error getting commits')
    }
}

module.exports = commitsFromPRs
