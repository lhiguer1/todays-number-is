import { getLynchNumbers } from 'app/numbers/utils'
export const baseUrl = 'https://numbers.vercel.app'

export default async function sitemap() {
  let lynchNumbers = getLynchNumbers().map((lynchNumber) => ({
    url: `${baseUrl}/numbers/${lynchNumber.date.getFullYear()}/${lynchNumber.date.getMonth() + 1}/${lynchNumber.date.getDate()}`,
    lastModified: lynchNumber.date.toISOString().split('T')[0],
  }))

  let routes = ['', '/numbers'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...lynchNumbers]
}
