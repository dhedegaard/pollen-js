import { memo, useMemo } from 'react'
import { PollenFeedData } from '../clients/open-meteo-client'

interface Props {
  data: PollenFeedData
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
