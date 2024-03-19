'use client'

import { memo, useMemo } from 'react'
import { DataActionResult } from '../actions/data-action'
import { useData } from '../actions/data-fetcher'
import { CityElement } from '../components/CityElement'

interface Props {
  initialData: DataActionResult
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
