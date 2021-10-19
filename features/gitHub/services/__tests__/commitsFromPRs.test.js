const axios = require('axios')
jest.mock('axios')
const commitsFromPRs = require('../commitsFromPrs')
const gitHubApiKey = process.env.GITHUB_API_KEY

test('should retrieve commits for pullRequest objects from GitHib api', async () => {
    const pulls = [{ commits_url: 'foo' }, { commits_url: 'bar' }]
    axios.get.mockReturnValue(Promise.resolve({ data: [1, 2] }))
    const result = await commitsFromPRs(pulls)
    const expected = pulls.map((x) => ({ ...x, numberOfCommits: 2 }))
    result.forEach((pull, index) => {
        expect(pull).toEqual(expected[index])
        expect(axios.get).toHaveBeenNthCalledWith(
            //jest method is indexed from 1
            index + 1,
            pulls[index].commits_url,
            { headers: { Authorization: `token ${gitHubApiKey}` } }
        )
    })
})
