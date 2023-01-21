import md from 'markdown-it'
import matter from 'gray-matter'
import hljs from 'highlight.js'

export function markdownToHtml(markdown) {
  let bodyClean = markdown.replace(/\r/gm, '')
  let imageUrl = bodyClean.match(/image: !\[.*\]\((.*)\)/)
  imageUrl = imageUrl ? imageUrl[1] : '/images/post-default.png'
  bodyClean = bodyClean.replace(
    /image: !\[.*\]\(.*\)/,
    'image: ' + imageUrl ?? ''
  )
  const post = matter(bodyClean)
  return {
    image: post.data.image ?? 'images/post-default.png',
    description: post.data.description ?? 'Description',
    content: md({
      langPrefix: 'hljs ',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value
          } catch (__) {}
        }

        return '' // use external default escaping
      }
    }).render(post.content)
  }
}
