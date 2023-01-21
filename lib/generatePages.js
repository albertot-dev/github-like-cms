import { generateSlug } from './generateSlug.js'
import { getAllPosts } from './getAllPosts.js'
import { getComments } from './getComments.js'
import { markdownToHtml } from './markdownToHtml.js'

/**
 * Make request with Github API to get all issues and generate static props for pages
 * ```js
 * const post = await generatePages();
 *  {
 *    title: 'My awesome post',
 *    slug: 'my-awesome-post',
 *    content: '<h1>My Awesome Post</h1>',
 *    author: {
 *      user: 'albertot-dev',
 *      avatar: 'https://avatars.githubusercontent.com/u/11647193?s=80&u=bcad462d03618a4717a1bf0726e06d6707a434c6&v=4',
 *    },
 *   comments: [
 *      {
 *        id: 1550829229,
 *        body: '<h1>This is a comment</h1>',
 *        user: 'albertot-dev',
 *        avatar: 'https://avatars.githubusercontent.com/u/11647193?s=80&u=bcad462d03618a4717a1bf0726e06d6707a434c6&v=4',
 *        created_at: '2021-02-15T20:00:29Z',
 *        reactions: {
 *            '+1': 0,
 *            '-1': 0,
 *            laugh: 0,
 *            hooray: 0,
 *            confused: 0,
 *            heart: 0,
 *            rocket: 0,
 *            eyes: 0
 *        }
 *      }
 *  ]
 * ```
 * @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @param {String} `slug` String with slug of the post
 * @returns {Post} Array of posts
 * @api public
 */
export async function generatePages(username, repo, slug) {
  if (!process.env.GLCMS_USER_TOKEN) {
    throw new Error('GLCMS_USER_TOKEN is not defined')
  }

  if (!username) {
    console.error('GLCMS: username is not defined')
  }

  if (!repo) {
    console.error('GLCMS: repo is not defined')
  }
  const postsList = await getAllPosts(username, repo)
  const postRaw = postsList.find((post) => generateSlug(post.title) === slug)
  const post = markdownToHtml(postRaw.body)
  const comments = await getComments(username, repo, postRaw.number)

  post.title = postRaw.title
  post.author = {
    user: postRaw.user.login,
    avatar: postRaw.user.avatar_url
  }

  post.comments = comments ?? []
  post.tags = postRaw.labels.filter((label) => label.name !== 'published')
  post.created_at = postRaw.created_at
  post.reactions = postRaw.reactions
  post.slug = slug

  return post
}
