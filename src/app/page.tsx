import { use } from 'react'
import { getData } from '../actions/data-action'
import '../styles/global.css'
import { CityElements } from './CityElements'
import { LastUpdateTimestamp } from './LastUpdateTimestamp'

export const revalidate = 3600

export default function RootPage() {
  const data = use(getData())

  return (
    <>
      <div className="mb-4 grid grid-cols-2 items-start gap-4 px-4">
        <CityElements data={data} />
      </div>

      <footer className="my-2 ml-auto flex flex-col gap-1 px-4 text-right text-sm">
        <LastUpdateTimestamp data={data} />
        <div>
          Get the data:{' '}
          <a className="link link-primary" href="/json">
            JSON
          </a>{' '}
          -{' '}
          <a className="link link-primary" href="/rss">
            RSS
          </a>
          .
        </div>
        <div>
          Get the source on{' '}
          <a
            href="https://github.com/dhedegaard/pollen-js"
            className="link link-primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
          .
        </div>
      </footer>
    </>
  )
}
