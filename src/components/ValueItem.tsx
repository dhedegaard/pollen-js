import clsx from 'clsx'

type Props = {
  value: string | number | null
}
export function ValueItem({ value }: Props) {
  if (value == null || (typeof value === 'number' && value < 1)) {
    return <span className="text-slate-600">-</span>
  }
  if (typeof value === 'string') {
    return <span className="text-red-600">{value}</span>
  }

  return (
    <span
      className={clsx(
        'font-bold',
        value < 21
          ? 'text-lime-700'
          : value < 51
          ? 'text-yellow-600'
          : 'text-red-600'
      )}
    >
      {value.toString()}
    </span>
  )
}
