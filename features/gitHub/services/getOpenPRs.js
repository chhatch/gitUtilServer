const sleep = (ms) =>
    new Promise((resolve, _) => setTimeout(() => resolve(), ms))

const getOpenPrs = async (ghRepo) => {
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
}

module.exports = getOpenPrs
