import { generateSlug } from './generateSlug.js'
import { markdownToHtml } from './markdownToHtml.js'

/**
 * Make request with Github API to get the lasts issues with label published
 * ```js
 * const posts = await getLastPosts();
 * [
 *  {
 *    id: 1550829229,
 *    title: 'My awesome post',
 *    slug: 'my-awesome-post',
 *    content: '<h1>My Awesome Post</h1>',
 *    description: 'My awesome post description',
 *    image: 'https://my-awesome-post-image.png',
 *    comments: 0,
 *    date: '2021-02-15T20:00:29Z',
 *    author: 'albertot-dev',
 *    authorAvatar: 'https://avatars.githubusercontent.com/u/11647193?s=80&u=bcad462d03618a4717a1bf0726e06d6707a434c6&v=4',
 *    reactions:
 *      {
 *        '+1': 0,
 *        '-1': 0,
 *        laugh: 0,
 *        hooray: 0,
 *        confused: 0,
 *        heart: 0,
 *        rocket: 0,
 *        eyes: 0
 *      }
 *  }
 * ```
 * @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @param {number} `nItems` Number of items to return, default 6
 * @param {number} `page` Number of page to return, default 1
 * @returns {Post[]} Array of posts
 * @api public
 */
export async function getLastPosts(username, repo, nItems = 6, page = 1) {
  if (!process.env.GLCMS_USER_TOKEN) {
    throw new Error('GLCMS_USER_TOKEN is not defined')
  }

  if (!username) {
    console.error('GLCMS: username is not defined')
  }

  if (!repo) {
    console.error('GLCMS: repo is not defined')
  }

  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/issues?labels=published&per_page=${nItems}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
      }
    }
  )
  const issues = await response.json()
  const posts = issues.map((issue) => {
    const postInfo = markdownToHtml(issue.body)

    return {
      id: issue.id,
      slug: generateSlug(issue.title),
      title: issue.title,
      content: postInfo.content,
      description: postInfo.description,
      image: postInfo.image,
      comments: issue.comments,
      date: issue.created_at,
      author: issue.user.login,
      authorAvatar: issue.user.avatar_url,
      reactions: issue.reactions
    }
  })

  return posts
}
