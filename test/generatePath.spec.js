import { generatePaths } from '../lib'
import * as posts from '../lib/getAllPosts'
import * as comment from '../lib/getComments'
import allIssues from './github-issues'

const OLD_ENV = process.env
describe('generatePaths', () => {
  beforeEach(() => {
    posts.getAllPosts = jest.fn().mockImplementation(() => {
      return allIssues
    })
    comment.getComments = jest.fn().mockImplementation(() => {
      return []
    })
  })

  describe('when GLCMS_USER_TOKEN is not defined', () => {
    beforeAll(() => {
      jest.resetModules() // this is important - it clears the cache
      process.env = { ...OLD_ENV } // make a copy
      delete process.env.GLCMS_USER_TOKEN
    })

    afterAll(() => {
      process.env = OLD_ENV // restore old env
    })

    it('should throw Error if GLCMS_USER_TOKEN is not defined', async () => {
      try {
        await generatePaths('albertot-dev', 'glcms', 'test-page')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty(
          'message',
          'GLCMS_USER_TOKEN is not defined'
        )
      }
    })
  })

  it('if not call with user throw error ', async () => {
    try {
      await generatePaths('', '', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: username is not defined')
    }
  })

  it('if not call with repo throw error ', async () => {
    try {
      await generatePaths('alberto', '', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: repo is not defined')
    }
  })

  it('if slug not found in all posts should throw Error', async () => {
    try {
      await generatePaths('albertot-dev', 'glcms', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: slug not found')
    }
  })

  it('should return a post', async () => {
    const paths = await generatePaths(
      'albertot-dev',
      'glcms',
      'canmatch-for-test'
    )

    expect(paths.length).toBe(2)
    expect(paths[0]).toEqual({
      params: {
        slug: 'angular-testing-library-jest'
      }
    })
    expect(paths[1]).toEqual({
      params: {
        slug: 'canmatch-for-test'
      }
    })
    expect(posts.getAllPosts).toHaveBeenCalled()
  })
})
