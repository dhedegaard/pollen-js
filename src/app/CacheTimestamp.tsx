'use client'

import clsx from 'clsx'
import { memo, useMemo } from 'react'
import { useData } from '../actions/data-fetcher'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'

interface Props {
  initialData: AstmaAllergiFeedData
}

export const CacheTimestamp = memo(function CacheTimestamp({
  initialData,
}: Props) {
  const { data, isLoading } = useData()
  const timestamp = useMemo(
    () =>
      new Date(data?.updateTime ?? initialData.updateTime).toLocaleString(
        'en-GB',
      ),
    [data?.updateTime, initialData.updateTime],
  )
  return (
    <div>
      Cache timestamp:{' '}
      <span
        className={clsx(
          'font-medium',
          isLoading && 'skeleton ml-auto rounded bg-slate-100 text-transparent',
        )}
      >
        {timestamp}
      </span>
    </div>
  )
})
