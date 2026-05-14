import { getPollenFeed } from '../clients/open-meteo-client'
import { CityElement } from '../components/CityElement'
import { LastUpdateTimestamp } from './LastUpdateTimestamp'

export default async function RootPage() {
  const data = await getPollenFeed()

  return (
    <>
      <div className="mb-4 grid grid-cols-1 items-start gap-4 px-4 sm:grid-cols-2">
        {data.cities.map((city) => (
          <CityElement key={city.city} element={city} />
        ))}
      </div>

      <footer className="my-2 ml-auto flex flex-col gap-1 px-4 text-right text-sm">
        <LastUpdateTimestamp updateTime={data.updateTime} />
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
