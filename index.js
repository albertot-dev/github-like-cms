import {
  getLastPosts,
  generatePaths,
  generatePages,
  getPostsPagination
} from './lib/index.js'

const glcms = {
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
   *    tags: ['tag1', 'tag2'],
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
  getLastPosts,
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
  generatePaths,
  /**
   * Make request with Github API to get all issues and generate static props for pages
   * ```js
   * const post = await generatePages();
   *  {
   *    title: 'My awesome post',
   *    slug: 'my-awesome-post',
   *    content: '<h1>My Awesome Post</h1>',
   *    created_at: '2021-02-15T20:00:29Z',
   *    tags: ['tag1', 'tag2'],
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
   *      },
   *     {
   *  ],
   *  reactions: {
   *            '+1': 0,
   *            '-1': 0,
   *            laugh: 0,
   *            hooray: 0,
   *            confused: 0,
   *            heart: 0,
   *            rocket: 0,
   *            eyes: 0
   *        }
   * ```
   * @param {String} `username` String, with name of the user or organization
   * @param {String} `repo` String with name of the repository
   * @param {String} `slug` String with slug of the post
   * @returns {Post} Array of posts
   * @api public
   */
  generatePages,
  /**
   * Make request with Github API to get the lasts issues with label published
   * ```js
   * const posts = await getPostsPagination();
   *  {
   *  posts: [
   *            {
   *              id: 1550829229,
   *              title: 'My awesome post',
   *              slug: 'my-awesome-post',
   *              content: '<h1>My Awesome Post</h1>',
   *              description: 'My awesome post description',
   *              image: 'https://my-awesome-post-image.png',
   *              comments: 0,
   *              date: '2021-02-15T20:00:29Z',
   *              author: 'albertot-dev',
   *              authorAvatar: 'https://avatars.githubusercontent.com/u/11647193?s=80&u=bcad462d03618a4717a1bf0726e06d6707a434c6&v=4',
   *              tags: ['tag1', 'tag2'],
   *              reactions:
   *                {
   *                  '+1': 0,
   *                  '-1': 0,
   *                  laugh: 0,
   *                  hooray: 0,
   *                  confused: 0,
   *                  heart: 0,
   *                  rocket: 0,
   *                  eyes: 0
   *                }
   *            }
   *  ],
   *  actualPage: 1,
   *  totalPages: 2
   * ```
   * @param {String} `username` String, with name of the user or organization
   * @param {String} `repo` String with name of the repository
   * @param {number} `nItems` Number of items to return, default 6
   * @param {number} `page` Number of page to return, default 1
   * @returns {Object{
   * posts: Post[],
   * actualPage: number,
   * totalPages: number
   * }} Object with posts and status of pagination
   * @api public
   */
  getPostsPagination
}

export default glcms
