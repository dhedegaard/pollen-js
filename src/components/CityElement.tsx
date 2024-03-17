import { memo } from 'react'
import { ValueItem } from '../components/ValueItem'
import { ParsedXMLStructure } from '../parser'

interface Props {
  element: ParsedXMLStructure
}

export const CityElement = memo<Props>(function CityElement({ element }) {
  return (
    <div className="card rounded-lg border border-solid border-slate-100 shadow grid grid-cols-1 items-stretch text-base-content">
      <div className="text-base border-b p-3 border-solid border-slate-200">
        {element.city}
      </div>

      {Object.entries(element.values).map(([pollenName, val]) => (
        <div
          key={pollenName}
          className="text-sm border-b p-3 border-solid border-slate-200"
        >
          {pollenName}: <ValueItem value={val} />
        </div>
      ))}

      {element.forecast.length > 0 && (
        <div className="text-xs p-3 break-words">{element.forecast}</div>
      )}
    </div>
  )
})
