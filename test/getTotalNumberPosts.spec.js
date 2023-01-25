import { getTotalNumberPosts } from '../lib/getTotalNumberPosts'

import repoInfo from './github-repo-info'
global.fetch = jest.fn().mockImplementationOnce(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(repoInfo)
  })
)
const OLD_ENV = process.env
describe('getTotalNumberPosts', () => {
  beforeEach(() => {
    fetch.mockClear()
    console.log()
  })

  it('should return a number of posts', async () => {
    const totalNumber = await getTotalNumberPosts('albertot-dev', 'glcms')
    expect(totalNumber).toBe(5)
  })
})
