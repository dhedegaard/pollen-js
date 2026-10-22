import { McpServer, createMcpHandler } from '@modelcontextprotocol/server'
import * as z from 'zod'
import {
  CITIES,
  POLLEN_TYPES,
  getPollenFeed,
} from '../../clients/open-meteo-client'

const cityNames = CITIES.map((c) => c.city) as [string, ...string[]]

// Tight limits against oversized tool inputs (GHSA-46jr-4wx8-v453); our tools
// take at most one string argument, so real requests are well under 1 KB.
const MAX_TOOL_INPUT_ELEMENTS = 100
const MAX_REQUEST_BODY_SIZE = 64 * 1024

const handler = createMcpHandler(
  () => {
    const server = new McpServer(
      { name: 'pollen-dk', version: '1.0.0' },
      { maxToolInputElements: MAX_TOOL_INPUT_ELEMENTS },
    )

    server.registerTool(
      'get_pollen_feed',
      {
        title: 'Get pollen feed',
        description:
          'Returns current and next-day pollen levels for all supported Danish cities (Copenhagen, Aarhus) across all tracked species, with severity classification.',
        inputSchema: z.object({}),
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
        inputSchema: z.object({
          city: z.enum(cityNames).describe('City name (Copenhagen or Aarhus)'),
        }),
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
        inputSchema: z.object({}),
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
        inputSchema: z.object({}),
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

    return server
  },
  {
    maxRequestBodySize: MAX_REQUEST_BODY_SIZE,
    onerror: (error) => {
      if (process.env['NODE_ENV'] !== 'production') {
        console.error('MCP handler error:', error)
      }
    },
  },
)

export const POST = (request: Request): Promise<Response> =>
  handler.fetch(request)
