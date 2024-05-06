'use client'

import { memo, useMemo } from 'react'
import { useData } from '../actions/data-fetcher'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { CityElement } from '../components/CityElement'

interface Props {
  initialData: AstmaAllergiFeedData
}
export const CityElements = memo(function CityElements({ initialData }: Props) {
  const { data } = useData()
  const cities = useMemo(
    () => data?.cities ?? initialData.cities,
    [data?.cities, initialData.cities]
  )

  return cities.map((element) => (
    <CityElement element={element} key={element.city} />
  ))
})
