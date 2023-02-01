export async function getTotalNumberPosts(username, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
      }
    }
  )
  let totalPost = 0
  const { open_issues_count } = await response.json()
  const totalPages = Math.ceil(open_issues_count / 100)
  for (let i = 1; i <= totalPages; i++) {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/issues?per_page=${100}&page=${i}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
        }
      }
    )

    totalPost += (await response.json()).filter((post) =>
      post.labels.some((label) => label.name === 'published')
    ).length
  }

  return totalPost
}
