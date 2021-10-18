const sleep = (ms) =>
    new Promise((resolve, _) => setTimeout(() => resolve(), ms))

const commitsFromPRs = async (pulls) => {
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
    return openPulls
}
