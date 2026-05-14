import { memo } from 'react'
import { PollenFeedData } from '../clients/open-meteo-client'
import { CityElement } from '../components/CityElement'

interface Props {
  data: PollenFeedData
}
export const CityElements = memo(function CityElements({ data }: Props) {
  return data.cities.map((element) => (
    <CityElement element={element} key={element.city} />
  ))
})
