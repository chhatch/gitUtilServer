const getOpenPRs = require('../getOpenPRs')
const ghRepo = {
    listPullRequests: jest.fn(),
}

test('make request to get all open pulls', async () => {
    const firstPage = [1, 2]
    const secondPage = [3, 4]
    ghRepo.listPullRequests
        .mockReturnValueOnce(Promise.resolve({ data: firstPage }))
        .mockReturnValueOnce(Promise.resolve({ data: secondPage }))
        .mockReturnValueOnce(Promise.resolve({ data: [] }))
    const result = await getOpenPRs(ghRepo)
    expect(result).toEqual([...firstPage, ...secondPage])
    expect(ghRepo.listPullRequests).toHaveBeenCalledTimes(3)
    expect(ghRepo.listPullRequests).toHaveBeenNthCalledWith(1, {
        state: 'open',
        page: 1,
        per_page: 100,
    })
    expect(ghRepo.listPullRequests).toHaveBeenNthCalledWith(2, {
        state: 'open',
        page: 2,
        per_page: 100,
    })
    expect(ghRepo.listPullRequests).toHaveBeenNthCalledWith(3, {
        state: 'open',
        page: 3,
        per_page: 100,
    })
})

test('return 404 if repository cannot be found', async () => {
    ghRepo.listPullRequests.mockReturnValueOnce(
        Promise.reject({ response: { status: 404 } })
    )
    const result = await getOpenPRs(ghRepo).catch((e) => e)
    console.log(result)
    expect(result.status).toEqual(404)
})
