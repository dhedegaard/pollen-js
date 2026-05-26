import { createMcpHandler } from 'mcp-handler'
import * as z from 'zod'
import {
  CITIES,
  POLLEN_TYPES,
  getPollenFeed,
} from '../../clients/open-meteo-client'

const cityNames = CITIES.map((c) => c.city) as [string, ...string[]]

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_pollen_feed',
      {
        title: 'Get pollen feed',
        description:
          'Returns current and next-day pollen levels for all supported Danish cities (Copenhagen, Aarhus) across all tracked species, with severity classification.',
        inputSchema: {},
      },
      async () => {
        const feed = await getPollenFeed()
        return {
          content: [{ type: 'text', text: JSON.stringify(feed, null, 2) }],
        }
      },
    )

    server.registerTool(
      'get_city_pollen',
      {
        title: 'Get pollen for a city',
        description:
          'Returns current and next-day pollen levels for a single Danish city.',
        inputSchema: {
          city: z.enum(cityNames).describe('City name (Copenhagen or Aarhus)'),
        },
      },
      async ({ city }) => {
        const feed = await getPollenFeed()
        const match = feed.cities.find((c) => c.city === city)
        if (!match) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Unknown city: ${city}` }],
          }
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(match, null, 2) }],
        }
      },
    )

    server.registerTool(
      'list_cities',
      {
        title: 'List supported cities',
        description: 'Returns the cities for which pollen data is available.',
        inputSchema: {},
      },
      () => {
        const cities = CITIES.map(({ city, lat, lon }) => ({
          city,
          latitude: lat,
          longitude: lon,
        }))
        return {
          content: [{ type: 'text', text: JSON.stringify(cities, null, 2) }],
        }
      },
    )

    server.registerTool(
      'list_species',
      {
        title: 'List tracked pollen species',
        description:
          'Returns the pollen species tracked by this server, with their Danish labels and severity thresholds.',
        inputSchema: {},
      },
      () => {
        const species = POLLEN_TYPES.map(({ key, label, thresholds }) => ({
          key,
          label,
          thresholds,
        }))
        return {
          content: [{ type: 'text', text: JSON.stringify(species, null, 2) }],
        }
      },
    )
  },
  {
    serverInfo: { name: 'pollen-dk', version: '1.0.0' },
    capabilities: { tools: {} },
  },
  {
    basePath: '',
    disableSse: true,
    maxDuration: 60,
    verboseLogs: process.env['NODE_ENV'] !== 'production',
  },
)

export { handler as GET, handler as POST }
