import { PollenFeedData } from '../clients/open-meteo-client'
import { ValueItem } from '../components/ValueItem'

interface Props {
  element: PollenFeedData['cities'][number]
}

export function CityElement({ element }: Props) {
  return (
    <section className="card grid grid-cols-1 items-stretch rounded-lg border border-solid border-slate-100 text-base-content shadow-sm">
      <div className="border-b border-solid border-slate-200 p-3 text-base">
        {element.city}
      </div>

      <div className="grid grid-cols-3 border-b border-solid border-slate-200 px-3 py-1 text-xs text-slate-400">
        <span />
        <span>Today</span>
        <span>Tomorrow</span>
      </div>

      {element.levels.map((level) => (
        <div
          key={level.label}
          className="grid grid-cols-3 border-b border-solid border-slate-200 p-3 text-sm"
        >
          <span>{level.label}</span>
          <ValueItem value={level.level} severity={level.severity} />
          <ValueItem value={level.tomorrowLevel} severity={level.tomorrowSeverity} />
        </div>
      ))}
    </section>
  )
}
