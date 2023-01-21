export async function getTotalNumberPosts(username, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
      }
    }
  )
  const { open_issues_count } = await response.json()
  return open_issues_count
}
