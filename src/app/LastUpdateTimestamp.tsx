'use client'

import clsx from 'clsx'
import { memo, useMemo } from 'react'
import { useData } from '../actions/data-fetcher'
import { AstmaAllergiFeedData } from '../clients/astma-allergi-client'

interface Props {
  initialData: AstmaAllergiFeedData
}

export const LastUpdateTimestamp = memo(function LastUpdateTimestamp({
  initialData,
}: Props) {
  const { data, isLoading } = useData()
  const updateTime = useMemo(
    () =>
      new Date(data?.updateTime ?? initialData.updateTime).toLocaleString(
        'en-GB',
      ),
    [data?.updateTime, initialData.updateTime],
  )
  return (
    <div>
      Last data timestamp:{' '}
      <span
        className={clsx(
          'font-semibold',
          isLoading && 'skeleton ml-auto rounded bg-slate-100 text-transparent',
        )}
      >
        {updateTime}
      </span>
    </div>
  )
})
