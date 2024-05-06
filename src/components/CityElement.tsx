import { memo } from 'react'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'
import { ValueItem } from '../components/ValueItem'

interface Props {
  element: AstmaAllergiFeedData['cities'][number]
}

export const CityElement = memo<Props>(function CityElement({ element }) {
  return (
    <section className="card rounded-lg border border-solid border-slate-100 shadow grid grid-cols-1 items-stretch text-base-content">
      <div className="text-base border-b p-3 border-solid border-slate-200">
        {element.city}
      </div>

      {element.levels.map((level) => (
        <div
          key={level.label}
          className="text-sm border-b p-3 border-solid border-slate-200"
        >
          {level.label}:{' '}
          <ValueItem value={level.level} severity={level.severity} />
        </div>
      ))}
    </section>
  )
})
