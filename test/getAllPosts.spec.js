import { getAllPosts } from '../lib/getAllPosts'
import allIssues from './github-issues'
import * as getTotalNumberPosts from '../lib/getTotalNumberPosts'

global.fetch = jest.fn().mockImplementationOnce(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(allIssues)
  })
)
describe('get all posts', () => {
  beforeEach(() => {
    getTotalNumberPosts.getTotalNumberPosts = jest
      .fn()
      .mockImplementation(() => {
        return 2
      })
  })
  it('empty string should throw Error', async () => {
    const posts = await getAllPosts('albertot-dev', 'glcms')
    expect(posts).toHaveLength(2)
  })
})
