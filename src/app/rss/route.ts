import XMLBuilder from 'fast-xml-builder'
import { NextRequest } from 'next/server'
import { getPollenFeed } from '../../clients/open-meteo-client'

export const GET = async (request: NextRequest) => {
  const data = await getPollenFeed()

  const baseURL = new URL(request.url)
  const host = request.headers.get('host')
  if (host != null && host.length > 0) {
    baseURL.host = host
  }
  const forwardedProto = request.headers.get('x-forwarded-proto')
  if (forwardedProto != null && forwardedProto.length > 0) {
    baseURL.protocol = (forwardedProto.split(',')[0] ?? forwardedProto).trim()
    baseURL.port = ''
  }
  const link = new URL(baseURL)
  link.pathname = ''
  const atomLink = new URL(baseURL)
  atomLink.pathname = request.nextUrl.pathname

  const lastBuildDate = new Date(data.updateTime).toUTCString()

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@',
    textNodeName: '#',
    format: process.env.NODE_ENV !== 'production',
    indentBy: '  ',
    suppressEmptyNode: true,
  })
  const xml =
    '<?xml version="1.0"?>\n' +
    builder.build({
      rss: {
        '@xmlns:atom': 'http://www.w3.org/2005/Atom',
        '@version': '2.0',
        channel: {
          title: 'Pollen',
          link: link.href,
          description: 'Pollen data for Denmark',
          lastBuildDate,
          'atom:link': {
            '@href': atomLink.toString(),
            '@rel': 'self',
            '@type': 'application/rss+xml',
          },
          item: data.cities.map((city) => ({
            title: city.city,
            pubDate: lastBuildDate,
            description: `Pollen data for ${city.city}: ${city.levels
              .flatMap((level) =>
                level.level != null && level.level > 0
                  ? [`${level.label}: ${level.level.toString()}`]
                  : [],
              )
              .join(' - ')}`,
            guid: {
              '@isPermaLink': false,
              '#': `${city.city}-${data.updateTime}`,
            },
          })),
        },
      },
    })

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
