import { NextResponse } from 'next/server'
import { getData } from '../../actions/data-action'

export const GET = async () => {
  const data = await getData()
  return NextResponse.json(data)
}
