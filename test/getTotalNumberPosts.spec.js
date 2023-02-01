import { getTotalNumberPosts } from '../lib/getTotalNumberPosts'

import repoInfo from './github-repo-info'
import repoIssues from './github-issues'
const mockFetch = jest.fn()

// Uso de jest.spyOn para reemplazar la función global fetch con nuestro mock
jest.spyOn(global, 'fetch').mockImplementation(mockFetch)
mockFetch
  .mockResolvedValueOnce({ json: () => repoInfo })
  .mockResolvedValueOnce({ json: () => repoIssues })
const OLD_ENV = process.env
describe('getTotalNumberPosts', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('should return a number of posts', async () => {
    const totalNumber = await getTotalNumberPosts('albertot-dev', 'glcms')
    expect(totalNumber).toBe(2)
  })
})
