'use server'

import {
  createOpenMeteoClient,
  PollenFeedData,
} from '../clients/open-meteo-client'

export async function getData(): Promise<PollenFeedData> {
  try {
    const client = createOpenMeteoClient()
    return await client.getPollenFeed()
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
