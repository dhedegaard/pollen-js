import { cacheLife, cacheTag } from 'next/cache'
import * as z from 'zod'

export type PollenSeverity = 'none' | 'low' | 'medium' | 'high'

export const POLLEN_TYPES = [
  { key: 'birch_pollen', label: 'Birk', thresholds: [30, 100] },
  { key: 'grass_pollen', label: 'Græs', thresholds: [10, 50] },
  { key: 'alder_pollen', label: 'El', thresholds: [10, 50] },
  { key: 'mugwort_pollen', label: 'Bynke', thresholds: [10, 50] },
] as const

export const CITIES = [
  { city: 'Copenhagen', lat: 55.6761, lon: 12.5683 },
  { city: 'Aarhus', lat: 56.1629, lon: 10.2039 },
] as const

type PollenKey = (typeof POLLEN_TYPES)[number]['key']

const pollenValuesSchema = z.array(z.nullable(z.number()))
// Object.fromEntries loses the key types, so restore them from POLLEN_TYPES.
const pollenValuesShape = Object.fromEntries(
  POLLEN_TYPES.map(({ key }) => [key, pollenValuesSchema]),
) as Record<PollenKey, typeof pollenValuesSchema>

const openMeteoResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  hourly: z.object({
    time: z.array(z.string()),
    ...pollenValuesShape,
  }),
})

type OpenMeteoResponse = z.infer<typeof openMeteoResponseSchema>

function severity(
  value: number | null,
  [low, medium]: readonly [number, number],
): PollenSeverity {
  if (value == null || value < 1) return 'none'
  if (value <= low) return 'low'
  if (value <= medium) return 'medium'
  return 'high'
}

function dailyPeak(
  times: string[],
  values: (number | null)[],
  date: string,
): number | null {
  const dayValues = times.flatMap((timestamp, index) => {
    const value = values[index]
    return timestamp.startsWith(date) && value != null ? [value] : []
  })
  return dayValues.length > 0 ? Math.round(Math.max(...dayValues)) : null
}

function parseCity(response: OpenMeteoResponse, cityName: string) {
  const { time } = response.hourly
  const today = time[0]?.slice(0, 10) ?? ''
  const tomorrowDate =
    time.find((t) => t.slice(0, 10) !== today)?.slice(0, 10) ?? ''

  return {
    city: cityName,
    levels: POLLEN_TYPES.map(({ key, label, thresholds }) => {
      const values = response.hourly[key]
      const todayPeak = dailyPeak(time, values, today)
      const tomorrowPeak = dailyPeak(time, values, tomorrowDate)
      return {
        label,
        level: todayPeak,
        severity: severity(todayPeak, thresholds),
        tomorrowLevel: tomorrowPeak,
        tomorrowSeverity: severity(tomorrowPeak, thresholds),
      }
    }),
  }
}

const OPEN_METEO_TIMEOUT_MS = 10_000

async function fetchCity(city: (typeof CITIES)[number]) {
  const params = new URLSearchParams({
    latitude: city.lat.toString(),
    longitude: city.lon.toString(),
    hourly: POLLEN_TYPES.map(({ key }) => key).join(','),
    forecast_days: '2',
    timezone: 'Europe/Copenhagen',
  })
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`,
    // A hung request would otherwise stall rendering, including the build-time prerender.
    { signal: AbortSignal.timeout(OPEN_METEO_TIMEOUT_MS) },
  )
  if (!response.ok) {
    throw new Error(
      `Open-Meteo error for ${city.city}: ${response.status.toString()} ${response.statusText}`,
    )
  }
  const json: unknown = await response.json()
  return openMeteoResponseSchema.parseAsync(json)
}

export interface PollenFeedData {
  updateTime: string
  cities: Array<{
    city: string
    levels: Array<{
      label: string
      level: number | null
      severity: PollenSeverity
      tomorrowLevel: number | null
      tomorrowSeverity: PollenSeverity
    }>
  }>
}

export async function getPollenFeed(): Promise<PollenFeedData> {
  'use cache'
  cacheLife('hours')
  cacheTag('pollen-feed')
  const responses = await Promise.all(
    CITIES.map((city) => fetchCity(city).then((r) => parseCity(r, city.city))),
  )
  return {
    updateTime: new Date().toISOString(),
    cities: responses,
  }
}
