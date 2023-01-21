import { markdownToHtml } from './markdownToHtml.js'

export async function getComments(username, repo, issueNumber) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/issues/${issueNumber}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GLCMS_USER_TOKEN}`
      }
    }
  )
  const responseJson = await response.json()

  const comments = responseJson.map((comment) => {
    return {
      id: comment.id,
      body: markdownToHtml(comment.body),
      user: comment.user.login,
      avatar: comment.user.avatar_url,
      created_at: comment.created_at,
      reactions: comment.reactions
    }
  })
  return comments
}
