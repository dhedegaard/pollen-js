'use server'

import { ParsedXMLStructure, fetchAndParse } from '../parser'

export interface DataActionResult {
  cities: readonly ParsedXMLStructure[]
  timestamp: string
}
export async function getData(): Promise<DataActionResult> {
  try {
    const cities = await fetchAndParse()
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
