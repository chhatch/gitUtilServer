const sleep = (ms) =>
    new Promise((resolve, _) => setTimeout(() => resolve(), ms))

const getOpenPrs = async (ghRepo) => {
    try {
        let openPulls = []
        let page = 1
        while (true) {
            const queryRes = await ghRepo.listPullRequests({
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
        return openPulls
    } catch (e) {
        //this handles private repos too
        if (e.response && e.response.status === 404) {
            let e = new Error('Repository not found')
            e.status = 404
            throw e
        } else throw e
    }
}

module.exports = getOpenPrs
