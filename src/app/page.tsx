import { getData } from '../actions/data-action'
import { CityElements } from './CityElements'
import { LastUpdateTimestamp } from './LastUpdateTimestamp'

export const revalidate = 3600

export default async function RootPage() {
  const data = await getData()

  return (
    <>
      <div className="mb-4 grid grid-cols-2 items-start gap-4 px-4">
        <CityElements data={data} />
      </div>

      <footer className="my-2 ml-auto flex flex-col gap-1 px-4 text-right text-sm">
        <LastUpdateTimestamp data={data} />
        <div>
          Get the data:{' '}
          <a className="underline text-lime-700" href="/json">
            JSON
          </a>{' '}
          -{' '}
          <a className="underline text-lime-700" href="/rss">
            RSS
          </a>
          .
        </div>
        <div>
          Get the source on{' '}
          <a
            href="https://github.com/dhedegaard/pollen-js"
            className="underline text-lime-700"
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
