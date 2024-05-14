import { create } from 'xmlbuilder2'
import { getData } from '../../actions/data-action'

export const GET = async () => {
  const data = await getData()

  const xml = create({
    rss: {
      '@version': '2.0',
      channel: {
        title: 'Pollen',
        link: 'https://pollen.dhedegaard.dk',
        description: 'Pollen data for Denmark',
        lastBuildDate: new Date(data.updateTime).toUTCString(),
        item: data.cities.map((city) => ({
          title: city.city,
          description: `Pollen data for ${city.city}: ${city.levels
            .filter((level) => level.level != null)
            .map((level) => `${level.label}: ${level.level?.toString() ?? '-'}`)
            .join(' - ')}`,
        })),
      },
    },
  }).end({})

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
