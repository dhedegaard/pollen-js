import { cacheLife, cacheTag } from 'next/cache'
import * as z from 'zod'

export type PollenSeverity = 'none' | 'low' | 'medium' | 'high'

const POLLEN_TYPES = [
  { key: 'birch_pollen', label: 'Birk', thresholds: [0, 30, 100] },
  { key: 'grass_pollen', label: 'Græs', thresholds: [0, 10, 50] },
  { key: 'alder_pollen', label: 'El', thresholds: [0, 10, 50] },
  { key: 'mugwort_pollen', label: 'Bynke', thresholds: [0, 10, 50] },
] as const

const CITIES = [
  { city: 'Copenhagen', lat: 55.6761, lon: 12.5683 },
  { city: 'Aarhus', lat: 56.1629, lon: 10.2039 },
] as const

const openMeteoResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  hourly: z.object({
    time: z.array(z.string()),
    birch_pollen: z.array(z.nullable(z.number())),
    grass_pollen: z.array(z.nullable(z.number())),
    alder_pollen: z.array(z.nullable(z.number())),
    mugwort_pollen: z.array(z.nullable(z.number())),
  }),
})

type OpenMeteoResponse = z.infer<typeof openMeteoResponseSchema>

function severity(
  value: number | null,
  [none, low, medium]: readonly [number, number, number],
): PollenSeverity {
  if (value == null || value <= none) return 'none'
  if (value <= low) return 'low'
  if (value <= medium) return 'medium'
  return 'high'
}

function dailyPeak(
  times: string[],
  values: (number | null)[],
  date: string,
): number | null {
  const dayValues = times
    .map((t, i) => (t.startsWith(date) ? values[i] : null))
    .filter((v): v is number => v != null)
  return dayValues.length > 0 ? Math.round(Math.max(...dayValues)) : null
}

function parseCity(response: OpenMeteoResponse, cityName: string) {
  const { time } = response.hourly
  const today = time[0]?.slice(0, 10) ?? ''
  // Find the first time entry that belongs to a different date than today
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

async function fetchCity(city: (typeof CITIES)[number]) {
  const params = new URLSearchParams({
    latitude: city.lat.toString(),
    longitude: city.lon.toString(),
    hourly: 'birch_pollen,grass_pollen,alder_pollen,mugwort_pollen',
    forecast_days: '2',
    timezone: 'Europe/Copenhagen',
  })
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`,
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

export const createOpenMeteoClient = () => ({
  getPollenFeed: async function getPollenFeed(): Promise<PollenFeedData> {
    'use cache'
    cacheLife('hours')
    cacheTag('pollen-feed')
    const responses = await Promise.all(
      CITIES.map((city) =>
        fetchCity(city).then((r) => parseCity(r, city.city)),
      ),
    )
    return {
      updateTime: new Date().toISOString(),
      cities: responses,
    }
  },
})
