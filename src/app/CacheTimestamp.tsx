'use client'

import clsx from 'clsx'
import { memo, useMemo } from 'react'
import { DataActionResult } from '../actions/data-action'
import { useData } from '../actions/data-fetcher'

interface Props {
  initialData: DataActionResult
}

export const CacheTimestamp = memo(function CacheTimestamp({
  initialData,
}: Props) {
  const { data, isLoading } = useData()
  const timestamp = useMemo(
    () =>
      new Date(data?.timestamp ?? initialData.timestamp).toLocaleString(
        'en-GB'
      ),
    [data?.timestamp, initialData.timestamp]
  )
  return (
    <div>
      Cache timestamp:{' '}
      <span
        className={clsx(
          'font-medium',
          isLoading && 'skeleton rounded bg-slate-100 text-transparent ml-auto'
        )}
      >
        {timestamp}
      </span>
    </div>
  )
})
