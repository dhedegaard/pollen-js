'use client'

import { useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { getData } from './data-action'

export const useData = (): SWRResponse<AstmaAllergiFeedData, unknown> => {
  const response = useSWR<AstmaAllergiFeedData, unknown>('data', getData)

  useEffect(() => {
    if (response.error != null) {
      console.error(response.error)
    }
  }, [response.error])

  return response
}
