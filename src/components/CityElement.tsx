import { memo } from 'react'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { ValueItem } from '../components/ValueItem'

interface Props {
  element: AstmaAllergiFeedData['cities'][number]
}

export const CityElement = memo<Props>(function CityElement({ element }) {
  return (
    <section className="card grid grid-cols-1 items-stretch rounded-lg border border-solid border-slate-100 text-base-content shadow">
      <div className="border-b border-solid border-slate-200 p-3 text-base">
        {element.city}
      </div>

      {element.levels.map((level) => (
        <div
          key={level.label}
          className="border-b border-solid border-slate-200 p-3 text-sm"
        >
          {level.label}:{' '}
          <ValueItem value={level.level} severity={level.severity} />
        </div>
      ))}
    </section>
  )
})
