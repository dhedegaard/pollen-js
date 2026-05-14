import { PollenFeedData } from '../clients/open-meteo-client'

interface Props {
  data: PollenFeedData
}

export function LastUpdateTimestamp({ data }: Props) {
  return (
    <div>
      Last data timestamp:{' '}
      <span className="font-semibold">
        {new Date(data.updateTime).toLocaleString('en-GB')}
      </span>
    </div>
  )
}
