import { NextResponse } from 'next/server'
import { createAstmaAllergiClient } from '../../clients/astma-allergi-client'

export const GET = async () => {
  try {
    const astmaAllergiClient = createAstmaAllergiClient()
    const data = await astmaAllergiClient.getPollenFeed()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
