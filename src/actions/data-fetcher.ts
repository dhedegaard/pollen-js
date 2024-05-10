'use client'

import { useEffect } from 'react'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { getData } from './data-action'

const swrConfig: SWRConfiguration = {
  refreshInterval: 1_000 * 60 * 60, // 1 hour
}
export const useData = (): SWRResponse<AstmaAllergiFeedData, unknown> => {
  const response = useSWR<AstmaAllergiFeedData, unknown>(
    'data',
    getData,
    swrConfig,
  )

  useEffect(() => {
    if (response.error != null) {
      console.error(response.error)
    }
  }, [response.error])

  return response
}
