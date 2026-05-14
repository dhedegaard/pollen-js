import { NextResponse } from 'next/server'
import { getData } from '../../actions/data-action'

export const GET = async () => {
  try {
    const data = await getData()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
