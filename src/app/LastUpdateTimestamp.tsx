import { memo, useMemo } from 'react'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'

interface Props {
  data: AstmaAllergiFeedData
}

export const LastUpdateTimestamp = memo(function LastUpdateTimestamp({
  data,
}: Props) {
  return (
    <div>
      Last data timestamp:{' '}
      <span className="font-semibold">
        {useMemo(
          () => new Date(data.updateTime).toLocaleString('en-GB'),
          [data.updateTime],
        )}
      </span>
    </div>
  )
})
