'use client'

import { memo, useMemo } from 'react'
import { DataActionResult } from '../actions/data-action'
import { useData } from '../actions/data-fetcher'

interface Props {
  initialData: DataActionResult
}

export const CacheTimestamp = memo(function CacheTimestamp({
  initialData,
}: Props) {
  const { data } = useData()
  const timestamp = useMemo(
    () => new Date(data?.timestamp ?? initialData.timestamp).toUTCString(),
    [data?.timestamp, initialData.timestamp]
  )
  return (
    <div>
      Cache timestamp: <span className="font-medium">{timestamp}</span>
    </div>
  )
})
