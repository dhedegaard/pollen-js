'use client'

import clsx from 'clsx'
import { MouseEventHandler, memo, useCallback } from 'react'
import { useData } from '../actions/data-fetcher'
import { ArrowPathIcon } from '@heroicons/react/16/solid'

interface Props {
  className?: string
}

export const LoadingIndicator = memo<Props>(function LoadingIndicator({
  className,
}) {
  const { isValidating, mutate } = useData()

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(() => {
    void mutate()
  }, [mutate])

  return (
    <button
      type="button"
      disabled={isValidating}
      className={clsx(
        'btn btn-square btn-outline btn-sm flex-none rounded-full bg-white transition-all',
        isValidating ? 'animate-spin' : '',
        className,
      )}
      onClick={handleClick}
    >
      <ArrowPathIcon width={20} />
    </button>
  )
})
