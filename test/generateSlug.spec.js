import { generateSlug } from '../lib'

describe('if generateSlug call with', () => {
  it('simple string should return a slug', () => {
    const title = 'This is a title'
    const slug = generateSlug(title)
    expect(slug).toBe('this-is-a-title')
  })

  it('string with special characters should return a slug', () => {
    const title = 'This is a title en español! y con acentos á y ñ'
    const slug = generateSlug(title)
    expect(slug).toBe('this-is-a-title-en-espanol-y-con-acentos-a-y-n')
  })

  it('string with numbers should return a slug', () => {
    const title = 'This is a title 4!'
    const slug = generateSlug(title)
    expect(slug).toBe('this-is-a-title-4')
  })

  it('empty string should return a slug with string "add-title-here"', () => {
    const title = ''
    const slug = generateSlug(title)
    expect(slug).toBe('add-title-here')
  })
})
