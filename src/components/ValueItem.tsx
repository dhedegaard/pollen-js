import React from 'react'

type Props = {
  value: string | number | undefined
}
const ValueItem: React.FC<Props> = ({ value }) => {
  if (value == null) {
    return <span className="text-muted">-</span>
  }
  if (typeof value === 'string') {
    return <span className="text-warning">{value}</span>
  }
  if (value < 1) {
    return <span className="text-muted">{value.toString()}</span>
  }
  return (
    <b
      className={
        value < 21
          ? 'text-success'
          : value < 51
          ? 'text-warning'
          : 'text-danger'
      }
    >
      {value.toString()}
    </b>
  )
}

export default ValueItem
