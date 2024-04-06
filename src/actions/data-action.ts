'use server'

import { ParsedXMLStructure, createDmiClient } from '../clients/dmi-client'

export interface DataActionResult {
  cities: readonly ParsedXMLStructure[]
  timestamp: string
}
export async function getData(): Promise<DataActionResult> {
  try {
    const dmiClient = createDmiClient()
    const cities = await dmiClient.fetchAndParse()
    const result: DataActionResult = {
      cities,
      timestamp: new Date().toISOString(),
    }
    return result
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
