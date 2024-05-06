import clsx from 'clsx'
import { PollenSeverity } from '../clients/astma-allergi-client'

type Props = {
  value: number | null
  severity: PollenSeverity
}
export function ValueItem({ value, severity }: Props) {
  if (value == null || value < 1) {
    return <span className="text-slate-600">-</span>
  }
  if (typeof value === 'string') {
    return <span className="text-red-600">{value}</span>
  }

  return (
    <span
      className={clsx(
        'font-bold',
        severity === 'none'
          ? 'text-slate-600'
          : severity === 'low'
          ? 'text-lime-700'
          : severity === 'medium'
          ? 'text-yellow-600'
          : 'text-red-600'
      )}
    >
      {value.toString()}
    </span>
  )
}
