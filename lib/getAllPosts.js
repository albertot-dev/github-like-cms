import { getTotalNumberPosts } from './getTotalNumberPosts.js'

export async function getAllPosts(username, repo) {
  const posts = []

  const totalPosts = await getTotalNumberPosts(username, repo)

  const totalPages = Math.ceil(totalPosts / 100)

  for (let i = 1; i <= totalPages; i++) {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/issues?labels=published&per_page=${100}&page=${i}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
        }
      }
    )
    posts.push(...(await response.json()))
  }

  return posts
}
