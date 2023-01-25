export function generateSlug(title) {
  if (!title) return 'add-title-here'
  let slug = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  slug = slug.replace(/[^\w\s]/gi, '')
  slug = slug.replace(/\s+/g, '-')
  slug = slug.replace(/-$/g, '')

  return slug.toLowerCase()
}
