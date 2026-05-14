import { NextResponse } from 'next/server'
import { getPollenFeed } from '../../clients/open-meteo-client'

export const GET = async () => {
  const data = await getPollenFeed()
  return NextResponse.json(data)
}
