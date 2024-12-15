import { memo, useMemo } from 'react'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { CityElement } from '../components/CityElement'

interface Props {
  data: AstmaAllergiFeedData
}
export const CityElements = memo(function CityElements({ data }: Props) {
  const cities = useMemo(() => data.cities, [data.cities])

  return cities.map((element) => (
    <CityElement element={element} key={element.city} />
  ))
})
