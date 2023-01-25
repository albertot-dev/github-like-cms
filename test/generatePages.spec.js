import { generatePages } from '../lib'
import * as posts from '../lib/getAllPosts'
import * as comment from '../lib/getComments'
import allIssues from './github-issues'

const OLD_ENV = process.env
describe('generatePages', () => {
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
        await generatePages('albertot-dev', 'glcms', 'test-page')
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
      await generatePages('', '', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: username is not defined')
    }
  })

  it('if not call with repo throw error ', async () => {
    try {
      await generatePages('alberto', '', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: repo is not defined')
    }
  })

  it('if slug not found in all posts should throw Error', async () => {
    try {
      await generatePages('albertot-dev', 'glcms', 'test-page')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'GLCMS: slug not found')
    }
  })

  it('should return a post', async () => {
    const post = await generatePages(
      'albertot-dev',
      'glcms',
      'canmatch-for-test'
    )

    expect(post.title).toEqual('CanMatch for test')
    expect(post.content).toEqual(
      '<p>¿Siempre has querido utilizar una misma ruta en angular pero renderizar componentes diferentes... según rol, un test a/b de alguna version nueva de tu aplicación?...</p>\n'
    )
    expect(post.author.user).toEqual('albertot-dev')
    expect(post.author.avatar).toEqual(
      'https://avatars.githubusercontent.com/u/11647193?v=4'
    )
    expect(post.tags).toEqual([
      {
        color: '1d76db',
        default: false,
        description: '',
        id: 5057773720,
        name: 'angular',
        node_id: 'LA_kwDOF5VWuM8AAAABLXeAmA',
        url: 'https://api.github.com/repos/albertot-dev/alberto.dev/labels/angular'
      }
    ])
    expect(post.image).toEqual(
      'https://user-images.githubusercontent.com/11647193/213481019-2df0bf8c-3258-4abe-ae68-2e052bcb6e2c.png'
    )
    expect(posts.getAllPosts).toHaveBeenCalled()
  })
})
