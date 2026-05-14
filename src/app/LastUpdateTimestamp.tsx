interface Props {
  updateTime: string
}

export function LastUpdateTimestamp({ updateTime }: Props) {
  return (
    <div>
      Last data timestamp:{' '}
      <span className="font-semibold">
        {new Date(updateTime).toLocaleString('en-GB')}
      </span>
    </div>
  )
}
