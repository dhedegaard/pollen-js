import { cva } from 'class-variance-authority'
import { PollenSeverity } from '../clients/open-meteo-client'

const valueClass = cva('font-bold', {
  variants: {
    severity: {
      none: 'text-slate-600',
      low: 'text-lime-700',
      medium: 'text-yellow-600',
      high: 'text-red-600',
    },
  },
})

type Props = {
  value: number | null
  severity: PollenSeverity
}
export function ValueItem({ value, severity }: Props) {
  if (value == null || value < 1) {
    return <span className="text-slate-600">-</span>
  }

  return <span className={valueClass({ severity })}>{value.toString()}</span>
}
