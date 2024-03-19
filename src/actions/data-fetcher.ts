'use client'

import { useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { DataActionResult, getData } from './data-action'

export const useData = (): SWRResponse<DataActionResult, unknown> => {
  const response = useSWR<DataActionResult, unknown>('data', getData)

  useEffect(() => {
    if (response.error != null) {
      console.error(response.error)
    }
  }, [response.error])

  return response
}
