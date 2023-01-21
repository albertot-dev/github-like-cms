import { getLastPosts } from './getLastPosts'
import { getTotalNumberPosts } from './getTotalNumberPosts'

export async function getPostsPagination(
  username,
  repo,
  page = 1,
  perPage = 6
) {
  if (!process.env.GLCMS_USER_TOKEN) {
    throw new Error('GLCMS_USER_TOKEN is not defined')
  }

  if (!username) {
    console.error('GLCMS: username is not defined')
  }

  if (!repo) {
    console.error('GLCMS: repo is not defined')
  }
  const totalPosts = await getTotalNumberPosts(username, repo)

  const posts = await getLastPosts(username, repo, perPage, page)

  return {
    posts,
    actualPage: page,
    totalPosts: totalPosts
  }
}
