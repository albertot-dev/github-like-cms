/**
 * Make request with Github API to get all issues and generate paths
 * ```js
 * const posts = await generatePaths();
 * [
 *  {
 *    params: {
 *     slug: 'my-first-post'
 *   }
 *  ]
 * ```
 * @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @returns {Paths[]} Array of posts
 * @api public
 */

import { generateSlug } from './generateSlug.js'
import { getAllPosts } from './getAllPosts.js'

export async function generatePaths(username, repo) {
  if (!username) {
    throw new Error('GLCMS: username is not defined')
  }

  if (!repo) {
    throw new Error('GLCMS: repo is not defined')
  }

  const posts = await getAllPosts(username, repo)

  return posts.map((post) => ({
    params: {
      slug: generateSlug(post.title)
    }
  }))
}
