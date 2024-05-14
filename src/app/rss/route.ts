import { NextRequest } from 'next/server'
import { create } from 'xmlbuilder2'
import { getData } from '../../actions/data-action'

export const GET = async (request: NextRequest) => {
  const data = await getData()

  const baseURL = new URL(request.url)
  const host = request.headers.get('host')
  if (host != null && host.length > 0) {
    baseURL.host = host
  }
  const forwardedProto = request.headers.get('x-forwarded-proto')
  if (forwardedProto != null && forwardedProto.length > 0) {
    baseURL.protocol = forwardedProto
    baseURL.port = ''
  }
  const link = new URL(baseURL)
  link.pathname = ''
  const atomLink = new URL(baseURL)
  atomLink.pathname = request.nextUrl.pathname

  const xml = create({
    rss: {
      '@xmlns:atom': 'http://www.w3.org/2005/Atom',
      '@version': '2.0',
      channel: {
        title: 'Pollen',
        link: link.href,
        description: 'Pollen data for Denmark',
        lastBuildDate: new Date(data.updateTime).toUTCString(),
        'atom:link': {
          '@href': atomLink.toString(),
          '@rel': 'self',
          '@type': 'application/rss+xml',
        },
        item: data.cities.map((city) => ({
          title: city.city,
          description: `Pollen data for ${city.city}: ${city.levels
            .filter((level) => level.level != null)
            .map((level) => `${level.label}: ${level.level?.toString() ?? '-'}`)
            .join(' - ')}`,
          guid: {
            '@isPermaLink': false,
            '#': city.city,
          },
        })),
      },
    },
  }).end({
    prettyPrint: process.env.NODE_ENV !== 'production',
  })

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
